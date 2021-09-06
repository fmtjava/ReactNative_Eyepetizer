import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RefreshState} from 'react-native-refresh-list-view';
import {Item} from '@/model/Daily';
import {RootState} from '@/model/dva/Models';
import Toast from 'react-native-root-toast';

const CATEGOTY_DETAIL_URL = 'v4/categories/videoList?id=';
const SUFFIX =
  '&udid=d2807c895f0348a180148c9dfa6f2feeac0781b5&deviceModel=Android';

export interface ICategoryDetailModelState {
  dataList: Item[];
  refreshState: number;
  nextPageUrl: string | null;
}

export interface CategoryDetailModel extends Model {
  namespace: 'categoryDetail';
  state: ICategoryDetailModelState;
  reducers: {
    setState: Reducer<ICategoryDetailModelState>;
  };
  effects: {
    onRefresh: Effect;
    onLoadMore: Effect;
  };
}

const initialState: ICategoryDetailModelState = {
  dataList: [],
  refreshState: RefreshState.Idle,
  nextPageUrl: null,
};

const categoryDetailModel: CategoryDetailModel = {
  namespace: 'categoryDetail',
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
    *onRefresh({payload}, {call, put}) {
      try {
        yield put({
          type: 'setState',
          payload: {
            refreshState: RefreshState.HeaderRefreshing,
          },
        });
        const url = `${CATEGOTY_DETAIL_URL}${payload.id}${SUFFIX}`;
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
        const url = `${payload.nextPageUrl}${SUFFIX}`;
        const {dataList} = yield select(
          (state: RootState) => state.categoryDetail,
        );
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

export default categoryDetailModel;
