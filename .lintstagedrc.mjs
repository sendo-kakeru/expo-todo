/** @type {import('lint-staged').Configuration} */
const config = {
  "*.{js,jsx,ts,tsx,css,json,md,yaml,yml}": ["pnpm -w prettier --write"],
};

export default config;
