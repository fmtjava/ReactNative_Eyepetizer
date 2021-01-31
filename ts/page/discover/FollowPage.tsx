import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
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

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class FollowPage extends React.Component<ModelState> {
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
  keyExtractor = (item: IFollowModel) => {
    return `${item.data.header.icon}`;
  };

  renderItem = ({item}: {item: IFollowModel}) => {
    return <FollowItem model={item} />;
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

export default connector(FollowPage);
