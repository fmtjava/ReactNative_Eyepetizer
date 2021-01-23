import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {Platform} from 'react-native';
import axios from 'axios';
import {RefreshState} from 'react-native-refresh-list-view';
import {INewsModel} from '@/model/News';
import {RootState} from '@/model/dva/Models';
import Toast from 'react-native-root-toast';

const NEWS_LIST_URL = 'v7/information/list?vc=6030000&deviceModel=';

export interface INewsModelState {
  dataList: INewsModel[];
  refreshState: number;
  nextPageUrl: string | null;
}

export interface NewsModel extends Model {
  namespace: 'news';
  state: INewsModelState;
  reducers: {
    setState: Reducer<INewsModelState>;
  };
  effects: {
    onRefresh: Effect;
    onLoadMore: Effect;
  };
}

const initialState: INewsModelState = {
  dataList: [],
  refreshState: RefreshState.Idle,
  nextPageUrl: null,
};

const newsModel: NewsModel = {
  namespace: 'news',
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
        const url = `${NEWS_LIST_URL}${Platform.OS}`;
        const {data} = yield call(axios.get, url);
        const {itemList, nextPageUrl} = data;
        yield put({
          type: 'setState',
          payload: {
            dataList: itemList,
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
        const url = `${payload.nextPageUrl}&vc=6030000&deviceModel=${Platform.OS}`;
        const {dataList} = yield select((state: RootState) => state.news);
        const {data} = yield call(axios.get, url);
        const {itemList, nextPageUrl} = data;

        yield put({
          type: 'setState',
          payload: {
            dataList: dataList.concat(itemList),
            nextPageUrl: nextPageUrl,
            refreshState:
              nextPageUrl === null
                ? RefreshState.NoMoreData
                : RefreshState.Idle,
          },
        });
      } catch (error) {
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

export default newsModel;
