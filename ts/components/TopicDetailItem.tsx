import IconCommentlinesFill from '@/assets/iconfont/IconCommentlinesFill';
import IconLove from '@/assets/iconfont/IconLove';
import IconShare1 from '@/assets/iconfont/IconShare1';
import IconStar from '@/assets/iconfont/IconStar';
import {Item, Tag} from '@/model/Daily';
import {ITopicDetailItem} from '@/model/TopicDetail';
import {FeedHeight, formatDateMsByYMD, navigate, share} from '@/utils/Utils';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

interface IProps {
  item: ITopicDetailItem;
}

function TopicDetailItem(props: IProps) {
  const go2VideoDetail = (item: Item) => {
    navigate('VideoDetail', {item: item});
  };

  const tagItem = (value: Tag) => {
    return (
      <View key={value.name} style={styles.tag}>
        <Text style={styles.tagText}>{value.name}</Text>
      </View>
    );
  };

  const {item} = props;
  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <FastImage
          style={styles.icon}
          source={{
            uri: item.data.header.icon,
          }}
        />
        <View style={styles.headLeftContainer}>
          <Text style={styles.issuerName}>{item.data.header.issuerName}</Text>
          <View style={styles.headBottomContainer}>
            <Text style={styles.time}>
              {formatDateMsByYMD(item.data.header.time)}发布:
            </Text>
            <Text numberOfLines={1} style={styles.title}>
              {item.data.content.data.title}
            </Text>
          </View>
        </View>
      </View>
      <Text numberOfLines={2} style={styles.description}>
        {item.data.content.data.description}
      </Text>

      <View style={styles.tagContainer}>
        {item.data.content.data.tags.length > 3
          ? item.data.content.data.tags
              .slice(0, 3)
              .map((value) => tagItem(value))
          : item.data.content.data.tags.map((value) => tagItem(value))}
      </View>
      <TouchableWithoutFeedback
        onPress={() => go2VideoDetail(item.data.content)}>
        <FastImage
          style={styles.feed}
          source={{
            uri: item.data.content.data.cover.feed,
          }}
        />
      </TouchableWithoutFeedback>
      <View style={styles.consumeContainer}>
        <View style={styles.consumeItem}>
          <IconLove size={22} color="#9a9a9a" />
          <Text style={styles.consumeText}>
            {item.data.content.data.consumption.collectionCount}
          </Text>
        </View>
        <View style={styles.consumeItem}>
          <IconCommentlinesFill size={16} color="#9a9a9a" />
          <Text style={styles.consumeText}>
            {item.data.content.data.consumption.replyCount}
          </Text>
        </View>
        <View style={styles.consumeItem}>
          <IconStar color="#9a9a9a" />
          <Text style={styles.consumeText}>收藏</Text>
        </View>
        <IconShare1
          color="#9a9a9a"
          onPress={() =>
            share(item.data.content.data.title, item.data.content.data.playUrl)
          }
        />
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginTop: 20,
    marginRight: 10,
  },
  headLeftContainer: {
    flex: 1,
    marginTop: 20,
  },
  issuerName: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  headBottomContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  time: {
    fontSize: 12,
    color: '#9a9a9a',
  },
  title: {
    flex: 1,
    color: '#000',
    fontSize: 12,
    marginStart: 3,
  },
  description: {
    fontSize: 14,
    color: '#333333',
    marginTop: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tag: {
    borderRadius: 4,
    backgroundColor: '#89b1e933',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  tagText: {
    color: '#42A5F5',
    fontSize: 12,
    padding: 5,
  },
  feed: {
    width: '100%',
    height: FeedHeight,
    borderRadius: 4,
    marginTop: 10,
  },
  consumeContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  consumeItem: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    flex: 1,
    alignItems: 'center',
  },
  consumeText: {
    color: '#9a9a9a',
    fontSize: 12,
    marginLeft: 10,
  },
  line: {
    marginTop: 15,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#0000001F',
  },
});

export default TopicDetailItem;
