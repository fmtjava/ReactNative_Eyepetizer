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

let IconShare1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M853.266 721.192c-52.007-30.025-116.249-19.529-156.254 22.037l-338.96-195.698c6.799-23.563 6.542-48.11 0.008-70.855l338.827-195.622c39.885 41.36 104.185 51.954 156.191 21.928 61.263-35.37 82.254-113.705 46.884-174.969C864.592 66.75 786.255 45.76 724.991 81.13c-52.006 30.026-74.98 91.009-59.104 146.229L327.026 423.001c-8.088-8.34-17.455-15.711-28.017-21.81-15.367-8.872-31.806-14.2-48.37-16.239-26.743-3.359-54.761 1.661-79.904 16.177C109.47 436.501 88.481 514.837 123.852 576.1c13.176 22.822 32.316 40.051 54.313 50.863 0.058 0.029 0.116 0.059 0.173 0.087 0.27 0.133 0.542 0.261 0.813 0.392 50.397 24.487 109.985 13.179 147.902-26.217l338.959 195.698c-15.996 55.428 7.162 116.095 59.168 146.122 61.263 35.37 139.599 14.382 174.969-46.882C935.519 834.9 914.529 756.563 853.266 721.192z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconShare1.defaultProps = {
  size: 18,
};

IconShare1 = React.memo ? React.memo(IconShare1) : IconShare1;

export default IconShare1;
