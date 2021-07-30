import React, { useState } from 'react';
import { TextField, DialogContentText, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  FormDialog,
  Dropdown,
  DropdownOption,
  Spacer,
  Spacings,
  Orientations
} from '~app/components';
import { FormatItalicTwoTone } from '@material-ui/icons';

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
  const formik = useFormik({
    initialValues: {
      email: '',
      admin: false
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <FormDialog
      title="Add user"
      label={
        <>
          Add user <Spacer orientation={Orientations.vertical} space={Spacings.small} />
          <AddIcon />
        </>
      }
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
        <Button color="primary" variant="contained" type="submit">
          Add
        </Button>
      }
    />
  );
};

export default AddUser;
