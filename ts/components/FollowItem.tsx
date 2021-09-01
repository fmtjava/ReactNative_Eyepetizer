import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Item} from '@/model/Daily';
import {IFollowModel} from '@/model/Follow';
import FollowHorizontalItem from './FollowHorizontalItem';
import {navigate} from '@/utils/Utils';

interface IProps {
  model: IFollowModel;
}

function FollowItem(props: IProps) {
  const onPress = (item: Item) => {
    navigate('VideoDetail', {item: item});
  };
  const renderItem = ({item}: {item: Item}) => {
    return (
      <TouchableWithoutFeedback onPress={() => onPress(item)}>
        <FollowHorizontalItem item={item} />
      </TouchableWithoutFeedback>
    );
  };

  const keyExtractor = (item: Item) => {
    return `${item.data.playUrl}`;
  };

  const {model} = props;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FastImage
          style={styles.headerImage}
          source={{uri: model.data.header.icon}}
        />
        <View style={styles.headerDes}>
          <Text style={styles.title}>{model.data.header.title}</Text>
          <Text numberOfLines={1} style={styles.desc}>
            {model.data.header.description}
          </Text>
        </View>
        <View style={styles.follow}>
          <Text style={styles.followText}>+ 关注</Text>
        </View>
      </View>
      <FlatList
        style={styles.horizontalList}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={model.data.itemList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    marginStart: 15,
    alignContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerDes: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: '#000',
    fontSize: 14,
  },
  desc: {
    color: '#00000042',
    fontSize: 12,
    marginTop: 3,
  },
  follow: {
    backgroundColor: '#f4f4f4',
    borderRadius: 4,
    marginRight: 15,
  },
  followText: {
    padding: 5,
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 12,
  },
  horizontalList: {
    paddingLeft: 15,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#0000001F',
    marginTop: 10,
    marginBottom: 5,
  },
});

export default FollowItem;
