import React from 'react';
import { CircularProgress, CircularProgressProps, Typography } from '@material-ui/core';
import Center from './Center';
import Spacer from './Spacer';

interface Props extends CircularProgressProps {
  showText?: boolean;
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'inherit';
}

const Loader = ({ showText, children, color, ...rest }: Props): JSX.Element => {
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

Loader.defaultProps = {
  showText: true,
  children: <Typography variant="h6">Loading...</Typography>,
  color: 'inherit'
};

export default Loader;
