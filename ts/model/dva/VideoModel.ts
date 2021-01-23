import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import {Item} from '@/model/Daily';

const RELATED_VIDEO_URL = 'v4/video/related?id=';

export interface IVideoState {
  refreshing: boolean;
  relateVideoList: Item[];
}

export interface VideoModel extends Model {
  namespace: 'video';
  state: IVideoState;
  reducers: {
    setState: Reducer<IVideoState>;
  };
  effects: {
    getRelateVideoList: Effect;
  };
}

const initialState: IVideoState = {
  refreshing: true,
  relateVideoList: [],
};

const videoModel: VideoModel = {
  namespace: 'video',
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
    *getRelateVideoList({payload}, {call, put}) {
      try {
        const url = `${RELATED_VIDEO_URL}${payload.id}`;
        const {data} = yield call(axios.get, url);
        const {itemList} = data;

        yield put({
          type: 'setState',
          payload: {
            refreshing: false,
            relateVideoList: itemList,
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

export default videoModel;
