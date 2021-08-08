import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  TextField,
  styled
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';
import gPhoneNumber from 'google-libphonenumber';

import { useAuth } from '~app/hooks';
import { Spacer, Spacings, Loader } from '~app/components';

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  padding: '8px',
  top: '0px',
  right: '0px'
});

interface UserInfoFormProps {
  open: boolean;
  handleClose: () => void;
}

const phoneUtil = gPhoneNumber.PhoneNumberUtil.getInstance();

yup.addMethod(yup.string, 'phone', function yupPhone(this: yup.StringSchema, message: string) {
  return this.test(
    {
      name: 'phone',
      message,
      test: (value, context) => {
        const { path, createError } = context;
        createError({
          path,
          message
        });
        try {
          const phoneNumber = phoneUtil.parse(value);

          const result = phoneUtil.isValidNumber(phoneNumber);

          if (!result) {
            console.log('createError', result);
            createError({
              path,
              message
            });
          }

          return !result;
        } catch (error) {
          console.log('chas');
          createError({
            path,
            message
          });

          return false;
        }
        // if (!phoneUtil.isPossibleNumber(phoneNumber)) {
        //   return createError({
        //     path,
        //     message
        //   });
        // }

        // return
      }
    }
    // 'phone',
    // message,
    // function validate(this: yup.StringSchema, value: string, context: unknown) {
    //   const { path, createError } = this;
    //   const phoneNumber = phoneUtil.parse(value);
    //   if (!phoneUtil.isPossibleNumber(phoneNumber)) {
    //     return createError({
    //       path,
    //       message
    //     });
    //   }

    //   return true;
    // }
  );
});

const validationSchema = yup.object({
  displayName: yup.string().required('Name is required'),
  phoneNumber: yup
    .string()
    .test('validation', 'Phone number is invalid', function (value) {
      const { path, createError } = this;

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
    .required('Phone number is required')
});

const UserInfoForm = ({ open, handleClose }: UserInfoFormProps): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const { user, updateUserInfo } = useAuth();

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
        handleClose();
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
        Yout details
        <StyledIconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </StyledIconButton>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="displayName"
            label="Display name"
            value={formik.values.displayName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.displayName && Boolean(formik.errors.displayName)}
            helperText={formik.touched.displayName && formik.errors.displayName}
            fullWidth
          />
          <Spacer space={Spacings.large} />

          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            label="Phone number (include contry code)"
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
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserInfoForm;
