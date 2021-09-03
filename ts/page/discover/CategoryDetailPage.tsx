import React, {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import AnimatedHeader from 'react-native-animated-header';
import {RootState} from '@/model/dva/Models';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootNavigation, RootStackParamList} from '@/navigator/Router';
import {Item} from '@/model/Daily';
import ImageTextItem from '@/components/ImageTextItem';
import FastImage from 'react-native-fast-image';
import {ScreenWidth} from '@/utils/Utils';

const CLEAR_TYPE = 'categoryDetail/setState';
const REFRESH_TYPE = 'categoryDetail/onRefresh';
const LOAD_MORE_TYPE = 'categoryDetail/onLoadMore';

const mapStateToProps = ({categoryDetail}: RootState) => {
  return {
    dataList: categoryDetail.dataList,
    refreshState: categoryDetail.refreshState,
    nextPageUrl: categoryDetail.nextPageUrl,
  };
};

interface IProps {
  navigation: RootNavigation;
  route: RouteProp<RootStackParamList, 'CategoryDetail'>;
}

function CategoryDetailPage(props: IProps) {
  const dispatch = useDispatch();
  const {dataList, refreshState, nextPageUrl} = useSelector(
    mapStateToProps,
    shallowEqual,
  );

  useEffect(() => {
    props.navigation.setOptions({title: props.route.params.item.name});
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: props.route.params.item.id,
      },
    });
  }, [
    props.navigation,
    dispatch,
    props.route.params.item.name,
    props.route.params.item.id,
  ]);

  useEffect(() => {
    return () => {
      dispatch({
        type: CLEAR_TYPE,
        payload: {
          dataList: [],
          refreshState: RefreshState.Idle,
          nextPageUrl: null,
        },
      });
    };
  }, [dispatch]);

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

  const renderItem = ({item}: ListRenderItemInfo<Item>) => {
    return <ImageTextItem item={item} />;
  };

  const keyExtractor = (item: Item) => {
    return `${item.data.id}`;
  };

  return (
    <AnimatedHeader
      style={styles.container}
      title="Happy coding"
      backStyle={{marginLeft: 10}}
      backTextStyle={{fontSize: 14, color: '#000'}}
      titleStyle={{fontSize: 22, left: 20, bottom: 20, color: '#000'}}
      headerMaxHeight={200}
      imageSource={() => (
        <FastImage
          style={styles.headImage}
          source={{
            uri:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F28%2F20180428114906_ulvqd.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633255088&t=5de32951b8196587f44772fc590a6456',
          }}
        />
      )}
      toolbarColor="#FFF"
      disabled={false}>
      <RefreshListView
        data={dataList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshState={refreshState}
        onFooterRefresh={onFooterRefresh}
        showsVerticalScrollIndicator={false}
      />
    </AnimatedHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headImage: {
    width: ScreenWidth,
    height: 200,
    borderRadius: 4,
  },
});

export default CategoryDetailPage;
