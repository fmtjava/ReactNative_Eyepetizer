import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import DailyPage from '@/page/daily/DailyPage';
import MinePage from '@/page/mine/MinePage';
import {Image, StyleSheet} from 'react-native';
import ic_home_normal from '@/assets/ic_home_normal.png';
import ic_home_selected from '@/assets/ic_home_selected.png';
import ic_discovery_normal from '@/assets/ic_discovery_normal.png';
import ic_discovery_selected from '@/assets/ic_discovery_selected.png';
import ic_hot_normal from '@/assets/ic_hot_normal.png';
import ic_hot_selected from '@/assets/ic_hot_selected.png';
import ic_mine_normal from '@/assets/ic_mine_normal.png';
import ic_mine_selected from '@/assets/ic_mine_selected.png';
import {RouteProp} from '@react-navigation/native';
import {RootNavigation, RootStackParamList} from './router';
import DiscoverTabs from './DiscoverTabs';
import HotTabs from './HotTabs';
import IconSearch from '@/assets/iconfont/IconSearch';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

//定义底部导航器中各个页面，以及进入每个页面的参数类型
type BottomParamList = {
  Daily: undefined;
  Discover: undefined;
  Hot: undefined;
  Mine: undefined;
};

//定义底部路由属性
type Route = RouteProp<RootStackParamList, 'BottomTabs'>;

interface IProps {
  navigation: RootNavigation;
  route: Route;
}

//创建底部导航器
const Tab = createBottomTabNavigator<BottomParamList>();

//hook方式
//注意点：1.不能使用this 2.
function BottomTabs(props: IProps) {
  //组件渲染完后都会调用useEffect方法
  useEffect(() => {
    setOptionTitle();
  });

  const onPress = () => {
    const {navigation} = props;
    navigation.navigate('SearchPage');
  };

  const headerRight = () => {
    const {route} = props;
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Daily';
    if (routeName === 'Daily') {
      return (
        <TouchableWithoutFeedback style={styles.headerRight} onPress={onPress}>
          <IconSearch />
        </TouchableWithoutFeedback>
      );
    } else {
      return null;
    }
  };

  const setOptionTitle = () => {
    const {navigation, route} = props;
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Daily';
    if (routeName === 'Mine') {
      navigation.setOptions({
        headerShown: false,
      });
    } else {
      let title;
      switch (routeName) {
        case 'Daily':
          title = '日报';
          break;
        case 'Discover':
          title = '发现';
          break;
        case 'Hot':
          title = '热门';
          break;
      }
      navigation.setOptions({
        headerShown: true,
        headerTitle: title,
        headerRight: headerRight,
      });
    }
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#9a9a9a',
      }}>
      <Tab.Screen
        name="Daily"
        component={DailyPage}
        options={{
          tabBarLabel: '日报',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={styles.icon}
                source={focused ? ic_home_selected : ic_home_normal}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverTabs}
        options={{
          tabBarLabel: '发现',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={styles.icon}
                source={focused ? ic_discovery_selected : ic_discovery_normal}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Hot"
        component={HotTabs}
        options={{
          tabBarLabel: '热门',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={styles.icon}
                source={focused ? ic_hot_selected : ic_hot_normal}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Mine"
        component={MinePage}
        options={{
          tabBarLabel: '我的',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={styles.icon}
                source={focused ? ic_mine_selected : ic_mine_normal}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  headerRight: {
    paddingRight: 15,
  },
});

export default BottomTabs;
