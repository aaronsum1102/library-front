import React, { useCallback, useState } from 'react';
import { Box, Typography, Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useAuth, useSnackbar } from '~app/hooks';
import { Spacer, Spacings, Dropdown } from '~app/components';
import { UserInfoForm } from '~app/modules';

const ProfileView = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const userLanguage = window.localStorage.getItem('userLanguage');
  const [language, setLanguage] = useState(userLanguage || 'en');

  const { user, signOut } = useAuth();
  const { addSnackbar } = useSnackbar();
  const { t, i18n } = useTranslation();

  const onRequestSignout = useCallback(async () => {
    const result = await signOut();

    if (!result) {
      addSnackbar({
        content: t('auth:signOutError'),
        error: true
      });
    }
  }, [signOut]);

  const onlanguagechange = (value: string) => {
    window.localStorage.setItem('userLanguage', value);
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  if (!user) {
    return <></>;
  }

  return (
    <>
      <Box display="flex">
        <Box flexGrow={1}>
          <Typography variant="h4">{t('user:profile')}</Typography>
          <Typography variant="h5">
            {t('user:welcome')} {user.displayName || user.email.split('@')[0]}
          </Typography>
        </Box>
        <Box>
          <Button variant="outlined" onClick={onRequestSignout}>
            {t('button:signOut')}
          </Button>
        </Box>
      </Box>

      <Spacer space={Spacings.xxxLarge} />

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography component="label" color="textSecondary">
            {t('general:email')}
          </Typography>
          <Typography>{user.email}</Typography>
          <Spacer space={Spacings.large} />

          <Typography component="label" color="textSecondary">
            {t('general:displayName')}
          </Typography>
          <Typography>{user.displayName || '-'}</Typography>
          <Spacer space={Spacings.large} />

          <Typography component="label" color="textSecondary">
            {t('general:phoneNumber')}
          </Typography>
          <Typography>{user.phoneNumber || '-'}</Typography>
          <Spacer space={Spacings.large} />

          <Dropdown
            id="language-selector"
            label={t('form:language')}
            value={language}
            options={[
              { label: 'English', value: 'en' },
              { label: '繁體中文', value: 'zh-TW' }
            ]}
            onChange={onlanguagechange}
          />
          <Spacer space={Spacings.large} />
        </Grid>
      </Grid>
      <Spacer space={Spacings.large} />

      <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
        {t('button:editInformation')}
      </Button>

      <UserInfoForm
        open={open}
        handleClose={() => setOpen(false)}
        onSubmitCallback={() => setOpen(false)}
      />
    </>
  );
};

export default ProfileView;
