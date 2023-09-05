import getValue from './get-value';
import { GetterType } from './types';

type MemoItem = WeakRef<GetterType<any>>;

const createGetAttribute = () => {
  const memo = new Map<string, MemoItem>();
  const observerFinalizationRegistry = new FinalizationRegistry<string>((key) => memo.delete(key));

  const newGetAttribute = <K extends string>(key: K) => {
    const getter: GetterType<K> = (obj) => getValue(obj, key);

    observerFinalizationRegistry.register(getter, key);
    memo.set(key, new WeakRef(getter));

    return getter;
  };

  const getAttribute = <K extends string>(key: K): GetterType<K> => (
    memo.get(key)?.deref() || newGetAttribute(key)
  );

  return getAttribute;
};

export const canUseNative = typeof WeakRef === 'function' && typeof FinalizationRegistry === 'function';

export default createGetAttribute;
