declare module '*.png';
declare module 'react-native-refresh-list-view';
declare module 'react-native-animated-header';
declare module 'react-native-share';
declare module 'react-native-masonry-list';
declare module 'dva-model-extend' {
  import {Model} from 'dva-core-ts';
  export default function modelExtend(...model: Model[]): Model;
}
