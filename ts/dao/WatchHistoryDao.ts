import {Item} from '@/model/Daily';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WATCH_HISTORY_KEY = 'watch_history_key';

export default class WatchHistoryDao {
  static updateWatchHistory(
    item: Item,
    isAdd: boolean = true,
    callback?: Function | undefined | null,
  ) {
    AsyncStorage.getItem(WATCH_HISTORY_KEY, (error, result) => {
      if (!error) {
        let watchList: Array<Item> = [];
        if (result) {
          watchList = JSON.parse(result);
        }
        if (isAdd) {
          if (watchList.length === 0) {
            watchList.push(item);
          } else {
            let isContain = false;
            for (const watchItem of watchList) {
              if (item.data.id === watchItem.data.id) {
                isContain = true;
                break;
              }
            }
            if (!isContain) {
              watchList.push(item);
            }
          }
        } else {
          let index = 0;
          for (const watchItem of watchList) {
            if (item.data.id === watchItem.data.id) {
              index = watchList.indexOf(watchItem);
              break;
            }
          }
          watchList.splice(index, 1);
        }
        AsyncStorage.setItem(
          WATCH_HISTORY_KEY,
          JSON.stringify(watchList),
          (e) => {
            if (!e) {
              if (typeof callback === 'function') {
                callback();
              }
            }
          },
        );
      }
    });
  }

  static getWatchHistoryList() {
    return new Promise<Array<Item>>((resolve, reject) => {
      AsyncStorage.getItem(
        WATCH_HISTORY_KEY,
        (error?: Error, result?: string) => {
          if (!error && result) {
            try {
              resolve(JSON.parse(result));
            } catch (e) {
              reject(e);
            }
          } else {
            reject(error);
          }
        },
      );
    });
  }
}
