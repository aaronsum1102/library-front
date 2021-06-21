import React from 'react';
import { styled, Box } from '@material-ui/core';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%'
});

interface Props {
  children: React.ReactNode;
}

const Center = ({ children }: Props): JSX.Element => {
  return <StyledBox>{children}</StyledBox>;
};

export default Center;
