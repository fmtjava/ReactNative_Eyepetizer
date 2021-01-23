import {Item} from './Daily';

export interface IRecommendModel {
  type: string;
  data: IRecommendDataModel;
}

export interface IRecommendDataModel {
  content: Item;
}
