import React from 'react';
import { styled } from '@material-ui/core';

export enum Spacings {
  small = '0.5rem',
  medium = '1rem',
  large = '1.5rem',
  xLarge = '2rem',
  xxLarge = '3rem'
}

export enum Orientations {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

interface Props {
  space?: Spacings;
  orientation?: Orientations;
}

const StyledSpacer = styled('div')(({ space, orientation }: Props) => {
  if (orientation === Orientations.vertical) {
    return {
      width: space,
      minHeight: '100%'
    };
  }

  return {
    height: space,
    minWidth: '100%'
  };
});

const Spacer = (props: Props): JSX.Element => {
  return <StyledSpacer {...props} />;
};

Spacer.defaultProps = {
  space: Spacings.medium,
  orientation: Orientations.horizontal
};

export default Spacer;
