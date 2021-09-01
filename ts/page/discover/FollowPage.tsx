import React, {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import RefreshListView from 'react-native-refresh-list-view';
import {RootState} from '@/model/dva/Models';
import {IFollowModel} from '@/model/Follow';
import FollowItem from '@/components/FollowItem';

const REFRESH_TYPE = 'follow/onRefresh';
const LOAD_MORE_TYPE = 'follow/onLoadMore';

const mapStateToProps = ({follow}: RootState) => {
  return {
    dataList: follow.dataList,
    refreshState: follow.refreshState,
    nextPageUrl: follow.nextPageUrl,
  };
};

function FollowPage() {
  const {dataList, refreshState, nextPageUrl} = useSelector(
    mapStateToProps,
    shallowEqual,
  );
  const dispatch = useDispatch();

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
    dispatch({
      type: LOAD_MORE_TYPE,
      payload: {
        nextPageUrl: nextPageUrl,
      },
    });
  };
  const keyExtractor = (item: IFollowModel) => {
    return `${item.data.header.icon}`;
  };

  const renderItem = ({item}: {item: IFollowModel}) => {
    return <FollowItem model={item} />;
  };

  return (
    <RefreshListView
      data={dataList}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshState={refreshState}
      onHeaderRefresh={onHeaderRefresh}
      onFooterRefresh={onFooterRefresh}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default FollowPage;
