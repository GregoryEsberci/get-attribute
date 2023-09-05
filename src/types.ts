import { GetValueType } from './get-value';

export type GetterType<K extends string> = <O>(obj: O) => GetValueType<O, K>;
