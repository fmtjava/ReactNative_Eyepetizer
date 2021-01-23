import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/model/dva/Models';
import {FlatList, RefreshControl, ListRenderItemInfo} from 'react-native';
import {Item} from '@/model/Daily';
import ImageTextItem from '@/components/ImageTextItem';
import {RouteProp} from '@react-navigation/native';
import {HotTabParamList} from '@/navigator/HotTabs';
import {navigate} from '@/utils/Utils';

const mapStateToProps = (
  state: RootState,
  {route}: {route: RouteProp<HotTabParamList, string>},
) => {
  const {namespace, apiUrl} = route.params;
  const modelState = state[namespace];
  return {
    namespace,
    apiUrl,
    refreshing: modelState.refreshing,
    dataList: modelState.dataList,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class HotTabPage extends React.Component<ModelState> {
  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    const {dispatch, namespace, apiUrl} = this.props;
    dispatch({
      type: namespace + '/onRefresh',
      payload: {
        apiUrl: apiUrl,
      },
    });
  };

  keyExtractor = (item: Item) => {
    return `${item.data.id}`;
  };
  onPress = (item: Item) => {
    navigate('VideoDetail', {item: item});
  };
  renderItem = ({item}: ListRenderItemInfo<Item>) => {
    return <ImageTextItem item={item} />;
  };
  render() {
    const {refreshing, dataList} = this.props;
    return (
      <FlatList
        data={dataList}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      />
    );
  }
}

export default connector(HotTabPage);
