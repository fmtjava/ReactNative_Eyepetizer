import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomTabs from '@/navigator/BottomTabs';
import {Platform} from 'react-native';
import NewsDetailPage from '@/page/discover/NewsDetailPage';
import VideoDetailPage from '@/page/video/VideoDetailPage';
import {Item} from '@/model/Daily';
import {navigationRef} from '@/utils/Utils';
import SearchPage from '@/page/search/SearchPage';
import RecommendImageGallery, {
  IImageUrl,
} from '@/page/discover/RecommendImageGallery';
import {IMasonry} from '@/model/Masonry';
import RecommendVideoPage from '@/page/discover/RecommendVideoPage';
import TopicDetailPage from '@/page/discover/TopicDetailPage';
import CategoryDetailPage from '@/page/discover/CategoryDetailPage';
import {ICategory} from '@/model/Category';

//定义每一个页面的名称以及进入页面传递参数的类型
export type RootStackParamList = {
  BottomTabs: undefined;
  SearchPage: undefined;
  TopicDetail: {
    id: number;
  };
  NewsDetail: {
    url: string;
  };
  VideoDetail: {
    item: Item;
  };
  CategoryDetail: {
    item: ICategory;
  };
};

//导出堆栈导航器对于的Navigation，方便各个页面之间进行跳转
export type RootNavigation = StackNavigationProp<RootStackParamList>;

//创建堆栈导航器
const Stack = createStackNavigator<RootStackParamList>();

function RootStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          ...Platform.select({
            android: {
              elevation: 0,
              borderBottomWidth: 0,
            },
            ios: {
              shadowOpacity: 0,
            },
          }),
        },
        headerBackTitleVisible: false,
        headerTitleStyle: {
          color: '#000',
        },
        headerTintColor: '#333',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen
        name="SearchPage"
        component={SearchPage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="TopicDetail" component={TopicDetailPage} />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetailPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VideoDetail"
        component={VideoDetailPage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CategoryDetail" component={CategoryDetailPage} />
    </Stack.Navigator>
  );
}

export type ModalStackParamList = {
  Root: undefined;
  Gallery: {
    images: IImageUrl[];
  };
  RecommendVideo: {
    masonry: IMasonry;
  };
};

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

const ModalStack = createStackNavigator<ModalStackParamList>();

function ModalStackScreen() {
  return (
    <ModalStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        headerShown: false,
      }}>
      <ModalStack.Screen name="Root" component={RootStackScreen} />
      <ModalStack.Screen
        name="Gallery"
        component={RecommendImageGallery}
        options={{headerShown: false}}
      />
      <ModalStack.Screen
        name="RecommendVideo"
        component={RecommendVideoPage}
        options={{headerShown: false}}
      />
    </ModalStack.Navigator>
  );
}

class Router extends React.Component {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <ModalStackScreen />
      </NavigationContainer>
    );
  }
}

export default Router;
