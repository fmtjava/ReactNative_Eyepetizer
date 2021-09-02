import React, {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import {RootState} from '@/model/dva/Models';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootNavigation, RootStackParamList} from '@/navigator/Router';
import {Item} from '@/model/Daily';
import ImageTextItem from '@/components/ImageTextItem';

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

  const onHeaderRefresh = () => {
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: props.route.params.item.id,
      },
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

  const renderItem = ({item}: ListRenderItemInfo<Item>) => {
    return <ImageTextItem item={item} />;
  };

  const keyExtractor = (item: Item) => {
    return `${item.data.id}`;
  };

  return (
    <View style={styles.container}>
      <RefreshListView
        data={dataList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
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

export default CategoryDetailPage;
