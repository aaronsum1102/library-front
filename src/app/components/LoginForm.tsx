import React, { useCallback, useState, useRef, useEffect } from 'react';

import { Typography, TextField, TextFieldProps, Button, styled } from '@material-ui/core';
import { Loader, Spacer, Spacings } from '~app/components';

interface Props {
  buttonText: string;
  onSubmitCallback: (email: string) => Promise<boolean>;
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

const LoginForm = ({ onSubmitCallback, buttonText }: Props): JSX.Element => {
  const isMounted = useRef(true);
  const [emailField, setEmailField] = useState<EmailField>({
    value: '',
    error: false,
    helperText: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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
      const result = await onSubmitCallback(emailField.value);

      if (!result) {
        isMounted.current &&
          setEmailField({
            ...emailField,
            error: true
          });
      }
    } else {
      isMounted.current &&
        setEmailField({
          ...emailField,
          error,
          helperText: emailField.value ? 'Invalid email provided' : 'Email is required'
        });
    }

    isMounted.current && setLoading(false);
  }, [emailField, onSubmitCallback, setLoading]);

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
          {buttonText}
        </StyledButton>
      </StyledFormContainer>
    </>
  );
};

export default LoginForm;