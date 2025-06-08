import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export default tseslint.config(
  js.configs.recommended,
  eslintConfigPrettier,
  tseslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },
);
