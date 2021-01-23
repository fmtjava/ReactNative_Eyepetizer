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

let IconIconVoice: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M506.368 671.744c88.064 0 159.744-71.68 159.744-159.744V320c0-88.064-71.68-159.744-159.744-159.744s-159.744 71.68-159.744 159.744V512c-0.512 88.576 71.168 159.744 159.744 159.744M742.4 448c-17.92 0-31.744 14.336-31.744 31.744v24.576c0 116.224-94.72 210.432-210.944 210.432-116.224 0-210.944-94.72-210.944-210.432v-24.576c0-17.92-14.336-31.744-31.744-31.744-17.92 0-31.744 14.336-31.744 31.744v24.576c0 140.288 105.984 256 241.664 272.384v87.04c0 17.92 14.336 31.744 31.744 31.744 17.92 0 31.744-14.336 31.744-31.744v-86.528c137.216-15.36 244.736-131.584 244.736-272.896v-24.576c-1.024-17.408-14.848-31.744-32.768-31.744"
        fill={getIconColor(color, 0, '#101010')}
      />
    </Svg>
  );
};

IconIconVoice.defaultProps = {
  size: 18,
};

IconIconVoice = React.memo ? React.memo(IconIconVoice) : IconIconVoice;

export default IconIconVoice;
