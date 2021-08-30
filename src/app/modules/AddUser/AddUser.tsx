import React, { useState, useEffect } from 'react';
import { TextField, DialogContentText, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { FormDialog, Dropdown, DropdownOption, Spacer, Spacings, Loader } from '~app/components';
import { useUser } from '~app/hooks';

const AddUser = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addUser, refetchUsers } = useUser();
  const { t } = useTranslation();

  const options: DropdownOption<boolean>[] = [
    {
      label: t('general:normalUser'),
      value: false
    },
    {
      label: t('general:admin'),
      value: true
    }
  ];

  const validationSchema = yup.object({
    email: yup.string().email(t('form:invalidEmail')).required(t('form:emailRequired')),
    admin: yup.bool()
  });

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
  }, [open, formik]);

  return (
    <FormDialog
      title={t('user:addUser')}
      label={t('user:addUser')}
      labelEndIcon={<AddIcon />}
      open={open}
      handleClickOpen={() => setOpen(true)}
      handleClose={() => setOpen(false)}
      onSubmit={formik.handleSubmit}
      content={
        <>
          <DialogContentText>{t('user:addUserText')}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label={t('general:email')}
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
            label={t('form:userType')}
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
          {t('button:add')}
        </Button>
      }
    />
  );
};

export default AddUser;
