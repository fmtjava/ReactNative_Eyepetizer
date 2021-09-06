import moment from 'moment';
import Share from 'react-native-share';
import {Dimensions, Platform, NativeModules} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const FeedWidth = ScreenWidth - 30;
const FeedHeight = 200;

//获取系统状态栏高度
const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? getStatusBarHeight() : StatusBarManager.HEIGHT;

//--------------------通用路由组件跳转以及返回方法----------------
const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(name: string, param?: any) {
  navigationRef.current?.navigate(name, param);
}

function goBack() {
  navigationRef.current?.goBack();
}
//---------------

//通用时间格式化方法(使用moment插件，简化开发)-------------
function formatDateMsByMS(millisecond: number) {
  return moment(new Date(millisecond)).format('mm:ss');
}

function formatDateMsByYMD(millisecond: number) {
  return moment(new Date(millisecond)).format('yyyy/MM/DD');
}

function formatDateMsByYMDHM(millisecond: number) {
  return moment(new Date(millisecond)).format('yyyy/MM/DD HH:mm');
}
//---------

//通用分享方法
async function share(title: string, url: string) {
  try {
    await Share.open({title: title, url: url});
  } catch (error) {}
}

//导出通用的配置项，供各个页面使用
export {
  ScreenWidth,
  ScreenHeight,
  FeedWidth,
  FeedHeight,
  STATUSBAR_HEIGHT,
  navigationRef,
  formatDateMsByMS,
  formatDateMsByYMD,
  formatDateMsByYMDHM,
  share,
  navigate,
  goBack,
};
