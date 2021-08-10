import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Button,
  TextField,
  styled
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useTranslation } from 'react-i18next';

import { useAuth } from '~app/hooks';
import { Spacer, Spacings, Loader } from '~app/components';

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  padding: '8px',
  top: '0px',
  right: '0px'
});

const phoneUtil = PhoneNumberUtil.getInstance();

interface UserInfoFormProps {
  open: boolean;
  handleClose: () => void;
  onSubmitCallback: (name: string, phoneNumber: string) => void;
  helperText?: string;
}

const UserInfoForm = ({
  open,
  handleClose,
  onSubmitCallback,
  helperText
}: UserInfoFormProps): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const { user, updateUserInfo } = useAuth();
  const { t } = useTranslation();

  const validationSchema = yup.object({
    displayName: yup.string().required(t('user:nameRequired')),
    phoneNumber: yup
      .string()
      .test('validation', t('user:phoneNumberInvalid'), (value) => {
        try {
          const phoneNumber = phoneUtil.parse(value);

          const result = phoneUtil.isValidNumber(phoneNumber);

          if (!result) {
            return false;
          }

          return true;
        } catch (error) {
          return false;
        }
      })
      .required(t('user:phoneNumberRequired'))
  });

  const formik = useFormik({
    initialValues: {
      displayName: user?.displayName || '',
      phoneNumber: user?.phoneNumber || ''
    },
    validationSchema,
    onSubmit: async (values) => {
      if (user) {
        setLoading(true);
        const { uid } = user;

        await updateUserInfo({
          variables: {
            input: {
              uid,
              ...values
            }
          }
        });

        setLoading(false);
        onSubmitCallback(values.displayName, values.phoneNumber);
      }
    }
  });

  useEffect(() => {
    if (open === false) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
      <DialogTitle id="form-dialog-title">
        {t('user:yourDetails')}
        <StyledIconButton aria-label={t('button:close')} onClick={handleClose}>
          <CloseIcon />
        </StyledIconButton>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          {helperText && <DialogContentText>{helperText}</DialogContentText>}
          <TextField
            autoFocus
            margin="dense"
            id="displayName"
            label={t('general:displayName')}
            value={formik.values.displayName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.displayName && Boolean(formik.errors.displayName)}
            helperText={formik.touched.displayName && formik.errors.displayName}
            fullWidth
          />
          <Spacer space={Spacings.large} />

          <TextField
            margin="dense"
            id="phoneNumber"
            label={t('form:phoneNumberWithCountryCode')}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            fullWidth
          />
          <Spacer space={Spacings.large} />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            startIcon={loading && <Loader showText={false} size="1rem" />}
          >
            {t('button:save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

UserInfoForm.defaultProps = {
  helperText: undefined
};

export default UserInfoForm;
