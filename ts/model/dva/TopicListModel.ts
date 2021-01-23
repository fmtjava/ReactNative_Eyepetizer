import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import {RefreshState} from 'react-native-refresh-list-view';
import {ITopicList} from '@/model/TopicList';
import {RootState} from '@/model/dva/Models';
import Toast from 'react-native-root-toast';

const TOPISC_LIST_URL = 'v3/specialTopics';

export interface ITopicListModelState {
  dataList: ITopicList[];
  refreshState: number;
  nextPageUrl: string | null;
}

export interface TopicListModel extends Model {
  namespace: 'topicList';
  state: ITopicListModelState;
  reducers: {
    setState: Reducer<ITopicListModelState>;
  };
  effects: {
    onRefresh: Effect;
    onLoadMore: Effect;
  };
}

const initialState: ITopicListModelState = {
  dataList: [],
  refreshState: RefreshState.Idle,
  nextPageUrl: null,
};

const topicListModel: TopicListModel = {
  namespace: 'topicList',
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

        const {data} = yield call(axios.get, TOPISC_LIST_URL);
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

        const {dataList} = yield select((state: RootState) => state.topicList);
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

export default topicListModel;
