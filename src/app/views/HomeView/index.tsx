import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';

import { generateRouteUrl } from '~src/routes';
import { useAuth } from '~app/hooks';

const HomeView = (): JSX.Element => {
  const { signOut } = useAuth();
  const history = useHistory();

  const onSingoutClick = () => {
    signOut();
    history.replace(generateRouteUrl('login'));
  };

  return (
    <Box>
      HomeView
      <button onClick={() => onSingoutClick()}>Logout</button>
    </Box>
  );
};

export default HomeView;
