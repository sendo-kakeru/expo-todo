import base from "@repo/eslint-config/base";
import rule from "@repo/eslint-config/rule";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  {
    ignores: ["./.expo/**"],
  },
  base,
  {
    settings: {
      tailwindcss: {
        cssFiles: ["global.css"],
      },
    },
  },
  rule,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.js", "**/*.cjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: undefined,
      },
    },
  },
  {
    files: ["metro.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowAny: false,
          allowBoolean: false,
          allowNever: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
        },
      ],
    },
  },
  eslintConfigPrettier,
);
