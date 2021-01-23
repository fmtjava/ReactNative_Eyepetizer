import {Item} from './Daily';

export interface IFollowModel {
  data: IFollowDataModel;
}

export interface IFollowDataModel {
  header: IFollowHeaderModel;
  itemList: Item[];
}

export interface IFollowHeaderModel {
  icon: string;
  title: string;
  description: string;
}
