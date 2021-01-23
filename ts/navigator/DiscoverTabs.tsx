import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FollowPage from '@/page/discover/FollowPage';
import CategoryPage from '@/page/discover/CategoryPage';
import TopicPage from '@/page/discover/TopicPage';
import NewsPage from '@/page/discover/NewsPage';
import RecommendPage from '@/page/discover/RecommendPage';
import {Platform, StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

class DiscoverTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        lazy
        sceneContainerStyle={styles.sceneContainerStyle}
        tabBarOptions={{
          scrollEnabled: true,
          style: {
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
          tabStyle: {
            width: 80,
            padding: 0,
          },
          indicatorStyle: {
            width: 30,
            height: 2.4,
            marginLeft: 25,
            backgroundColor: '#000000',
          },
          activeTintColor: '#000000',
          inactiveTintColor: '#9a9a9a',
        }}>
        <Tab.Screen
          name="Follow"
          options={{title: '关注'}}
          component={FollowPage}
        />
        <Tab.Screen
          name="Category"
          options={{title: '分类'}}
          component={CategoryPage}
        />
        <Tab.Screen
          name="Topic"
          options={{title: '专题'}}
          component={TopicPage}
        />
        <Tab.Screen
          name="News"
          options={{title: '资讯'}}
          component={NewsPage}
        />
        <Tab.Screen
          name="Recommend"
          options={{title: '推荐'}}
          component={RecommendPage}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: '#fff',
  },
});

export default DiscoverTabs;
