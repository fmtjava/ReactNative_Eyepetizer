import React, {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import {RootState} from '@/model/dva/Models';
import {ListRenderItemInfo, StyleSheet} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootNavigation, RootStackParamList} from '@/navigator/Router';
import {Item} from '@/model/Daily';
import ImageTextItem from '@/components/ImageTextItem';
import {goBack, ScreenWidth} from '@/utils/Utils';
import IconBack from '@/assets/iconfont/IconBack';
import AnimatedHeader from '@/components/common/animate/AnimatedHeader';

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

  const backIcon = () => {
    return <IconBack style={styles.backIcon} onPress={() => goBack()} />;
  };

  const keyExtractor = (item: Item) => {
    return `${item.data.id}`;
  };
  return (
    <AnimatedHeader
      style={styles.container}
      title={props.route.params.item.name}
      renderLeft={backIcon}
      headerMaxHeight={200}
      imageSource={{
        uri: props.route.params.item.headerImage,
      }}
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
  backIcon: {marginLeft: 20},
  headImage: {
    width: ScreenWidth,
    height: 200,
  },
});

export default CategoryDetailPage;
