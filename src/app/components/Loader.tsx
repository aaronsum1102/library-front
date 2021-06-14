import React from 'react';
import { styled, CircularProgress, Typography } from '@material-ui/core';

import { Center } from './Center';

const StyledTypography = styled(Typography)({
  marginTop: '16px'
});

interface Props {
  showText?: boolean;
  text?: string;
}

export const Loader = ({ showText = true, text = 'Loading...' }: Props): JSX.Element => {
  return (
    <Center>
      <CircularProgress />
      {showText && <StyledTypography>{text}</StyledTypography>}
    </Center>
  );
};
