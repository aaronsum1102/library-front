import { useContext } from 'react';
import { SnackbarContext, SnackbarContextProps } from '~app/contexts';

const useSnackbar = (): SnackbarContextProps => {
  const state = useContext(SnackbarContext);

  if (!state) {
    throw new Error('Snackbar context is not provided');
  }

  return state;
};

export default useSnackbar;
