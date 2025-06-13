export type SerializeDates<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends (infer U)[] | readonly (infer V)[]
      ? SerializeDates<U | V>[]
      : T[K] extends object
        ? SerializeDates<T[K]>
        : T[K];
};
