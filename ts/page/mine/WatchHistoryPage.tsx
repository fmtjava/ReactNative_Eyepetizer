import VideoRelateItem from '@/components/VideoRelateItem';
import WatchHistoryDao from '@/dao/WatchHistoryDao';
import {Item} from '@/model/Daily';
import {navigate} from '@/utils/Utils';
import React, {Component} from 'react';
import {
  SwipeableFlatList,
  SwipeableQuickActionButton,
  SwipeableQuickActions,
} from 'react-native-swipe-list';
import {
  DeviceEventEmitter,
  EmitterSubscription,
  LayoutAnimation,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {EVENT_TYPE} from '@/event/Index';

class WatchHistoryPage extends Component {
  subscription?: EmitterSubscription;
  state = {
    dataList: [],
  };

  componentDidMount() {
    this.loadData();
    this.subscription = DeviceEventEmitter.addListener(
      EVENT_TYPE.WATCH_VIDEO_TYPE,
      () => {
        this.loadData();
      },
    );
  }

  async loadData() {
    try {
      const list = await WatchHistoryDao.getWatchHistoryList();
      this.setState({
        dataList: list,
      });
    } catch (e) {
      console.log(e);
    }
  }

  onPress = (item: Item) => {
    navigate('VideoDetail', {item: item});
  };

  renderItem = ({item}: ListRenderItemInfo<Item>) => {
    return (
      <TouchableOpacity onPress={() => this.onPress(item)}>
        <VideoRelateItem item={item} fromWatch={true} />
      </TouchableOpacity>
    );
  };

  keyExtractor = (item: Item) => {
    return item.data.title ? item.data.title : item.data.text;
  };

  removeItem = (item: Item) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    WatchHistoryDao.updateWatchHistory(item, false, () => {
      this.loadData();
    });
  };

  render() {
    return (
      <SwipeableFlatList
        style={styles.container}
        data={this.state.dataList}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
        renderRightActions={({item}) => (
          <SwipeableQuickActions>
            <SwipeableQuickActionButton
              style={styles.deleteContainer}
              onPress={() => this.removeItem(item)}
              text="Delete"
              textStyle={styles.deleteText}
            />
          </SwipeableQuickActions>
        )}
      />
    );
  }

  componentWillUnmount() {
    this.subscription?.remove();
  }
}

export default WatchHistoryPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  deleteContainer: {
    backgroundColor: 'red',
    width: 80,
    height: 80,
    alignItems: 'center',
  },
  deleteText: {
    fontWeight: 'bold',
    color: 'white',
    textAlignVertical: 'center',
  },
});
