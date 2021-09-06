import React, {useEffect} from 'react';
import RefreshListView from 'react-native-refresh-list-view';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
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

function TopicPage() {
  const dispatch = useDispatch();
  const {dataList, refreshState, nextPageUrl} = useSelector(
    mapStateToProps,
    shallowEqual,
  );

  useEffect(() => {
    dispatch({
      type: REFRESH_TYPE,
    });
  }, [dispatch]);

  const onHeaderRefresh = () => {
    dispatch({
      type: REFRESH_TYPE,
    });
  };
  const onFooterRefresh = () => {
    dispatch({
      type: LOAD_MORE_TYPE,
      payload: {
        nextPageUrl: nextPageUrl,
      },
    });
  };
  const keyExtractor = (item: ITopicList) => {
    return item.data.image;
  };

  const onPress = (item: ITopicList) => {
    navigate('TopicDetail', {id: item.data.id});
  };

  const renderItem = ({item}: {item: ITopicList}) => {
    return (
      <TouchableWithoutFeedback onPress={() => onPress(item)}>
        <FastImage source={{uri: item.data.image}} style={styles.image} />
        <View style={styles.line} />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <RefreshListView
      data={dataList}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshState={refreshState}
      onHeaderRefresh={onHeaderRefresh}
      onFooterRefresh={onFooterRefresh}
      showsVerticalScrollIndicator={false}
    />
  );
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

export default TopicPage;
