import React, { useState, useEffect, useCallback } from 'react';
import { Snackbar } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';

import { SnackbarContext, ExtendedSnackbarProps } from './SnackbarContext';

const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbars, setSnackbars] = useState<ExtendedSnackbarProps[]>([]);
  const [open, setOpen] = useState(true);
  const [current, setCurrent] = useState<ExtendedSnackbarProps | undefined>(undefined);

  useEffect(() => {
    if (snackbars.length && !current) {
      setCurrent({ ...snackbars[0] });
      setSnackbars((oldSnackbars) => oldSnackbars.slice(1));
      setOpen(true);
    } else if (snackbars.length && current && open) {
      setOpen(false);
    }
  }, [snackbars, current, open]);

  const addSnackbar = useCallback(
    ({ key = new Date().getTime(), error = false, ...snackbar }: ExtendedSnackbarProps) => {
      setSnackbars((oldSnackPack) => [
        ...oldSnackPack,
        {
          key,
          error,
          ...snackbar
        }
      ]);
    },
    []
  );

  return (
    <SnackbarContext.Provider value={{ addSnackbar }}>
      {children}
      <Snackbar
        key={current?.key || new Date().getTime()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        onClose={() => setOpen(false)}
        message={current ? current.content : 'asdasddasd'}
        TransitionProps={{
          onExited: () => setCurrent(undefined)
        }}
        ContentProps={{
          style: {
            backgroundColor: current?.error ? red[700] : grey[300],
            color: !current?.error ? 'inherit' : undefined
          }
        }}
        autoHideDuration={current?.autoHideDuration || 5000}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
