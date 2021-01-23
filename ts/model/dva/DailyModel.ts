import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RefreshState} from 'react-native-refresh-list-view';
import {Item} from '@/model/Daily';
import {RootState} from '@/model/dva/Models';
import Toast from 'react-native-root-toast';

const DAILY_URL = 'v2/feed?num=1';

export interface IDailyModelState {
  bannerList: Item[];
  dataList: Item[];
  refreshState: number;
  nextPageUrl: string | null;
}

export interface DailyModel extends Model {
  namespace: 'daily';
  state: IDailyModelState;
  reducers: {
    setState: Reducer<IDailyModelState>;
  };
  effects: {
    onRefresh: Effect;
    onLoadMore: Effect;
  };
}

const initialState: IDailyModelState = {
  bannerList: [],
  dataList: [],
  refreshState: RefreshState.Idle,
  nextPageUrl: null,
};

const dailyModel: DailyModel = {
  namespace: 'daily',
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

        const {data} = yield call(axios.get, DAILY_URL);
        const {issueList, nextPageUrl} = data;
        let {itemList} = issueList[0];
        itemList = itemList.filter((value: Item) => value.type !== 'banner2');

        yield put({
          type: 'setState',
          payload: {
            bannerList: itemList,
            nextPageUrl: nextPageUrl,
          },
        });

        yield put({
          type: 'onLoadMore',
          payload: {
            withRefresh: true,
            nextPageUrl: nextPageUrl,
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
        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.FooterRefreshing,
          },
        });

        let originList = [];
        if (payload && !payload.withRefresh) {
          const {dataList} = yield select((state: RootState) => state.daily);
          originList = dataList;
        }

        const {data} = yield call(axios.get, payload.nextPageUrl);
        const {issueList, nextPageUrl} = data;
        let {itemList} = issueList[0];
        itemList = itemList.filter((value: Item) => value.type !== 'banner2');

        yield put({
          type: 'setState',
          payload: {
            dataList:
              payload && payload.withRefresh
                ? itemList
                : originList.concat(itemList),
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

export default dailyModel;
