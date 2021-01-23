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

let IconPhotoLibrary: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M938.666667 682.666667V170.666667c0-47.146667-38.186667-85.333333-85.333334-85.333334H341.333333c-47.146667 0-85.333333 38.186667-85.333333 85.333334v512c0 47.146667 38.186667 85.333333 85.333333 85.333333h512c47.146667 0 85.333333-38.186667 85.333334-85.333333z m-469.333334-170.666667l86.613334 115.626667L682.666667 469.333333l170.666666 213.333334H341.333333l128-170.666667zM85.333333 256v597.333333c0 47.146667 38.186667 85.333333 85.333334 85.333334h597.333333v-85.333334H170.666667V256H85.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPhotoLibrary.defaultProps = {
  size: 18,
};

IconPhotoLibrary = React.memo ? React.memo(IconPhotoLibrary) : IconPhotoLibrary;

export default IconPhotoLibrary;
