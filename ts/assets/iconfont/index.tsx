/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconIconVoice from './IconIconVoice';
import IconWantempty from './IconWantempty';
import IconBusinessSearchStatistics from './IconBusinessSearchStatistics';
import IconSearch from './IconSearch';
import IconVideo from './IconVideo';
import IconPhotoLibrary from './IconPhotoLibrary';
import IconDianzan from './IconDianzan';
import IconAiArrowDown from './IconAiArrowDown';
import IconAixinXian from './IconAixinXian';
import IconCommentlinesFill from './IconCommentlinesFill';
import IconStar from './IconStar';
import IconBack1 from './IconBack1';
import IconShare1 from './IconShare1';
import IconIShare from './IconIShare';
import IconBack from './IconBack';
import IconComment from './IconComment';
import IconLove from './IconLove';

export type IconNames = 'icon-Icon_voice' | 'icon-wantempty' | 'icon-business-search-statistics' | 'icon-search' | 'icon-Video' | 'icon-photo-library' | 'icon-dianzan' | 'icon-ai-arrow-down' | 'icon-aixin-xian' | 'icon-commentlines-fill' | 'icon-star' | 'icon-back1' | 'icon-share1' | 'icon-i-share' | 'icon-back' | 'icon-comment' | 'icon-Love';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'icon-Icon_voice':
      return <IconIconVoice key="1" {...rest} />;
    case 'icon-wantempty':
      return <IconWantempty key="2" {...rest} />;
    case 'icon-business-search-statistics':
      return <IconBusinessSearchStatistics key="3" {...rest} />;
    case 'icon-search':
      return <IconSearch key="4" {...rest} />;
    case 'icon-Video':
      return <IconVideo key="5" {...rest} />;
    case 'icon-photo-library':
      return <IconPhotoLibrary key="6" {...rest} />;
    case 'icon-dianzan':
      return <IconDianzan key="7" {...rest} />;
    case 'icon-ai-arrow-down':
      return <IconAiArrowDown key="8" {...rest} />;
    case 'icon-aixin-xian':
      return <IconAixinXian key="9" {...rest} />;
    case 'icon-commentlines-fill':
      return <IconCommentlinesFill key="10" {...rest} />;
    case 'icon-star':
      return <IconStar key="11" {...rest} />;
    case 'icon-back1':
      return <IconBack1 key="12" {...rest} />;
    case 'icon-share1':
      return <IconShare1 key="13" {...rest} />;
    case 'icon-i-share':
      return <IconIShare key="14" {...rest} />;
    case 'icon-back':
      return <IconBack key="15" {...rest} />;
    case 'icon-comment':
      return <IconComment key="16" {...rest} />;
    case 'icon-Love':
      return <IconLove key="17" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
