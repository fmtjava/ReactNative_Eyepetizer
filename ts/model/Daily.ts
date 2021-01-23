export interface IDaily {
  nextPageUrl: string;
  issueList: Issue[];
}

export interface Issue {
  itemList: Item[];
}

export interface Item {
  type: string;
  data: ItemData;
}

export interface ItemData {
  id: number;
  title: string;
  text: string;
  category: string;
  description: string;
  playUrl: string;
  duration: number;
  owner: Owner;
  consumption: Consumption;
  author: Author;
  cover: Cover;
  releaseTime: number;
  tags: Tag[];
  width: number;
  height: number;
  urls?: string[];
}

export interface Author {
  icon: string;
  name: string;
  description: string;
  latestReleaseTime: number;
}

export interface Cover {
  blurred: string;
  feed: string;
}

export interface Owner {
  nickname: string;
  avatar: string;
}

export interface Consumption {
  collectionCount: number;
  shareCount: number;
  replyCount: number;
}

export interface Tag {
  headerImage: string;
  name: string;
}
