export type OmitNull<T extends object | undefined> = T extends undefined
  ? undefined
  : {
      [K in keyof T]: null extends T[K] ? Exclude<T[K], null> | undefined : T[K];
    };
