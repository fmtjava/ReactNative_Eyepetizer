import React, {useEffect, useRef} from 'react';
import {RootState} from '@/model/dva/Models';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import RefreshListView, {RefreshState} from 'react-native-refresh-list-view';
import {
  ListRenderItemInfo,
  View,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  Keyboard,
  TextInputSubmitEditingEventData,
  TextInput,
  Platform,
  NativeModules,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {
  FeedHeight,
  formatDateMsByMS,
  goBack,
  navigate,
  ScreenWidth,
} from '@/utils/Utils';
import {Item} from '@/model/Daily';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconBack1 from '@/assets/iconfont/IconBack1';
import IconSearch from '@/assets/iconfont/IconSearch';
import Toast from 'react-native-root-toast';
import IconWantempty from '@/assets/iconfont/IconWantempty';
import Spinner from 'react-native-loading-spinner-overlay';
import IconIconVoice from '@/assets/iconfont/IconIconVoice';

const CLEAR_TYPE = 'search/setState';
const KEYWORD_TYPE = 'search/getKeyWordList';
const REFRESH_TYPE = 'search/onRefresh';
const LOADMORE_TYPE = 'search/onLoadMore';

const mapStateToProps = ({search}: RootState) => {
  return {
    showLoading: search.showLoading,
    showKeyWorkContainer: search.showKeyWorkContainer,
    keyWordList: search.keyWordList,
    dataList: search.dataList,
    refreshState: search.refreshState,
    nextPageUrl: search.nextPageUrl,
    total: search.total,
  };
};

function SearchPage() {
  const keyword = useRef('');

  const dispatch = useDispatch();
  const {
    showLoading,
    showKeyWorkContainer,
    keyWordList,
    dataList,
    refreshState,
    nextPageUrl,
    total,
  } = useSelector(mapStateToProps, shallowEqual);

  useEffect(() => {
    dispatch({
      type: KEYWORD_TYPE,
    });
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch({
        type: CLEAR_TYPE,
        payload: {
          showLoading: true,
          showKeyWorkContainer: true,
          refreshState: RefreshState.Idle,
          keyWordList: [],
          dataList: [],
          total: 0,
          nextPageUrl: null,
        },
      });
    };
  }, [dispatch]);

  const onHeaderRefresh = () => {
    searchVideoByKeyWord(keyword.current);
  };

  const onFooterRefresh = () => {
    if (nextPageUrl == null) {
      return;
    }
    dispatch({
      type: LOADMORE_TYPE,
      payload: {
        nextPageUrl: nextPageUrl,
      },
    });
  };

  const onKeyWordPress = (item: string) => {
    dispatch({
      type: CLEAR_TYPE,
      payload: {
        showLoading: true,
      },
    });
    searchVideoByKeyWord(item);
  };

  const searchVideoByKeyWord = (key: string) => {
    keyword.current = key;
    Keyboard.dismiss();
    dispatch({
      type: REFRESH_TYPE,
      payload: {
        keyword: key,
      },
    });
  };
  const keyWordItem = (item: string) => {
    return (
      <TouchableWithoutFeedback key={item} onPress={() => onKeyWordPress(item)}>
        <View style={styles.keyWordContainer}>
          <Text style={styles.keyWord}>{item}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const keyExtractor = (item: Item) => {
    return `${item.data.id}`;
  };

  const renderItem = ({item}: ListRenderItemInfo<Item>) => {
    return <SearchVideoComponent item={item} />;
  };

  const contentContainer = () => {
    if (showLoading) {
      return (
        <Spinner
          visible={showLoading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      );
    }
    if (dataList == null || dataList.length === 0) {
      return keyWordContainerOrEmpty;
    }
    return (
      <View style={styles.searchVideoContainer}>
        <Text style={styles.searchKey}>
          — 「{keyword}」搜索结果共{total}个 —
        </Text>
        <RefreshListView
          data={dataList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          refreshState={refreshState}
          onHeaderRefresh={onHeaderRefresh}
          onFooterRefresh={onFooterRefresh}
          showsVerticalScrollIndicator={false}
          getItemLayout={(_data: Item, index: number) => ({
            length: FeedHeight,
            offset: FeedHeight * index,
            index,
          })}
        />
      </View>
    );
  };

  const keyWordContainerOrEmpty = () => {
    if (showKeyWorkContainer) {
      return (
        <View>
          <Text style={styles.hotSearch}>热搜关键字</Text>
          <View style={styles.keyWordList}>{keyWordList.map(keyWordItem)}</View>
        </View>
      );
    } else {
      return (
        <View style={styles.empty}>
          <IconWantempty size={60} />
          <Text style={styles.emptyText}>暂时木有数据</Text>
        </View>
      );
    }
  };

  const onSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    const text = e.nativeEvent.text;
    if (text.trim() === '') {
      Toast.show('请输入搜索关键字');
      return;
    }
    searchVideoByKeyWord(text);
  };

  const showSpeechDialog = () => {
    NativeModules.Voice.startVoice()
      .then((result: string) => {
        searchVideoByKeyWord(result);
      })
      .catch((e: Error) => {
        Toast.show(e.message);
      });
  };

  const searchView = () => {
    if (Platform.OS === 'ios') {
      return null;
    } else {
      return (
        <TouchableWithoutFeedback onPress={showSpeechDialog}>
          <IconIconVoice style={styles.voice} size={30} color="#00000042" />
        </TouchableWithoutFeedback>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.back}>
          <TouchableWithoutFeedback onPress={goBack}>
            <IconBack1 size={25} color={'#0000008A'} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.inputContainer}>
          <IconSearch size={16} style={styles.iconSearch} color="#00000042" />
          <TextInput
            style={styles.input}
            placeholder={'帮你找到感兴趣的视频'}
            returnKeyType="search"
            onSubmitEditing={onSubmit}
          />
        </View>
        {searchView}
      </View>
      {contentContainer}
    </SafeAreaView>
  );
}

interface IProps {
  item: Item;
}

class SearchVideoComponent extends React.PureComponent<IProps> {
  go2VideoDetail = (item: Item) => {
    navigate('VideoDetail', {item: item});
  };
  render() {
    const {item} = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => this.go2VideoDetail(item)}>
        <View style={styles.feedContainer}>
          <FastImage source={{uri: item.data.cover.feed}} style={styles.feed} />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {formatDateMsByMS(item.data.duration * 1000)}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  voice: {
    marginEnd: 15,
  },
  back: {
    paddingHorizontal: 15,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 36,
    backgroundColor: '#0000000D',
    borderRadius: 18,
    alignItems: 'center',
    marginRight: 15,
  },
  input: {
    flex: 1,
    height: 40,
  },
  iconSearch: {
    marginLeft: 15,
    marginRight: 2,
  },
  keyWordList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 15,
  },
  keyWordContainer: {
    backgroundColor: '#0000001A',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  keyWord: {
    color: '#00000073',
    fontSize: 12,
  },
  hotSearch: {
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
    marginTop: 25,
    marginBottom: 15,
  },
  searchKey: {
    alignSelf: 'center',
    color: '#0000008A',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  searchVideoContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  feedContainer: {
    width: ScreenWidth,
    height: FeedHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feed: {
    width: ScreenWidth,
    height: FeedHeight,
  },
  timeContainer: {
    position: 'absolute',
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#0000008A',
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#fff',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 5,
  },
});

export default SearchPage;
