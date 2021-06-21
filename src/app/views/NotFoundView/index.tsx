import React from 'react';
import { Typography, Link } from '@material-ui/core';

import { generateRouteUrl } from '~src/routes';
import { Center } from '~app/components';

const NotFoundView = (): JSX.Element => {
  return (
    <Center>
      <Typography variant="h3" color="textSecondary" paragraph>
        404
      </Typography>
      <Typography variant="h4" paragraph>
        Page not found
      </Typography>

      <Typography variant="body1">
        <Link href={generateRouteUrl('home')}>Click here</Link> to go to home page
      </Typography>
    </Center>
  );
};

export default NotFoundView;
