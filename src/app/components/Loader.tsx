import React from 'react';
import { CircularProgress, CircularProgressProps, Typography } from '@material-ui/core';

import { Center, Spacer } from '.';

interface Props extends CircularProgressProps {
  showText?: boolean;
  children?: React.ReactNode;
}

export const Loader = ({
  showText = true,
  children = <Typography variant="h6">Loading...</Typography>,
  color = 'inherit',
  ...rest
}: Props): JSX.Element => {
  return (
    <Center>
      <CircularProgress {...rest} color={color} />
      {showText && (
        <>
          <Spacer />
          {children}
        </>
      )}
    </Center>
  );
};
