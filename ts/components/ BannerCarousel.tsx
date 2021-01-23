import React from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from '@/components/common/Carousel';
import {Item} from '@/model/Daily';
import {FeedWidth, FeedHeight, navigate} from '@/utils/Utils';

interface IProps {
  bannerList: Item[];
}

class BannerCarousel extends React.Component<IProps> {
  onPress = (item: Item) => {
    navigate('VideoDetail', {item: item});
  };
  renderPage(item: Item, index: number) {
    return (
      <TouchableWithoutFeedback key={index} onPress={() => this.onPress(item)}>
        {this.renderItem(item)}
      </TouchableWithoutFeedback>
    );
  }

  renderItem = (item: Item) => {
    return (
      <View>
        <FastImage style={styles.image} source={{uri: item.data.cover.feed}} />
        <View style={styles.bottom}>
          <Text style={styles.text}>{item.data.title}</Text>
        </View>
      </View>
    );
  };

  render() {
    const {bannerList} = this.props;
    if (bannerList.length === 0) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Carousel
          autoplayTimeout={5000}
          loop
          pageIndicatorOffset={14}
          pageIndicatorContainerStyle={styles.pageIndicatorContainerStyle}
          pageIndicatorStyle={styles.pageIndicatorStyle}
          activePageIndicatorStyle={styles.activePageIndicatorStyle}>
          {bannerList.map((item, index) => this.renderPage(item, index))}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 4,
  },
  image: {
    width: FeedWidth,
    height: FeedHeight,
    borderRadius: 4,
    alignSelf: 'center',
  },
  pageIndicatorContainerStyle: {
    position: 'absolute',
    right: 20,
    bottom: 12,
  },
  pageIndicatorStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: '#FFFFFF3D',
  },
  activePageIndicatorStyle: {
    backgroundColor: '#FFF',
  },
  bottom: {
    width: FeedWidth,
    position: 'absolute',
    bottom: 0,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginStart: 15,
    backgroundColor: '#0000001F',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});

export default BannerCarousel;
