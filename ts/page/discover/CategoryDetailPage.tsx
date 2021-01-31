import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
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

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootNavigation;
  route: RouteProp<RootStackParamList, 'CategoryDetail'>;
}

class CategoryDetailPage extends React.Component<IProps> {
  componentDidMount() {
    const {navigation, route} = this.props;
    navigation.setOptions({title: route.params.item.name});
    this.onHeaderRefresh();
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: CLEAR_TYPE,
      payload: {
        dataList: [],
        refreshState: RefreshState.Idle,
        nextPageUrl: null,
      },
    });
  }

  onHeaderRefresh = () => {
    const {dispatch, route} = this.props;
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        id: route.params.item.id,
      },
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

  renderItem = ({item}: ListRenderItemInfo<Item>) => {
    return <ImageTextItem item={item} />;
  };

  keyExtractor = (item: Item) => {
    return `${item.data.id}`;
  };

  render() {
    const {dataList, refreshState} = this.props;
    return (
      <View style={styles.container}>
        <RefreshListView
          data={dataList}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
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

export default connector(CategoryDetailPage);
