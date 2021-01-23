import React from 'react';
import {RootState} from '@/model/dva/Models';
import {connect, ConnectedProps} from 'react-redux';
import MasonryList from 'react-native-masonry-list';
import {Image, RefreshControl, StyleSheet, Text, View} from 'react-native';
import IconDianzan from '@/assets/iconfont/IconDianzan';
import IconFont from '@/assets/iconfont';
import {IMasonry} from '@/model/Masonry';
import {RefreshState} from 'react-native-refresh-list-view';
import CommonRefreshFooter from '@/components/common/CommonRefreshFooter';
import FastImage from 'react-native-fast-image';
import {navigate} from '@/utils/Utils';

const REFRESH_TYPE = 'recommend/onRefresh';
const LOAD_MORE_TYPE = 'recommend/onLoadMore';
const VIDEO_TYPE = 'video';

const mapStateToProps = ({recommend}: RootState) => {
  return {
    refreshState: recommend.refreshState,
    nextPageUrl: recommend.nextPageUrl,
    images: recommend.images,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class RecommendPage extends React.Component<ModelState> {
  componentDidMount() {
    console.disableYellowBox = true;
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

  onEndReached = () => {
    const {refreshState} = this.props;
    //避免多次加载出现重复数据
    if (refreshState !== RefreshState.Idle) {
      return;
    }
    this.onFooterRefresh();
  };

  icon(data: IMasonry) {
    if (data.type === VIDEO_TYPE) {
      return <IconFont style={styles.icon} color="#fff" name="icon-Video" />;
    } else {
      if (data.urls !== undefined && data.urls !== null) {
        if (data.urls.length > 1) {
          return (
            <IconFont
              style={styles.icon}
              color="#fff"
              name="icon-photo-library"
            />
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }

  onPressImage = (item: IMasonry) => {
    if (item.type === VIDEO_TYPE) {
      navigate('RecommendVideo', {masonry: item});
    } else {
      const images = item.urls.map((value) => {
        return {
          url: value,
        };
      });
      navigate('Gallery', {images: images});
    }
  };

  renderIndividualHeader = (data: IMasonry) => {
    return (
      <View
        style={[
          {
            width: data.masonryDimensions.width,
            margin: data.masonryDimensions.gutter / 2,
          },
          styles.masonryHeader,
        ]}>
        {this.icon(data)}
      </View>
    );
  };

  renderIndividualFooter = (data: IMasonry) => {
    return (
      <View
        style={[
          {
            width: data.masonryDimensions.width,
            marginHorizontal: data.masonryDimensions.gutter / 2,
          },
          styles.bottomContainer,
        ]}>
        <Text numberOfLines={2} style={styles.description}>
          {data.description}
        </Text>
        <View style={styles.bottom}>
          <View style={styles.owner}>
            <Image source={{uri: data.avatar}} style={styles.avatar} />
            <Text numberOfLines={1} style={styles.nickname}>
              {data.nickname}
            </Text>
          </View>
          <View style={styles.owner}>
            <IconDianzan size={14} color={'grey'} />
            <Text style={styles.like}>{data.collectionCount}</Text>
          </View>
        </View>
      </View>
    );
  };

  retry = () => {
    const {images} = this.props;
    if (images.length === 0) {
      this.onHeaderRefresh();
    } else {
      this.onFooterRefresh();
    }
  };

  render() {
    const {refreshState, images} = this.props;
    return (
      <MasonryList
        images={images}
        onPressImage={this.onPressImage}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.1}
        imageContainerStyle={styles.imageContainerStyle}
        renderIndividualHeader={this.renderIndividualHeader}
        renderIndividualFooter={this.renderIndividualFooter}
        spacing={2}
        refreshing={true}
        backgroundColor={'#F5F5F5'}
        listContainerStyle={styles.listContainerStyle}
        customImageComponent={FastImage}
        masonryFlatListColProps={{
          ListFooterComponent: (
            <CommonRefreshFooter
              refreshState={refreshState}
              refresh={this.onHeaderRefresh}
              retry={this.retry}
            />
          ),
          showsVerticalScrollIndicator: false,
          refreshControl: (
            <RefreshControl
              refreshing={refreshState === RefreshState.HeaderRefreshing}
              onRefresh={this.onHeaderRefresh}
            />
          ),
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  listContainerStyle: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  imageContainerStyle: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  bottomContainer: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#fff',
    marginTop: -5,
    marginBottom: 8,
    paddingBottom: 8,
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  description: {
    color: '#000000DD',
    fontSize: 14,
    marginHorizontal: 6,
    marginVertical: 10,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 6,
  },
  owner: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  nickname: {
    marginLeft: 5,
    width: 80,
    fontSize: 12,
  },
  like: {
    marginLeft: 3,
    fontSize: 12,
  },
  masonryHeader: {
    position: 'absolute',
    zIndex: 10,
  },
});

export default connector(RecommendPage);
