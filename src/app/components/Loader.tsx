import React from 'react';
import { styled, CircularProgress, CircularProgressProps, Typography } from '@material-ui/core';

import { Center } from './Center';

const StyledTypography = styled(Typography)({
  marginTop: '16px'
});

interface Props extends CircularProgressProps {
  showText?: boolean;
  text?: string;
}

export const Loader = ({
  showText = true,
  text = 'Loading...',
  color = 'inherit',
  ...rest
}: Props): JSX.Element => {
  return (
    <Center>
      <CircularProgress {...rest} color={color} />
      {showText && <StyledTypography variant="h6">{text}</StyledTypography>}
    </Center>
  );
};
