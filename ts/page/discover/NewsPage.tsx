import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect, ConnectedProps} from 'react-redux';
import RefreshListView from 'react-native-refresh-list-view';
import {RootState} from '@/model/dva/Models';
import {INewsModel} from '@/model/News';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {navigate} from '@/utils/Utils';

const TEXT_CARD = 'textCard';
const REFRESH_TYPE = 'news/onRefresh';
const LOAD_MORE_TYPE = 'news/onLoadMore';

const mapStateToProps = ({news}: RootState) => {
  return {
    dataList: news.dataList,
    refreshState: news.refreshState,
    nextPageUrl: news.nextPageUrl,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class NewsPage extends React.Component<ModelState> {
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
  keyExtractor = (item: INewsModel, index: number) => {
    if (item.type === TEXT_CARD) {
      return `${item.data.text}_${TEXT_CARD}_${index}`;
    } else {
      return `${item.data.backgroundImage}_${item.data.id}`;
    }
  };

  renderNews = (value: string) => {
    return (
      <Text key={value} style={styles.content}>
        {value}
      </Text>
    );
  };

  onPress = (item: INewsModel) => {
    let url = decodeURIComponent(
      item.data.actionUrl.substring(item.data.actionUrl.indexOf('url')),
    );
    url = url.substring(4);
    navigate('NewsDetail', {url: url});
  };

  renderItem = ({item}: {item: INewsModel}) => {
    if (item.type === TEXT_CARD) {
      return <Text style={styles.title}>{item.data.text}</Text>;
    } else {
      return (
        <TouchableWithoutFeedback onPress={() => this.onPress(item)}>
          <View style={styles.card}>
            <FastImage
              source={{uri: item.data.backgroundImage}}
              style={styles.image}
            />
            {item.data.titleList.map((value) => this.renderNews(value))}
          </View>
        </TouchableWithoutFeedback>
      );
    }
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
  card: {
    backgroundColor: '#EDEDED',
    margin: 10,
    paddingBottom: 10,
    borderRadius: 4,
    elevation: 1.5,
    shadowRadius: 1.5,
    shadowOpacity: 1,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#999',
  },

  title: {
    marginTop: 5,
    marginLeft: 10,
    color: '#000000DD',
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 5,
  },
  content: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 12,
    color: '#333',
  },
});

export default connector(NewsPage);
