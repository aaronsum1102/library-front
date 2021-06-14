import React from 'react';
import { useHistory } from 'react-router-dom';

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
    <div>
      HomeView
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default HomeView;
