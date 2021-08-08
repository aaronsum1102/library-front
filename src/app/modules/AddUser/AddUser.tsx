import React, { useState, useEffect } from 'react';
import { TextField, DialogContentText, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { FormDialog, Dropdown, DropdownOption, Spacer, Spacings, Loader } from '~app/components';
import { useUser } from '~app/hooks';

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
  const [loading, setLoading] = useState(false);

  const { addUser, refetchUsers } = useUser();

  const formik = useFormik({
    initialValues: {
      email: '',
      admin: false
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      await addUser({
        variables: {
          input: values
        }
      });

      setLoading(false);
      refetchUsers();
      setOpen(false);
    }
  });

  useEffect(() => {
    if (open === false) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <FormDialog
      title="Add user"
      label="Add user"
      labelEndIcon={<AddIcon />}
      open={open}
      handleClickOpen={() => setOpen(true)}
      handleClose={() => setOpen(false)}
      onSubmit={formik.handleSubmit}
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
            onBlur={formik.handleBlur}
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
