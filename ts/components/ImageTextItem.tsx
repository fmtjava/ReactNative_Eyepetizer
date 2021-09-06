import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import IconShare1 from '@/assets/iconfont/IconShare1';
import {Item} from '@/model/Daily';
import {FeedWidth, formatDateMsByMS, navigate, share} from '@/utils/Utils';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

interface IProps {
  item: Item;
}

function ImageTextItem(props: IProps) {
  const onPress = (item: Item) => {
    navigate('VideoDetail', {item: item});
  };

  const {item} = props;
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onPress(item)}>
        <FastImage
          style={styles.feed}
          source={{
            uri: item.data.cover.feed,
          }}
        />
        <View style={styles.category}>
          <Text style={styles.categoryText}>{item.data.category}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {formatDateMsByMS(item.data.duration * 1000)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.bottom}>
        <FastImage
          style={styles.author}
          source={{
            uri: item.data.author
              ? item.data.author.icon
              : item.data.tags[0].headerImage,
          }}
        />
        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.title}>
            {item.data.title}
          </Text>
          <Text style={styles.name}>
            {item.data.author ? item.data.author.name : item.data.tags[0].name}
          </Text>
        </View>
        <IconShare1
          onPress={() => share(item.data.title, item.data.playUrl)}
          color="#00000061"
        />
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  feed: {
    width: FeedWidth,
    height: 200,
    borderRadius: 4,
    marginBottom: 10,
  },
  bottom: {
    flexDirection: 'row',
    marginBottom: 10,
    alignContent: 'center',
    alignItems: 'center',
  },
  author: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  category: {
    position: 'absolute',
    top: 10,
    left: 15,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: '#fff',
  },
  timeContainer: {
    position: 'absolute',
    right: 15,
    bottom: 20,
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#0000008A',
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#fff',
  },
  title: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  name: {
    color: '#9a9a9a',
    fontSize: 12,
    marginTop: 5,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#0000001F',
  },
});

export default ImageTextItem;
