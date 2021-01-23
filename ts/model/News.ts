export interface INewsModel {
  type: string;
  data: INewsData;
}

export interface INewsData {
  id: number;
  text: string;
  titleList: string[];
  backgroundImage: string;
  actionUrl: string;
}
