import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/model/dva/Models';
import {ICategory} from '@/model/Category';
import {FlatList, Text, View, StyleSheet, RefreshControl} from 'react-native';
import FastImage from 'react-native-fast-image';

const REFRESH_TYPE = 'category/onRefresh';

const mapStateToProps = ({category}: RootState) => {
  return {
    refreshing: category.refreshing,
    categoryList: category.categoryList,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

class CategoryPage extends React.Component<ModelState> {
  componentDidMount() {
    this.onRefresh();
  }

  onRefresh = () => {
    const {dispatch} = this.props;
    dispatch({
      type: REFRESH_TYPE,
    });
  };

  keyExtractor = (item: ICategory) => {
    return item.name;
  };

  renderItem = ({item, index}: {item: ICategory; index: number}) => {
    return (
      <View style={styles.item}>
        <FastImage
          source={{uri: item.bgPicture}}
          style={index % 2 === 0 ? styles.leftImage : styles.rightImage}
        />
        <View style={styles.category}>
          <Text style={styles.text}>#{item.name}</Text>
        </View>
      </View>
    );
  };
  render() {
    const {refreshing, categoryList} = this.props;
    return (
      <FlatList
        style={styles.container}
        data={categoryList}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  item: {
    width: '50%',
    marginBottom: 5,
    height: 200,
  },
  leftImage: {
    marginLeft: 5,
    marginRight: 5,
    height: 200,
    borderRadius: 4,
  },
  rightImage: {
    marginRight: 5,
    height: 200,
    borderRadius: 4,
  },
  category: {
    position: 'absolute',
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default connector(CategoryPage);
