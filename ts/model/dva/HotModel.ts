import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import {ITab} from '@/model/Tab';

const RANK_URL = 'v4/rankList';

export interface IHotState {
  showLoading: boolean;
  tabList: ITab[];
}

export interface HotModel extends Model {
  namespace: 'hot';
  state: IHotState;
  reducers: {
    setState: Reducer<IHotState>;
  };
  effects: {
    getTabList: Effect;
  };
}

const initialState: IHotState = {
  showLoading: true,
  tabList: [],
};

const hotModel: HotModel = {
  namespace: 'hot',
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
    *getTabList(_, {call, put}) {
      try {
        const {data} = yield call(axios.get, RANK_URL);
        const {tabInfo} = data;
        const {tabList} = tabInfo;
        yield put({
          type: 'setState',
          payload: {
            showLoading: false,
            tabList: tabList,
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
  },
};

export default hotModel;
