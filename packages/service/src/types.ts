export type OmitNull<T extends object | undefined> = T extends undefined
  ? undefined
  : {
      [K in keyof T]: null extends T[K] ? Exclude<T[K], null> | undefined : T[K];
    };

export type PartialRequired<T extends object, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type PartialOptional<T extends object, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
