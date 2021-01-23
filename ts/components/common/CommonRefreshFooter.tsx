import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RefreshState} from 'react-native-refresh-list-view';

interface IProps {
  refreshState: number;
  refresh: Function;
  retry: Function;
}

class CommonRefreshFooter extends React.Component<IProps> {
  render() {
    const {refreshState, refresh, retry} = this.props;
    switch (refreshState) {
      case RefreshState.Idle:
        return <View style={styles.footerContainer} />;
      case RefreshState.Failure: {
        return (
          <TouchableOpacity onPress={() => retry()}>
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>点击重新加载</Text>
            </View>
          </TouchableOpacity>
        );
      }
      case RefreshState.EmptyData: {
        return (
          <TouchableOpacity onPress={() => refresh()}>
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>暂时没有相关数据</Text>
            </View>
          </TouchableOpacity>
        );
      }
      case RefreshState.FooterRefreshing: {
        return (
          <ActivityIndicator
            style={styles.footerContainer}
            size="large"
            color="#888888"
          />
        );
      }
      case RefreshState.NoMoreData: {
        return (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>已加载全部数据</Text>
          </View>
        );
      }
    }
    return null;
  }
}

export default CommonRefreshFooter;

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: '#555555',
  },
});
