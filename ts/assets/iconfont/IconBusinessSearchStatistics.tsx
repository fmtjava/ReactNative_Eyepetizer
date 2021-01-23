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

let IconBusinessSearchStatistics: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M568.768 910.08h-373.76A137.728 137.728 0 0 1 57.6 772.352V195.648A137.6 137.6 0 0 1 195.008 57.728h577.92a137.6 137.6 0 0 1 137.344 137.792v373.248h-0.768l-7.424 12.096a227.136 227.136 0 1 0-313.088 328.704h-20.224v0.512zM227.392 341.12h341.376v-57.024H227.392v56.96z m0 170.432h341.376V455.04H227.392v56.32z m724.416 379.712c17.536 17.6 21.184 44.032 0 61.888a42.368 42.368 0 0 1-61.44 0l-58.24-57.408a148.736 148.736 0 0 1-87.872 26.56c-96.448 0-175.488-79.552-175.488-176.64 0-97.152 79.04-176.704 175.488-176.704 96.64 0 175.616 79.552 175.616 176.64 0 35.392-8.832 61.824-26.24 88.384l58.176 57.28z m-212.608-38.528a113.664 113.664 0 1 0-0.064-227.328 113.664 113.664 0 0 0 0 227.328z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBusinessSearchStatistics.defaultProps = {
  size: 18,
};

IconBusinessSearchStatistics = React.memo ? React.memo(IconBusinessSearchStatistics) : IconBusinessSearchStatistics;

export default IconBusinessSearchStatistics;
