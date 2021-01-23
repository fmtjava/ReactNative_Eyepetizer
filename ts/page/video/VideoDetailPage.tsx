import IconComment from '@/assets/iconfont/IconComment';
import IconIShare from '@/assets/iconfont/IconIShare';
import IconLove from '@/assets/iconfont/IconLove';
import {RootState} from '@/model/dva/Models';
import {RootStackParamList} from '@/navigator/Router';
import {connect, ConnectedProps} from 'react-redux';
import {
  formatDateMsByYMDHM,
  navigate,
  ScreenHeight,
  ScreenWidth,
} from '@/utils/Utils';
import {RouteProp} from '@react-navigation/native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ListRenderItemInfo,
  ImageBackground,
} from 'react-native';
import {Item} from '@/model/Daily';
import VideoRelateItem from '@/components/VideoRelateItem';
import Video from '@/components/video';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const VIDEO_SMALL_CARD_TYPE = 'videoSmallCard';
const REFRESH_TYPE = 'video/getRelateVideoList';

const mapStateToProps = ({video}: RootState) => {
  return {
    refreshing: video.refreshing,
    relateVideoList: video.relateVideoList,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  route: RouteProp<RootStackParamList, 'VideoDetail'>;
}

class VideoDetailPage extends React.Component<IProps> {
  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    const {route, dispatch} = this.props;
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: route.params.item.data.id,
      },
    });
  };

  onPress = (item: Item) => {
    navigate('VideoDetail', {item: item});
  };

  renderItem = ({item}: ListRenderItemInfo<Item>) => {
    return item.type !== VIDEO_SMALL_CARD_TYPE ? (
      <Text style={styles.relateTitle}>{item.data.text}</Text>
    ) : (
      <TouchableWithoutFeedback onPress={() => this.onPress(item)}>
        <VideoRelateItem item={item} />
      </TouchableWithoutFeedback>
    );
  };

  keyExtractor = (item: Item) => {
    return item.data.title ? item.data.title : item.data.text;
  };

  get renderHeader() {
    const {route} = this.props;
    const item = route.params.item;
    return (
      <View>
        <Text style={styles.title}>{item.data.title}</Text>
        <Text style={styles.category}>
          #{item.data.category} /{' '}
          {formatDateMsByYMDHM(item.data.author.latestReleaseTime)}
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
  }

  render() {
    const {route, refreshing, relateVideoList} = this.props;
    const {item} = route.params;
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
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </ImageBackground>
    );
  }
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

export default connector(VideoDetailPage);
