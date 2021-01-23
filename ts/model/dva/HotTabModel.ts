import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import {Item} from '@/model/Daily';

export interface IHotTabState {
  refreshing: boolean;
  dataList: Item[];
}

export interface HotTabModel extends Model {
  state: IHotTabState;
  reducers: {
    setState: Reducer<IHotTabState>;
  };
  effects: {
    onRefresh: Effect;
  };
}

const initialState: IHotTabState = {
  refreshing: true,
  dataList: [],
};

const hotTabModel: HotTabModel = {
  namespace: 'hotTab',
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
        const {data} = yield call(axios.get, payload.apiUrl);
        const {itemList} = data;
        yield put({
          type: 'setState',
          payload: {
            refreshing: false,
            dataList: itemList,
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

export default hotTabModel;
