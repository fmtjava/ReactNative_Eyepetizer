import TopicDetailItem from '@/components/TopicDetailItem';
import {RootState} from '@/model/dva/Models';
import {RootNavigation, RootStackParamList} from '@/navigator/Router';
import {ScreenWidth} from '@/utils/Utils';
import {RouteProp} from '@react-navigation/native';
import {connect, ConnectedProps} from 'react-redux';
import React from 'react';
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

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootNavigation;
  route: RouteProp<RootStackParamList, 'TopicDetail'>;
}

class TopicDetailPage extends React.Component<IProps> {
  componentDidMount() {
    this.onRefresh();
  }

  componentDidUpdate() {
    const {navigation, topDetail} = this.props;
    if (topDetail != null) {
      navigation.setOptions({
        title: topDetail.brief,
      });
    }
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: CLEAR_TYPE,
      payload: {
        topDetail: null,
        refreshing: true,
      },
    });
  }

  onRefresh = () => {
    const {dispatch, route} = this.props;
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: route.params.id,
      },
    });
  };

  get renderHeader() {
    const {topDetail} = this.props;
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
  }

  keyExtractor = (item: ITopicDetailItem) => {
    return `${item.data.content.data.id}`;
  };

  renderItem = ({item}: {item: ITopicDetailItem}) => {
    return <TopicDetailItem item={item} />;
  };

  render() {
    const {topDetail, refreshing} = this.props;
    return (
      <FlatList
        style={styles.container}
        data={topDetail?.itemList}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ListHeaderComponent={this.renderHeader}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      />
    );
  }
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

export default connector(TopicDetailPage);
