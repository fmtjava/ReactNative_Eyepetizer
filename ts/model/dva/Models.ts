import daily from './DailyModel';
import category from './CategoryModel';
import categoryDetail from './CategoryDetailModel';
import topicList from './TopicListModel';
import news from './NewsModel';
import follow from './FollowModel';
import recommend from './RecommendModel';
import video from './VideoModel';
import hot from './HotModel';
import hotTab from './HotTabModel';
import search from './SearchModel';
import topicDetail from './TopicDetailModel';

//存储项目中每一个页面对应的数据仓库
const models = [
  daily,
  category,
  categoryDetail,
  topicList,
  news,
  follow,
  recommend,
  video,
  hot,
  hotTab,
  search,
  topicDetail,
];

//存储每一个页面所需的数据状态
export type RootState = {
  daily: typeof daily.state;
  category: typeof category.state;
  categoryDetail: typeof categoryDetail.state;
  topicList: typeof topicList.state;
  news: typeof news.state;
  follow: typeof follow.state;
  recommend: typeof recommend.state;
  video: typeof video.state;
  hot: typeof hot.state;
  search: typeof search.state;
  topicDetail: typeof topicDetail.state;
} & {
  //联合类型
  [key: string]: typeof hotTab.state;
};

export default models;
