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
            const index = watchList.findIndex(
              (watchItem: Item) => item.data.id === watchItem.data.id,
            );
            if (index === -1) {
              watchList.push(item);
            }
          }
        } else {
          const index = watchList.findIndex(
            (watchItem: Item) => item.data.id === watchItem.data.id,
          );
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
