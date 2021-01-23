import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RefreshState} from 'react-native-refresh-list-view';
import Toast from 'react-native-root-toast';
import {Item} from '@/model/Daily';
import {RootState} from './Models';

const KEYWORD_URL = 'v3/queries/hot';
const SEARCH_URL = 'v1/search?query=';

export interface ISearchState {
  showLoading: boolean;
  showKeyWorkContainer: boolean;
  refreshState: number;
  keyWordList: string[];
  dataList: Item[];
  total: number;
  nextPageUrl: string | null;
}

export interface SearchModel extends Model {
  namespace: 'search';
  state: ISearchState;
  reducers: {
    setState: Reducer<ISearchState>;
  };
  effects: {
    getKeyWordList: Effect;
    onRefresh: Effect;
    onLoadMore: Effect;
  };
}

const initialState: ISearchState = {
  showLoading: true,
  showKeyWorkContainer: true,
  refreshState: RefreshState.Idle,
  keyWordList: [],
  dataList: [],
  total: 0,
  nextPageUrl: null,
};

const searchModel: SearchModel = {
  namespace: 'search',
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
    *getKeyWordList(_, {call, put}) {
      try {
        const {data} = yield call(axios.get, KEYWORD_URL);
        yield put({
          type: 'setState',
          payload: {
            keyWordList: data,
            showLoading: false,
          },
        });
      } catch (error) {
        Toast.show(error.message);
        yield put({
          type: 'setState',
          payload: {
            showLoading: false,
          },
        });
      }
    },
    *onRefresh({payload}, {call, put}) {
      try {
        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.HeaderRefreshing,
          },
        });
        const url = `${SEARCH_URL}${payload.keyword}`;
        const {data} = yield call(axios.get, url);
        let {itemList, total, nextPageUrl} = data;
        itemList = itemList.filter((value: Item) => value.data.cover != null);
        yield put({
          type: 'setState',
          payload: {
            showLoading: false,
            showKeyWorkContainer: false,
            dataList: itemList,
            total: total,
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
            showLoading: false,
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

        const {dataList} = yield select((state: RootState) => state.search);
        const {data} = yield call(axios.get, payload.nextPageUrl);
        let {itemList, nextPageUrl} = data;
        itemList = itemList.filter((value: Item) => value.data.cover != null);

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

export default searchModel;
