/** @type {import('lint-staged').Configuration} */
const config = {
	"*.{js,jsx,ts,tsx,css,json,md,yaml,yml}": ["pnpm biome check --fix --unsafe"],
};

export default config;
