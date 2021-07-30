import React, { ReactNode, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export interface FormDialogProps {
  title: string;
  label: ReactNode;
  action: (onClose: () => void) => ReactNode;
  content: ReactNode;
}

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  padding: '8px',
  top: '0px',
  right: '0px'
});

export const FormDialog = ({ title, label, action, content }: FormDialogProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {label}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {title}

          <StyledIconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </StyledIconButton>
        </DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>{action(handleClose)}</DialogActions>
      </Dialog>
    </div>
  );
};
