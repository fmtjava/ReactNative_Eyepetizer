import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import {ITopicDetail} from '@/model/TopicDetail';

const TOPISC_DETAIL_URL = 'v3/lightTopics/internal/';

export interface ITopicDetailModelState {
  topDetail: ITopicDetail | null;
  refreshing: boolean;
}

export interface TopicDetailModel extends Model {
  namespace: 'topicDetail';
  state: ITopicDetailModelState;
  reducers: {
    setState: Reducer<ITopicDetailModelState>;
  };
  effects: {
    onRefresh: Effect;
  };
}

const initialState: ITopicDetailModelState = {
  topDetail: null,
  refreshing: true,
};

const topicDetailModel: TopicDetailModel = {
  namespace: 'topicDetail',
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
        const url = `${TOPISC_DETAIL_URL}${payload.id}`;
        const {data} = yield call(axios.get, url);

        yield put({
          type: 'setState',
          payload: {
            topDetail: data,
            refreshing: false,
          },
        });
      } catch (error) {
        Toast.show(error.message);
        yield put({
          type: 'setState',
          payload: {
            refreshing: false,
          },
        });
      }
    },
  },
};

export default topicDetailModel;
