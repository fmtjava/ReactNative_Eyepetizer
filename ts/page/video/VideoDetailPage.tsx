import IconComment from '@/assets/iconfont/IconComment';
import IconIShare from '@/assets/iconfont/IconIShare';
import IconLove from '@/assets/iconfont/IconLove';
import {RootState} from '@/model/dva/Models';
import {RootStackParamList} from '@/navigator/Router';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  formatDateMsByYMDHM,
  navigate,
  ScreenHeight,
  ScreenWidth,
} from '@/utils/Utils';
import {RouteProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ListRenderItemInfo,
  ImageBackground,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {Item} from '@/model/Daily';
import VideoRelateItem from '@/components/VideoRelateItem';
import Video from '@/components/video';
import WatchHistoryDao from '@/dao/WatchHistoryDao';
import {EVENT_TYPE} from '@/event/Index';

const VIDEO_SMALL_CARD_TYPE = 'videoSmallCard';
const REFRESH_TYPE = 'video/getRelateVideoList';

const mapStateToProps = ({video}: RootState) => {
  return {
    refreshing: video.refreshing,
    relateVideoList: video.relateVideoList,
  };
};

interface IProps {
  route: RouteProp<RootStackParamList, 'VideoDetail'>;
}

function VideoDetailPage(props: IProps) {
  const {refreshing, relateVideoList} = useSelector(
    mapStateToProps,
    shallowEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    WatchHistoryDao.updateWatchHistory(props.route.params.item, true, () => {
      DeviceEventEmitter.emit(EVENT_TYPE.WATCH_VIDEO_TYPE, item);
    });
  });

  useEffect(() => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: props.route.params.item.data.id,
      },
    });
  }, [dispatch, props.route.params.item.data.id]);

  const onRefresh = () => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: props.route.params.item.data.id,
      },
    });
  };

  const onPress = (item: Item) => {
    navigate('VideoDetail', {item: item});
  };

  const renderItem = ({item}: ListRenderItemInfo<Item>) => {
    return item.type !== VIDEO_SMALL_CARD_TYPE ? (
      <Text style={styles.relateTitle}>{item.data.text}</Text>
    ) : (
      <TouchableOpacity onPress={() => onPress(item)}>
        <VideoRelateItem item={item} />
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: Item) => {
    return item.data.title ? item.data.title : item.data.text;
  };

  const renderHeader = () => {
    const item = props.route.params.item;
    return (
      <View>
        <Text style={styles.title}>{item.data.title}</Text>
        <Text style={styles.category}>
          #{item.data.category} / {formatDateMsByYMDHM(item.data.releaseTime)}
        </Text>
        <Text style={styles.description}>{item.data.description}</Text>
        <View style={styles.consumption}>
          <View style={styles.collect}>
            <IconLove size={22} color="#FFF" />
            <Text style={styles.collectionCount}>
              {item.data.consumption.collectionCount}
            </Text>
          </View>
          <View style={styles.share}>
            <IconIShare size={18} color="#FFF" />
            <Text style={styles.collectionCount}>
              {item.data.consumption.shareCount}
            </Text>
          </View>
          <View style={styles.share}>
            <IconComment size={20} color="#FFF" />
            <Text style={styles.collectionCount}>
              {item.data.consumption.replyCount}
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.authorContainer}>
          <FastImage
            style={styles.author}
            source={{uri: item.data.author.icon}}
          />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{item.data.author.name}</Text>
            <Text style={styles.authorDes}>{item.data.author.description}</Text>
          </View>
          <View style={styles.follow}>
            <Text style={styles.followTex}>+ 关注</Text>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
  };

  const {item} = props.route.params;
  const backgroundImagePath = `${item.data.cover.blurred}/${ScreenHeight}x${ScreenWidth}`;
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={{uri: backgroundImagePath}}>
      <Video
        url={item.data.playUrl}
        logo={undefined}
        hideFullScreenControl={false}
        autoPlay={true}
        rotateToFullScreen
        playInBackground={false}
        playWhenInactive={true}
        scrollBounce={true}
        lockPortraitOnFsExit={true}
        lockRatio={16 / 9}
      />
      <FlatList
        data={relateVideoList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  category: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 12,
    color: '#fff',
  },
  description: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    color: '#fff',
  },
  consumption: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  collect: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  collectionCount: {
    marginLeft: 3,
    fontSize: 13,
    color: '#fff',
  },
  share: {
    marginLeft: 30,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 0.5,
    backgroundColor: '#fff',
  },
  authorContainer: {
    padding: 10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  author: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    color: '#fff',
  },
  authorDes: {
    fontSize: 13,
    color: '#fff',
    marginTop: 3,
  },
  follow: {
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  followTex: {
    padding: 5,
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 12,
  },
  relateTitle: {
    padding: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VideoDetailPage;
