import React, { useCallback, useState } from 'react';

import { Typography, TextField, TextFieldProps, Button, styled } from '@material-ui/core';
import { Loader, Spacer, Spacings } from '~app/components';

interface Props {
  sendSignInLink: (email: string) => Promise<boolean>;
}

interface EmailField {
  value: string;
  error: boolean;
  helperText: string;
}

const StyledFormContainer = styled('form')({
  maxWidth: '320px'
});

const StyledTextField = styled(TextField)({
  minWidth: '100%',
  maxWidth: '100%'
});

const StyledButton = styled(Button)({
  minWidth: '100%',
  maxWidth: '100%'
});

const LoginForm = ({ sendSignInLink }: Props): JSX.Element => {
  const [emailField, setEmailField] = useState<EmailField>({
    value: '',
    error: false,
    helperText: ''
  });
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string): boolean => {
    return new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value);
  };

  const onChange: TextFieldProps['onChange'] = (element) => {
    const value = element.target.value;

    setEmailField({
      ...emailField,
      value,
      error: false,
      helperText: ''
    });
  };

  const onClick = useCallback(async () => {
    setLoading(true);

    const error = !validateEmail(emailField.value);

    if (!error) {
      const result = await sendSignInLink(emailField.value);

      if (!result) {
        setEmailField({
          ...emailField,
          error: true,
          helperText: 'Invalid email provided'
        });
      }
    } else {
      setEmailField({
        ...emailField,
        error,
        helperText: emailField.value ? 'Invalid email provided' : 'Email is required'
      });
    }

    setLoading(false);
  }, [emailField, sendSignInLink]);

  return (
    <>
      <Typography variant="h3">Log in to Library</Typography>
      <Spacer space={Spacings.xLarge} />
      <StyledFormContainer>
        <StyledTextField
          id="email"
          label="Email"
          variant="outlined"
          required
          inputProps={{ 'aria-label': 'email' }}
          value={emailField.value}
          error={emailField.error}
          onChange={onChange}
          helperText={emailField.helperText}
        />
        <Spacer space={Spacings.large} />
        <StyledButton
          variant="contained"
          color="primary"
          disabled={!emailField.value || emailField.error}
          onClick={onClick}
          startIcon={loading && <Loader showText={false} size="1rem" />}
        >
          Log in
        </StyledButton>
      </StyledFormContainer>
    </>
  );
};

export default LoginForm;
