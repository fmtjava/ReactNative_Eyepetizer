import React, {useEffect} from 'react';
import {StyleSheet, View, ListRenderItemInfo} from 'react-native';
import RefreshListView from 'react-native-refresh-list-view';
import ImageTextItem from '@/components/ImageTextItem';
import {RootState} from '@/model/dva/Models';
import {Item} from '@/model/Daily';
import BannerCarousel from '@/components/ BannerCarousel';
import TitleItem from '@/components/TitleItem';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

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

function DailyPage() {
  const dispatch = useDispatch();
  const {bannerList, dataList, refreshState, nextPageUrl} = useSelector(
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
    if (nextPageUrl == null) {
      return;
    }
    dispatch({
      type: LOAD_MORE_TYPE,
      payload: {
        nextPageUrl: nextPageUrl,
      },
    });
  };

  const renderHeader = () => {
    return <BannerCarousel bannerList={bannerList} />;
  };

  const renderItem = ({item}: ListRenderItemInfo<Item>) => {
    return item.type === TEXT_HEADER_TYPE ? (
      <TitleItem item={item} />
    ) : (
      <ImageTextItem item={item} />
    );
  };

  const keyExtractor = (item: Item) => {
    return item.data.title ? item.data.title : item.data.text;
  };

  return (
    <View style={styles.container}>
      <RefreshListView
        data={dataList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        refreshState={refreshState}
        onHeaderRefresh={onHeaderRefresh}
        onFooterRefresh={onFooterRefresh}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default DailyPage;
