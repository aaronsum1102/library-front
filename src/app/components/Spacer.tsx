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

const StyledSpacer = styled('div')(
  ({ space = Spacings.medium, orientation = Orientations.horizontal }: Props) => {
    if (orientation == Orientations.vertical) {
      return {
        width: space,
        height: '100vh',
        maxHeight: '100%'
      };
    } else {
      return {
        height: space,
        width: '100vw',
        maxWidth: '100%'
      };
    }
  }
);

export const Spacer = (props: Props): JSX.Element => {
  return <StyledSpacer {...props} />;
};
