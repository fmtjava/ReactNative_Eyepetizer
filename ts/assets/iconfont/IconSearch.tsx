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

let IconSearch: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M768 448a362.666667 362.666667 0 1 0-725.333333 0 362.666667 362.666667 0 0 0 725.333333 0z m-640 0a277.333333 277.333333 0 1 1 554.666667 0 277.333333 277.333333 0 0 1-554.666667 0z m739.925333 525.568l-194.304-196.949333 60.757334-59.904 194.304 196.949333-60.757334 59.904z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconSearch.defaultProps = {
  size: 18,
};

IconSearch = React.memo ? React.memo(IconSearch) : IconSearch;

export default IconSearch;
