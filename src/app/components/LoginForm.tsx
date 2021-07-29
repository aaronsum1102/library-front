import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Typography, TextField, TextFieldProps, Button, Box, styled } from '@material-ui/core';

import { AuthActionResult } from '~app/contexts';
import Loader from './Loader';
import Spacer, { Spacings } from './Spacer';

interface Props {
  buttonText: string;
  onSubmitCallback: (email: string) => Promise<AuthActionResult>;
}

interface EmailField {
  value: string;
  error: boolean;
  helperText: string;
}

const Container = styled(Box)({
  width: '100%',
  maxWidth: '300px'
});

const StyledTextField = styled(TextField)({
  width: '100%'
});

const StyledButton = styled(Button)({
  width: '100%',
  padding: '0.5rem 1rem 0.5rem 1rem'
});

const LoginForm = ({ onSubmitCallback, buttonText }: Props): JSX.Element => {
  const isMounted = useRef(true);

  const [emailField, setEmailField] = useState<EmailField>({
    value: '',
    error: false,
    helperText: ''
  });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<{ error: boolean; message?: string } | undefined>(
    undefined
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const validateEmail = (value: string): boolean => {
    return new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value);
  };

  const onChange: TextFieldProps['onChange'] = (element) => {
    const { value } = element.target;

    setEmailField({
      ...emailField,
      value,
      error: false,
      helperText: ''
    });

    setAuthError(undefined);
  };

  const onLogin = useCallback(
    async (event: React.SyntheticEvent) => {
      event.preventDefault();

      setLoading(true);

      const error = !validateEmail(emailField.value);

      if (!error) {
        const result = await onSubmitCallback(emailField.value);

        if (!result.success && isMounted.current) {
          setEmailField({
            ...emailField,
            error: false
          });

          setAuthError({ error: !result.success, message: result.errorMessage });
        }
      } else {
        setEmailField({
          ...emailField,
          error,
          helperText: emailField.value ? 'Invalid email provided' : 'Email is required'
        });
      }

      if (isMounted.current) setLoading(false);
    },
    [emailField, onSubmitCallback, setLoading]
  );

  return (
    <>
      <Typography variant="h3" align="center">
        Log in to Library
      </Typography>
      <Spacer space={Spacings.xLarge} />
      <Container component="form" onSubmit={onLogin}>
        {authError?.error && (
          <>
            <Box bgcolor="error.main" color="error.contrastText" padding={2} minWidth="100%">
              {authError.message || 'Authentication failed. Please try again later.'}
            </Box>
            <Spacer space={Spacings.xLarge} />
          </>
        )}
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
          type="submit"
          variant="contained"
          color="primary"
          disabled={!emailField.value || emailField.error}
          startIcon={loading && <Loader showText={false} size="1rem" />}
        >
          {buttonText}
        </StyledButton>
      </Container>
    </>
  );
};

export default LoginForm;
