import TopicDetailItem from '@/components/TopicDetailItem';
import {RootState} from '@/model/dva/Models';
import {RootNavigation, RootStackParamList} from '@/navigator/Router';
import {ScreenWidth} from '@/utils/Utils';
import {RouteProp} from '@react-navigation/native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {StyleSheet, FlatList, Text, View, RefreshControl} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ITopicDetailItem} from '@/model/TopicDetail';

const CLEAR_TYPE = 'topicDetail/setState';
const REFRESH_TYPE = 'topicDetail/onRefresh';

const mapStateToProps = ({topicDetail}: RootState) => {
  return {
    refreshing: topicDetail.refreshing,
    topDetail: topicDetail.topDetail,
  };
};

interface IProps {
  navigation: RootNavigation;
  route: RouteProp<RootStackParamList, 'TopicDetail'>;
}

function TopicDetailPage(props: IProps) {
  const dispatch = useDispatch();
  const {refreshing, topDetail} = useSelector(mapStateToProps, shallowEqual);

  useEffect(() => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: props.route.params.id,
      },
    });
  }, [dispatch, props.route.params.id]);

  useEffect(() => {
    if (topDetail != null) {
      props.navigation.setOptions({
        title: topDetail.brief,
      });
    }
  }, [topDetail, props.navigation]);

  useEffect(() => {
    //页面退出时，清理数据
    return () => {
      dispatch({
        type: CLEAR_TYPE,
        payload: {
          topDetail: null,
          refreshing: true,
        },
      });
    };
  }, [dispatch]);

  const onRefresh = () => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: props.route.params.id,
      },
    });
  };

  const renderHeader = () => {
    if (topDetail == null) {
      return null;
    }
    return (
      <View>
        <FastImage
          style={styles.headerImage}
          source={{
            uri: topDetail.headerImage,
          }}
        />
        <View style={styles.briefContainer}>
          <Text style={styles.brief}>{topDetail.brief}</Text>
        </View>
        <Text style={styles.desText}>{topDetail.text}</Text>
      </View>
    );
  };

  const keyExtractor = (item: ITopicDetailItem) => {
    return `${item.data.content.data.id}`;
  };

  const renderItem = ({item}: {item: ITopicDetailItem}) => {
    return <TopicDetailItem item={item} />;
  };

  return (
    <FlatList
      style={styles.container}
      data={topDetail?.itemList}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: ScreenWidth,
    height: 250,
  },
  briefContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 4,
    borderColor: '#eee',
    borderWidth: StyleSheet.hairlineWidth,
    left: 20,
    top: 230,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brief: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  desText: {
    fontSize: 12,
    color: '#9a9a9a',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
});

export default TopicDetailPage;
