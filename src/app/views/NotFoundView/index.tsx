import React from 'react';
import { Typography, Link } from '@material-ui/core';

import { generateRouteUrl } from '~src/routes';
import { Center } from '~app/components';

interface Props {
  staticContext: {
    statusCode: number;
  };
}

const NotFoundView = ({ staticContext }: Props): JSX.Element => {
  staticContext.statusCode = 404;

  return (
    <Center>
      <Typography variant="h3" color="textSecondary" paragraph>
        {staticContext.statusCode}
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

NotFoundView.defaultProps = {
  staticContext: {}
};

export default NotFoundView;
