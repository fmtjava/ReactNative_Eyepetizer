import React, {useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/model/dva/Models';
import {ICategory} from '@/model/Category';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {navigate} from '@/utils/Utils';

const REFRESH_TYPE = 'category/onRefresh';

const mapStateToProps = ({category}: RootState) => {
  return {
    refreshing: category.refreshing,
    categoryList: category.categoryList,
  };
};

function CategoryPage() {
  const dispatch = useDispatch();
  const {refreshing, categoryList} = useSelector(mapStateToProps, shallowEqual);

  useEffect(() => {
    dispatch({
      type: REFRESH_TYPE,
    });
  }, [dispatch]);

  const onRefresh = () => {
    dispatch({
      type: REFRESH_TYPE,
    });
  };

  const keyExtractor = (item: ICategory) => {
    return item.name;
  };

  const go2CategoryDetail = (item: ICategory) => {
    navigate('CategoryDetail', {item: item});
  };

  const renderItem = ({item, index}: {item: ICategory; index: number}) => {
    return (
      <TouchableWithoutFeedback onPress={() => go2CategoryDetail(item)}>
        <View style={styles.item}>
          <FastImage
            source={{uri: item.bgPicture}}
            style={index % 2 === 0 ? styles.leftImage : styles.rightImage}
          />
          <View style={styles.category}>
            <Text style={styles.text}>#{item.name}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <FlatList
      style={styles.container}
      data={categoryList}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
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

export default CategoryPage;
