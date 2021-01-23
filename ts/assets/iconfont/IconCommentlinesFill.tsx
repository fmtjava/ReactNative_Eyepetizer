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

let IconCommentlinesFill: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M64 64h896v709.312H363.648L64 960V64z m224 224v112h448V288H288z m0 186.688v112h448v-112H288z"
        fill={getIconColor(color, 0, '#595959')}
      />
    </Svg>
  );
};

IconCommentlinesFill.defaultProps = {
  size: 18,
};

IconCommentlinesFill = React.memo ? React.memo(IconCommentlinesFill) : IconCommentlinesFill;

export default IconCommentlinesFill;
