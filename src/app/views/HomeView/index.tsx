import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';

import { generateRouteUrl } from '~src/routes';
import { useAuth } from '~app/hooks';

const HomeView = (): JSX.Element => {
  const { signOut } = useAuth();
  const history = useHistory();

  const onSingoutClick = async () => {
    await signOut();
    history.push(generateRouteUrl('login'));
  };

  return (
    <Box>
      HomeView
      <Button onClick={() => onSingoutClick()}>Logout</Button>
    </Box>
  );
};

export default HomeView;
