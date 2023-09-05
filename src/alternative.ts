import getValue from './get-value';
import { GetterType } from './types';

type MemoItem = { recentlyAccessed: boolean; getter: GetterType<any> };

const createGetAttribute = () => {
  const CLEANUP_INTERVAL = 30_000;

  const memo = new Map<string, MemoItem>();
  let timerId: ReturnType<typeof setInterval> | undefined;

  const memoCleanup = () => {
    memo.forEach((item, key) => {
      if (item?.recentlyAccessed) {
        item.recentlyAccessed = false;
      } else {
        memo.delete(key);
      }
    });
  };

  const startCleanupProcess = () => {
    if (timerId) return;

    timerId = setInterval(() => {
      memoCleanup();

      if (memo.size === 0) {
        clearInterval(timerId);
        timerId = undefined;
      }
    }, CLEANUP_INTERVAL);
  };

  const newGetAttribute = <K extends string>(key: K) => {
    const getter: GetterType<K> = (obj) => {
      const memoItem = memo.get(key);

      if (memoItem) {
        memoItem.recentlyAccessed = true;
      }

      return getValue(obj, key);
    };

    memo.set(key, { getter, recentlyAccessed: true });

    startCleanupProcess();

    return getter;
  };

  const getAttribute = <K extends string>(key: K): GetterType<K> => {
    const memoItem = memo.get(key);

    if (memoItem) {
      memoItem.recentlyAccessed = true;
      return memoItem.getter;
    }

    return newGetAttribute(key);
  };

  return getAttribute;
};

export default createGetAttribute;
