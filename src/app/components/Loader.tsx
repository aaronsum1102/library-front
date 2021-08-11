import React from 'react';
import { CircularProgress, CircularProgressProps, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import Center from './Center';
import Spacer from './Spacer';

interface Props extends CircularProgressProps {
  showText?: boolean;
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'inherit';
}

const Loader = ({ showText, children, color, ...rest }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Center>
      <CircularProgress {...rest} color={color} />
      {showText && (
        <>
          <Spacer />
          {!children && <Typography variant="h6">{t('general:loading')}...</Typography>}
        </>
      )}
    </Center>
  );
};

Loader.defaultProps = {
  showText: true,
  children: undefined,
  color: 'inherit'
};

export default Loader;
