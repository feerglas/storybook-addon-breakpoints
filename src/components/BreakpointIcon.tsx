import { styled } from '@storybook/theming';
import React, { FC } from 'react';

const Svg = styled.svg<{ inline?: boolean }>(
  {
    // Fix rendering bugs in Chrome for hdpi
    shapeRendering: 'inherit',
    transform: 'translate3d(0,0,0)',
  },
  ({ inline }) => ({
    display: inline ? 'inline-block' : 'block',
  }),
);

const Path = styled.path({
  fill: 'currentColor',
});

const BreakpointIcon: FC = () => (
  <Svg viewBox="0 0 512 512">
    <Path d="M96 32V64L96 448L96 480H32L32 448L32 64V32L96 32ZM192 224H160V288H192H336H368V224H336H192ZM192 416H160L160 480H192L448 480H480V416H448L192 416ZM192 32H160V96H192H224H256V32H224H192Z"/>
  </Svg>
);

export default BreakpointIcon;
