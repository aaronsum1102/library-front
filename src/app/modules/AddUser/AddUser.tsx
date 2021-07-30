import React, { useState } from 'react';
import { TextField, DialogContentText, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAddUserMutation } from '~app/apollo/generated/graphql';
import { FormDialog, Dropdown, DropdownOption, Spacer, Spacings, Loader } from '~app/components';
import { useSnackbar } from '~app/hooks';

const options: DropdownOption<boolean>[] = [
  {
    label: 'Normal User',
    value: false
  },
  {
    label: 'Admin',
    value: true
  }
];

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  admin: yup.bool()
});

const AddUser = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { addSnackbar } = useSnackbar();

  const [addUser, { loading }] = useAddUserMutation({
    onCompleted() {
      addSnackbar({
        content: 'User has been added.'
      });
    },
    onError() {
      addSnackbar({
        content: 'Failed to add user',
        error: true
      });
    }
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      admin: false
    },
    validationSchema,
    onSubmit: async (values) => {
      await addUser({
        variables: {
          input: values
        }
      });

      setOpen(false);
    }
  });

  return (
    <FormDialog
      title="Add user"
      label="Add user"
      labelEndIcon={<AddIcon />}
      open={open}
      handleClickOpen={() => setOpen(true)}
      handleClose={() => setOpen(false)}
      onSubmit={formik.handleSubmit}
      onCloseCallback={() => formik.resetForm()}
      content={
        <>
          <DialogContentText>
            Please enter the email address of a new user and select user type
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
          <Spacer space={Spacings.large} />
          <Dropdown
            id="user-type"
            label="User type"
            value={formik.values.admin}
            options={options}
            onChange={(value) => formik.setFieldValue('admin', value)}
          />
          <Spacer space={Spacings.xLarge} />
        </>
      }
      action={
        <Button
          color="primary"
          variant="contained"
          type="submit"
          startIcon={loading && <Loader showText={false} size="1rem" />}
        >
          Add
        </Button>
      }
    />
  );
};

export default AddUser;
