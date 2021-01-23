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

let IconLove: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M642 274c-44.378 0-84.128 25.573-102.932 64.922L512 395.564l-27.068-56.642C466.128 299.573 426.378 274 382 274c-62.549 0-113.384 50.396-113.998 112.859 0.047 2.083 0.077 3.231 0.112 4.374 0.09 2.933 0.2 5.376 0.29 6.45 6.501 85.24 87.175 197.354 243.596 333.023 156.421-135.67 237.095-247.783 243.578-332.798 0.292-3.492 0.42-6.709 0.419-10.794C755.523 324.534 704.635 274 642 274zM208 387c0.655-95.799 78.353-173 174-173 50.808 0 97.66 21.983 130 58.315C544.34 235.983 591.192 214 642 214c95.648 0 173.346 77.202 173.996 172.796 0.004 5.914-0.186 10.805-0.6 15.786-8.373 109.022-103.63 237.867-284.016 390.525L512 809.508l-19.38-16.4C312.223 640.44 216.966 511.59 208.603 402.563c-0.331-4.07-0.603-12.957-0.603-15.564z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconLove.defaultProps = {
  size: 18,
};

IconLove = React.memo ? React.memo(IconLove) : IconLove;

export default IconLove;
