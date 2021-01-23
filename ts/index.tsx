import React from 'react';
import {Provider} from 'react-redux';
import {RootSiblingParent} from 'react-native-root-siblings';
import {StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';
import store from '@/config/dva';
import Router from '@/navigator/Router';
import '@/config/http';
import SplashScreen from 'react-native-splash-screen';

enableScreens();

export default class extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <RootSiblingParent>
          <Router />
        </RootSiblingParent>
      </Provider>
    );
  }
}
