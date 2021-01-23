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

let IconBack: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M957.046154 452.923077H303.261538c-17.723077 0-25.6-21.661538-13.784615-33.476923l189.046154-189.046154c11.815385-11.815385 11.815385-29.538462 0-41.353846l-43.323077-43.323077c-11.815385-11.815385-29.538462-11.815385-41.353846 0L49.230769 492.307692c-11.815385 11.815385-11.815385 29.538462 0 41.353846L393.846154 878.276923c11.815385 11.815385 29.538462 11.815385 41.353846 0l41.353846-41.353846c11.815385-11.815385 11.815385-29.538462 0-41.353846l-189.046154-189.046154c-11.815385-13.784615-3.938462-35.446154 13.784616-35.446154h653.784615c15.753846 0 29.538462-11.815385 29.538462-27.569231v-59.076923c0-15.753846-11.815385-31.507692-27.569231-31.507692z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBack.defaultProps = {
  size: 18,
};

IconBack = React.memo ? React.memo(IconBack) : IconBack;

export default IconBack;
