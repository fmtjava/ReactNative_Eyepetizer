import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import {ICategory} from '@/model/Category';

const CATEGORY_URL = 'v4/categories';

export interface ICategoryState {
  refreshing: boolean;
  categoryList: ICategory[];
}

export interface CategoryModel extends Model {
  namespace: 'category';
  state: ICategoryState;
  reducers: {
    setState: Reducer<ICategoryState>;
  };
  effects: {
    onRefresh: Effect;
  };
}

const initialState: ICategoryState = {
  refreshing: true,
  categoryList: [],
};

const categoryModel: CategoryModel = {
  namespace: 'category',
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
        const {data} = yield call(axios.get, CATEGORY_URL);

        yield put({
          type: 'setState',
          payload: {
            refreshing: false,
            categoryList: data,
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

export default categoryModel;
