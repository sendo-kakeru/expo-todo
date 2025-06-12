export type SerializeDates<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends (infer U)[]
      ? SerializeDates<U>[]
      : T[K] extends object
        ? SerializeDates<T[K]>
        : T[K];
};
