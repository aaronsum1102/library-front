import React, { useState, useEffect } from 'react';
import { TextField, DialogContentText, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { FormDialog, Dropdown, DropdownOption, Spacer, Spacings, Loader } from '~app/components';
import { useResourceAction, useResources, useAuth } from '~app/hooks';

const AddResourceMenu = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { add } = useResourceAction();
  const { refetchResources } = useResources();
  const { t } = useTranslation();

  const validationSchema = yup.object({
    title: yup.string().required(t('material:titleRequired')),
    ebook: yup.bool()
  });

  const options: DropdownOption<boolean>[] = [
    {
      label: t('general:book'),
      value: false
    },
    {
      label: t('general:eBook'),
      value: true
    }
  ];

  const formik = useFormik({
    initialValues: {
      title: '',
      ebook: false
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      await add({
        variables: {
          input: {
            ...values
          }
        }
      });

      setLoading(false);
      refetchResources();
      setOpen(false);
    }
  });

  useEffect(() => {
    if (open === false) {
      formik.resetForm();
    }
  }, [open, formik]);

  if (!user?.admin) {
    return <></>;
  }

  return (
    <FormDialog
      title={t('material:addMaterial')}
      label={t('material:addMaterial')}
      labelEndIcon={<AddIcon />}
      open={open}
      handleClickOpen={() => setOpen(true)}
      handleClose={() => setOpen(false)}
      onSubmit={formik.handleSubmit}
      content={
        <>
          <DialogContentText>{t('material:addMaterialHelperText')}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label={t('general:title')}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            fullWidth
          />
          <Spacer space={Spacings.large} />
          <Dropdown
            id="material-type"
            label={t('general:materialType')}
            value={formik.values.ebook}
            options={options}
            onChange={(value) => formik.setFieldValue('ebook', value)}
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

export default AddResourceMenu;
