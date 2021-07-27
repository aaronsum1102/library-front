import React from 'react';
import { Box, Container, styled } from '@material-ui/core';

const StyledBox = styled(Box)({
  flex: '1 1 0%'
});

const PageContent: React.FC = ({ children }) => {
  return (
    <StyledBox>
      <Container maxWidth="xl" component="section">
        <>{children}</>
      </Container>
    </StyledBox>
  );
};

export default PageContent;
