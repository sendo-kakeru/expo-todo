/**
 * ESLint の `@typescript-eslint/no-misused-promises` をオンにしているため、
 * `<form onSubmit={handleSubmit(onSubmit)}>` のように `onSubmit` に react-hook-form の `handleSubmit` を直接渡すことができない
 * async, void 周りを吸収するための簡単なヘルパー
 *
 * @example `<form onSubmit={submit(handleSubmit(onSubmit))}>`
 */
export const submit =
  (cb: (e?: React.BaseSyntheticEvent) => Promise<void>) =>
  (e?: React.BaseSyntheticEvent): void => {
    void cb(e);
  };
