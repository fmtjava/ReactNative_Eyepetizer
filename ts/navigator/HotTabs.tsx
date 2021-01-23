import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Platform, StyleSheet} from 'react-native';
import HotTabPage from '@/page/hot/HotTabPage';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/model/dva/Models';
import {ITab} from '@/model/Tab';
import {createHotTabModel} from '@/config/dva';
import Spinner from 'react-native-loading-spinner-overlay';

const TAB_LIST_TYPE = 'hot/getTabList';

export type HotTabParamList = {
  //定义动态创建页面的类型参数
  [key: string]: {
    namespace: string;
    apiUrl: string;
  };
};

const mapStateToProps = ({hot}: RootState) => {
  return {
    showLoading: hot.showLoading,
    tabList: hot.tabList,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

const Tab = createMaterialTopTabNavigator<HotTabParamList>();

class HotTabs extends React.Component<ModelState> {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: TAB_LIST_TYPE,
    });
  }
  renderScreen = (tab: ITab) => {
    //动态创建每个Tab页面对于的Model对象
    createHotTabModel(tab.name);
    return (
      <Tab.Screen
        key={tab.id}
        name={tab.name}
        options={{title: tab.name}}
        component={HotTabPage}
        initialParams={{
          namespace: tab.name,
          apiUrl: tab.apiUrl,
        }}
      />
    );
  };
  render() {
    const {showLoading, tabList} = this.props;
    if (showLoading) {
      return (
        <Spinner
          visible={showLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      );
    }
    if (tabList.length === 0) {
      return null;
    }
    return (
      <Tab.Navigator
        lazy
        sceneContainerStyle={styles.sceneContainerStyle}
        tabBarOptions={{
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
          indicatorStyle: {
            width: 50,
            height: 2.4,
            marginLeft: 45,
            backgroundColor: '#000000',
          },
          activeTintColor: '#000000',
          inactiveTintColor: '#9a9a9a',
        }}>
        {tabList.map(this.renderScreen)}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  sceneContainerStyle: {
    backgroundColor: '#fff',
  },
});

export default connector(HotTabs);
