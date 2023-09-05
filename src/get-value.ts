// Source:
// https://dev.to/tipsy_dev/advanced-typescript-reinventing-lodash-get-4fhe
// https://codesandbox.io/s/typed-get-value-wmcmm

type FieldWithPossiblyUndefined<T, Key> =
  | GetValueType<Exclude<T, undefined>, Key>
  | Extract<T, undefined>;

type GetIndexedField<T, K> = K extends keyof T
  ? T[K]
  : K extends `${number}`
    ? '0' extends keyof T // tuples have string keys, return undefined if K is not in tuple
      ? undefined
      : number extends keyof T
        ? T[number]
        : undefined
    : undefined

export type GetValueType<T, P> = P extends `${infer Left}.${infer Right}`
  ? Left extends keyof T
    ? FieldWithPossiblyUndefined<T[Left], Right>
    : Left extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? FieldWithPossiblyUndefined<
            | GetIndexedField<Exclude<T[FieldKey], undefined>, IndexKey>
            | Extract<T[FieldKey], undefined>,
            Right
          >
        : undefined
      : undefined
  : P extends keyof T
    ? T[P]
    : P extends `${infer FieldKey}[${infer IndexKey}]`
      ? FieldKey extends keyof T
        ? GetIndexedField<
            Exclude<T[FieldKey], undefined>,
            IndexKey
          > | Extract<T[FieldKey], undefined>
        : undefined
      : undefined

const getValue = <TData, TPath extends string>(data: TData, path: TPath) => path
  .split(/[.[\]]/)
  .reduce<GetValueType<TData, TPath>>(
    (value, key) => (key ? (value as any)?.[key] : value),
    data as any,
  );

export default getValue;
