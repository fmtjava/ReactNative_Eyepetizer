import {Item} from '@/model/Daily';
import {formatDateMsByMS} from '@/utils/Utils';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';

interface IProps {
  item: Item;
  fromWatch?: boolean | undefined;
}

function VideoRelateItem(props: IProps) {
  const {item, fromWatch = false} = props;
  return (
    <View style={styles.container}>
      <View style={styles.feedContainer}>
        <FastImage source={{uri: item.data.cover.feed}} style={styles.image} />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {formatDateMsByMS(item.data.duration * 1000)}
          </Text>
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={fromWatch ? styles.watchTitle : styles.title}>
          {item.data.title}
        </Text>
        <Text style={fromWatch ? styles.watchCategory : styles.category}>
          #{item.data.category} /{' '}
          {item.data.author == null ? '' : item.data.author.name}
        </Text>
      </View>
    </View>
  );
}

export default VideoRelateItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  feedContainer: {
    width: 135,
    height: 80,
  },
  image: {
    flex: 1,
    borderRadius: 4,
  },
  timeContainer: {
    position: 'absolute',
    borderRadius: 4,
    right: 5,
    bottom: 5,
    backgroundColor: '#0000008A',
  },
  timeText: {
    padding: 3,
    fontWeight: 'bold',
    fontSize: 10,
    color: '#fff',
  },
  videoInfo: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  watchTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  category: {
    marginTop: 10,
    fontSize: 12,
    color: '#fff',
  },
  watchCategory: {
    marginTop: 10,
    fontSize: 12,
    color: '#999',
  },
});
