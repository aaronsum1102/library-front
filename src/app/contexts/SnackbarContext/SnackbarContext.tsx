import { createContext } from 'react';
import { SnackbarProps } from '@material-ui/core';

export interface ExtendedSnackbarProps extends SnackbarProps {
  content: string;
  key?: number;
  error?: boolean;
}

export interface SnackbarContextProps {
  addSnackbar: (snackbar: ExtendedSnackbarProps) => void;
}

export const SnackbarContext = createContext<SnackbarContextProps | null>(null);
