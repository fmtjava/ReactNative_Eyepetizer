import {Item} from './Daily';

export interface ITopicDetail {
  headerImage: string;
  brief: string;
  text: string;
  itemList: ITopicDetailItem[];
}

export interface ITopicDetailItem {
  data: ITopicDetailData;
}

export interface ITopicDetailData {
  header: ITopicHeaderDetail;
  content: Item;
}

export interface ITopicHeaderDetail {
  icon: string;
  issuerName: string;
  time: number;
}
