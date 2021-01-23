import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RefreshState} from 'react-native-refresh-list-view';
import {RootState} from '@/model/dva/Models';
import Toast from 'react-native-root-toast';
import {IFollowModel} from '@/model/Follow';

const FOLLOW_LIST_URL = 'v4/tabs/follow';

export interface IFollowModelState {
  dataList: IFollowModel[];
  refreshState: number;
  nextPageUrl: string | null;
}

export interface FollowModel extends Model {
  namespace: 'follow';
  state: IFollowModelState;
  reducers: {
    setState: Reducer<IFollowModelState>;
  };
  effects: {
    onRefresh: Effect;
    onLoadMore: Effect;
  };
}

const initialState: IFollowModelState = {
  dataList: [],
  refreshState: RefreshState.Idle,
  nextPageUrl: null,
};

const followModel: FollowModel = {
  namespace: 'follow',
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
        const {data} = yield call(axios.get, FOLLOW_LIST_URL);
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
        const {dataList} = yield select((state: RootState) => state.follow);
        const {data} = yield call(axios.get, payload.nextPageUrl);
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

export default followModel;
