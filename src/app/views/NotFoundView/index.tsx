import React from 'react';
import { Box, Typography, Link } from '@material-ui/core';

import { generateRouteUrl } from '~src/routes';

interface Props {
  staticContext: {
    statusCode: number;
  };
}
const NotFoundView = ({ staticContext }: Props): JSX.Element => {
  staticContext.statusCode = 404;

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Typography variant="h4" gutterBottom>
          Page not found
        </Typography>

        <Typography variant="body1">
          <Link href={generateRouteUrl('home')}>Click here</Link> to go to home page
        </Typography>
      </Box>
    </>
  );
};

NotFoundView.defaultProps = {
  staticContext: {}
};

export default NotFoundView;
