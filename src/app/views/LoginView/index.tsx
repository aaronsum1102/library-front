import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, Card, CardContent, styled } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { Center, LoginForm, Dropdown, Spacer } from '~app/components';
import { AuthenticatingInfo } from './components';
import { useAuth } from '~app/hooks';
import { generateRouteUrl } from '~src/routes';

const StyledCardContent = styled(CardContent)({
  padding: '3rem',

  '&:last-child': {
    paddingBottom: '3rem'
  }
});

const LoginView = (): JSX.Element => {
  const userLanguage = window.localStorage.getItem('userLanguage');
  const [isWaitingForVerification, setIsWaitingForVerification] = useState(false);
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState(userLanguage || 'en');

  const { user, sendSignInLink } = useAuth();
  const { t, i18n } = useTranslation();

  const sendSignInLinkCallback = useCallback(
    async (finalEmail: string) => {
      setEmail(finalEmail);
      const result = await sendSignInLink(finalEmail);

      if (result.success) {
        setIsWaitingForVerification(true);
      }

      return result;
    },
    [setEmail, sendSignInLink, setIsWaitingForVerification]
  );

  if (user) {
    return <Redirect to={generateRouteUrl('home')} />;
  }

  const onlanguagechange = (value: string) => {
    window.localStorage.setItem('userLanguage', value);
    setLanguage(value);
    i18n.changeLanguage(value);
  };

  return (
    <Box height="100vh">
      <Center>
        {!isWaitingForVerification ? (
          <Box>
            <Card variant="outlined">
              <StyledCardContent>
                <LoginForm
                  buttonText={t('button:continue')}
                  onSubmitCallback={sendSignInLinkCallback}
                />
              </StyledCardContent>
            </Card>
            <Spacer />
            <Dropdown
              id="language-selector"
              label=""
              value={language}
              options={[
                { label: 'English', value: 'en' },
                { label: '繁體中文', value: 'zh-TW' }
              ]}
              onChange={onlanguagechange}
            />
          </Box>
        ) : (
          <AuthenticatingInfo email={email} />
        )}
      </Center>
    </Box>
  );
};

export default LoginView;
