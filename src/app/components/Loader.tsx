import React from 'react';
import { styled, Box, CircularProgress, Typography } from '@material-ui/core';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
});

const StyledTypography = styled(Typography)({
  marginTop: '16px'
});

interface Props {
  showText?: boolean;
  text?: string;
}

export const Loader = ({ showText = true, text = 'Loading...' }: Props): JSX.Element => {
  return (
    <StyledBox>
      <CircularProgress />
      {showText && <StyledTypography>{text}</StyledTypography>}
    </StyledBox>
  );
};
