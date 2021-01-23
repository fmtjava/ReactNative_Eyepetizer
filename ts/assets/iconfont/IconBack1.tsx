/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconBack1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M224 480h640q14.016 0 23.008 8.992T896 512t-8.992 23.008T864 544H224q-14.016 0-23.008-8.992T192 512t8.992-23.008T224 480z m12.992 32l266.016 264.992Q512 787.008 512 800t-9.504 22.496T480 832t-23.008-8.992l-288-288Q160 524.992 160 512t8.992-23.008l288-288Q467.008 192 480 192t22.496 9.504T512 224t-8.992 23.008z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBack1.defaultProps = {
  size: 18,
};

IconBack1 = React.memo ? React.memo(IconBack1) : IconBack1;

export default IconBack1;
