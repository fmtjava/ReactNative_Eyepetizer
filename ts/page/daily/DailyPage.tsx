import React from 'react';
import {StyleSheet, View, ListRenderItemInfo} from 'react-native';
import RefreshListView from 'react-native-refresh-list-view';
import ImageTextItem from '@/components/ImageTextItem';
import {RootState} from '@/model/dva/Models';
import {Item} from '@/model/Daily';
import BannerCarousel from '@/components/ BannerCarousel';
import TitleItem from '@/components/TitleItem';
import {connect, ConnectedProps} from 'react-redux';

const TEXT_HEADER_TYPE = 'textHeader';
const REFRESH_TYPE = 'daily/onRefresh';
const LOAD_MORE_TYPE = 'daily/onLoadMore';

const mapStateToProps = ({daily}: RootState) => {
  return {
    bannerList: daily.bannerList,
    dataList: daily.dataList,
    refreshState: daily.refreshState,
    nextPageUrl: daily.nextPageUrl,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class DailyPage extends React.Component<ModelState> {
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
    const {nextPageUrl} = this.props;
    if (nextPageUrl == null) {
      return;
    }
    const {dispatch} = this.props;
    dispatch({
      type: LOAD_MORE_TYPE,
      payload: {
        nextPageUrl: nextPageUrl,
      },
    });
  };

  renderHeader = () => {
    const {bannerList} = this.props;
    return <BannerCarousel bannerList={bannerList} />;
  };
  renderItem = ({item}: ListRenderItemInfo<Item>) => {
    return item.type === TEXT_HEADER_TYPE ? (
      <TitleItem item={item} />
    ) : (
      <ImageTextItem item={item} />
    );
  };

  keyExtractor = (item: Item) => {
    return item.data.title ? item.data.title : item.data.text;
  };

  render() {
    const {dataList, refreshState} = this.props;
    return (
      <View style={styles.container}>
        <RefreshListView
          data={dataList}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={this.renderHeader}
          refreshState={refreshState}
          onHeaderRefresh={this.onHeaderRefresh}
          onFooterRefresh={this.onFooterRefresh}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default connector(DailyPage);
