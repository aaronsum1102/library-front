import React, { useState, useRef, useEffect } from 'react';
import { Typography, TextField, Button, Box, styled } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { AuthActionResult } from '~app/contexts';

import Loader from './Loader';
import Spacer, { Spacings } from './Spacer';

interface Props {
  buttonText: string;
  onSubmitCallback: (email: string) => Promise<AuthActionResult>;
}

const Container = styled('form')({
  width: '100%',
  maxWidth: '300px'
});

const StyledButton = styled(Button)({
  width: '100%',
  padding: '0.5rem 1rem 0.5rem 1rem'
});

const validationSchema = yup.object({
  email: yup.string().email('Invalid email provided').required('Email is required')
});

const LoginForm = ({ onSubmitCallback, buttonText }: Props): JSX.Element => {
  const isMounted = useRef(true);

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<{ error: boolean; message?: string } | undefined>(
    undefined
  );

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const result = await onSubmitCallback(values.email);

      if (!result.success && isMounted.current) {
        setAuthError({ error: !result.success, message: result.errorMessage });
      }

      if (isMounted.current) setLoading(false);
    }
  });

  return (
    <>
      <Typography variant="h3" align="center">
        Log in to Library
      </Typography>
      <Spacer space={Spacings.xLarge} />
      <Container onSubmit={formik.handleSubmit}>
        {authError?.error && (
          <>
            <Box bgcolor="error.main" color="error.contrastText" padding={2} minWidth="100%">
              {authError.message || 'Authentication failed. Please try again later.'}
            </Box>
            <Spacer space={Spacings.xLarge} />
          </>
        )}
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          inputProps={{ 'aria-label': 'email' }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
        />
        <Spacer space={Spacings.large} />
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          startIcon={loading && <Loader showText={false} size="1rem" />}
        >
          {buttonText}
        </StyledButton>
      </Container>
    </>
  );
};

export default LoginForm;
