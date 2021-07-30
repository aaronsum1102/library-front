import React, { ReactNode, FormEvent } from 'react';
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
  content: ReactNode;
  action: ReactNode;
  open: boolean;
  handleClickOpen: () => void;
  handleClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  labelStartIcon?: ReactNode;
  labelEndIcon?: ReactNode;
}

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  padding: '8px',
  top: '0px',
  right: '0px'
});

export const FormDialog = ({
  title,
  label,
  action,
  content,
  open,
  handleClickOpen,
  handleClose,
  onSubmit,
  labelStartIcon,
  labelEndIcon
}: FormDialogProps): JSX.Element => {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        startIcon={labelStartIcon}
        endIcon={labelEndIcon}
      >
        {label}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {title}

          <StyledIconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </StyledIconButton>
        </DialogTitle>
        <form onSubmit={onSubmit}>
          <DialogContent>{content}</DialogContent>
          <DialogActions>{action}</DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
