import React from 'react';
import {Text, Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ic_img_avatar from '@/assets/ic_img_avatar.png';
import IconLove from '@/assets/iconfont/IconLove';
import IconComment from '@/assets/iconfont/IconComment';
import {navigate} from '@/utils/Utils';

class MinePage extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.avatar} source={ic_img_avatar} />
        <Text style={styles.infoText}>查看个人主页 &gt;</Text>
        <View style={styles.consume}>
          <View style={styles.behaviour}>
            <View style={styles.behaviourContainer}>
              <IconLove size={18} color="grey" />
              <Text style={styles.behaviourText}>收藏</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.behaviour}>
            <View style={styles.behaviourContainer}>
              <IconComment size={18} color="grey" />
              <Text style={styles.behaviourText}>评论</Text>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {this.settingView('我的消息')}
        {this.settingView('我的记录')}
        {this.settingView('我的缓存')}
        {this.settingView('观看记录', () => {
          navigate('WatchHistoryPage');
        })}
        {this.settingView('意见反馈')}
      </SafeAreaView>
    );
  }

  settingView = (text: string, onPress?: () => void | undefined) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.settings}>{text}</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginTop: 30,
    alignSelf: 'center',
  },
  infoText: {
    fontSize: 12,
    color: 'grey',
    marginTop: 10,
    alignSelf: 'center',
  },
  consume: {
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  behaviour: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  behaviourContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  behaviourText: {
    fontSize: 14,
    color: 'grey',
    marginLeft: 5,
  },
  line: {
    height: 40,
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
  },
  horizontalLine: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
    marginTop: 20,
  },
  settings: {
    marginTop: 30,
    fontSize: 16,
    alignSelf: 'center',
    color: 'grey',
  },
});

export default MinePage;
