import React from 'react';
import RefreshListView from 'react-native-refresh-list-view';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, ConnectedProps} from 'react-redux';
import {FeedHeight, FeedWidth, navigate} from '@/utils/Utils';
import {RootState} from '@/model/dva/Models';
import {ITopicList} from '@/model/TopicList';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const REFRESH_TYPE = 'topicList/onRefresh';
const LOAD_MORE_TYPE = 'topicList/onLoadMore';

const mapStateToProps = ({topicList}: RootState) => {
  return {
    dataList: topicList.dataList,
    refreshState: topicList.refreshState,
    nextPageUrl: topicList.nextPageUrl,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class TopicPage extends React.Component<ModelState> {
  componentDidMount() {
    this.onHeaderRefresh();
  }
  onHeaderRefresh = () => {
    const {dispatch} = this.props;
    dispatch({
      type: REFRESH_TYPE,
    });
  };
  onFooterRefresh = () => {
    const {dispatch, nextPageUrl} = this.props;
    dispatch({
      type: LOAD_MORE_TYPE,
      payload: {
        nextPageUrl: nextPageUrl,
      },
    });
  };
  keyExtractor = (item: ITopicList) => {
    return item.data.image;
  };

  onPress = (item: ITopicList) => {
    navigate('TopicDetail', {id: item.data.id});
  };

  renderItem = ({item}: {item: ITopicList}) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.onPress(item)}>
        <FastImage source={{uri: item.data.image}} style={styles.image} />
        <View style={styles.line} />
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {dataList, refreshState} = this.props;
    return (
      <RefreshListView
        data={dataList}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        refreshState={refreshState}
        onHeaderRefresh={this.onHeaderRefresh}
        onFooterRefresh={this.onFooterRefresh}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: FeedWidth,
    height: FeedHeight,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 5,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#0000001F',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
});

export default connector(TopicPage);
