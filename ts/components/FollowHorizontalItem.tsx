import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Item} from '@/model/Daily';
import {formatDateMsByYMDHM} from '@/utils/Utils';

interface IProps {
  item: Item;
}

function FollowHorizontalItem(props: IProps) {
  const {item} = props;
  return (
    <View style={styles.container}>
      <View>
        <FastImage style={styles.image} source={{uri: item.data.cover.feed}} />
        <View style={styles.category}>
          <Text style={styles.categoryText}>{item.data.category}</Text>
        </View>
      </View>
      <Text numberOfLines={1} style={styles.title}>
        {item.data.title}
      </Text>
      <Text style={styles.releaseTime}>
        {formatDateMsByYMDHM(item.data.releaseTime)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  image: {
    width: 300,
    height: 180,
    borderRadius: 4,
  },
  category: {
    position: 'absolute',
    top: 8,
    right: 16,
    borderRadius: 4,
    padding: 6,
    backgroundColor: '#FFFFFF8A',
  },
  categoryText: {
    fontSize: 13,
    color: '#000',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    margin: 3,
    width: 300,
  },
  releaseTime: {
    fontSize: 12,
    color: '#00000042',
    marginStart: 3,
  },
});

export default FollowHorizontalItem;
