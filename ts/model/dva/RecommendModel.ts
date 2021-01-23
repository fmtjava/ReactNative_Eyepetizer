import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RootState} from '@/model/dva/Models';
import Toast from 'react-native-root-toast';
import {IRecommendModel} from '@/model/Recommend';
import {ScreenWidth} from '@/utils/Utils';
import {IMasonry} from '@/model/Masonry';
import {RefreshState} from 'react-native-refresh-list-view';
const CARD_WIDTH = (ScreenWidth - 20) / 2;

const COMMUNITY_URL = 'v7/community/tab/rec';

export interface IRecommendModelState {
  refreshState: number;
  nextPageUrl: string | null;
  images: IMasonry[];
}

export interface RecommendModel extends Model {
  namespace: 'recommend';
  state: IRecommendModelState;
  reducers: {
    setState: Reducer<IRecommendModelState>;
  };
  effects: {
    onRefresh: Effect;
    onLoadMore: Effect;
  };
}

const initialState: IRecommendModelState = {
  refreshState: RefreshState.Idle,
  nextPageUrl: null,
  images: [],
};

const recommendModel: RecommendModel = {
  namespace: 'recommend',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *onRefresh(_, {call, put}) {
      try {
        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.HeaderRefreshing,
          },
        });
        const {data} = yield call(axios.get, COMMUNITY_URL);
        let {itemList, nextPageUrl} = data;
        itemList = itemList.filter(
          (value: IRecommendModel) => value.type !== 'horizontalScrollCard',
        );

        yield put({
          type: 'setState',
          payload: {
            images: mapToIMasonryList(itemList),
            nextPageUrl: nextPageUrl,
            refreshState:
              nextPageUrl === null
                ? RefreshState.NoMoreData
                : RefreshState.Idle,
          },
        });
      } catch (error) {
        Toast.show(error.message);
        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.Failure,
          },
        });
      }
    },
    *onLoadMore({payload}, {call, put, select}) {
      try {
        if (payload && payload.nextPageUrl == null) {
          return;
        }

        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.FooterRefreshing,
          },
        });

        const {images} = yield select((state: RootState) => state.recommend);
        const {data} = yield call(axios.get, payload.nextPageUrl);
        const {itemList, nextPageUrl} = data;

        yield put({
          type: 'setState',
          payload: {
            images: images.concat(mapToIMasonryList(itemList)),
            nextPageUrl: nextPageUrl,
            refreshState:
              nextPageUrl === null
                ? RefreshState.NoMoreData
                : RefreshState.Idle,
          },
        });
      } catch (error) {
        Toast.show(error.message);
        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.Failure,
          },
        });
      }
    },
  },
};

function mapToIMasonryList(itemList: IRecommendModel[]) {
  return itemList.map((value: IRecommendModel) => {
    return {
      uri: value.data.content.data.cover.feed,
      dimensions: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
      },
      description: value.data.content.data.description,
      avatar: value.data.content.data.owner.avatar,
      nickname: value.data.content.data.owner.nickname,
      collectionCount: value.data.content.data.consumption.collectionCount,
      urls: value.data.content.data.urls,
      playUrl: value.data.content.data.playUrl,
      type: value.data.content.type,
      width: value.data.content.data.width,
      height: value.data.content.data.height,
    };
  });
}

export default recommendModel;
