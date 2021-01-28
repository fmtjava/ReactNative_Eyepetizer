import daily from './DailyModel';
import category from './CategoryModel';
import topicList from './TopicListModel';
import news from './NewsModel';
import follow from './FollowModel';
import recommend from './RecommendModel';
import video from './VideoModel';
import hot from './HotModel';
import hotTab from './HotTabModel';
import search from './SearchModel';
import topicDetail from './TopicDetailModel';

const models = [
  daily,
  category,
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

export type RootState = {
  daily: typeof daily.state;
  category: typeof category.state;
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
