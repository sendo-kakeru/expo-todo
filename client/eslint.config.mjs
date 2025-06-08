import base from "@repo/eslint-config/base";
import rule from "@repo/eslint-config/rule";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import nodePlugin from "eslint-plugin-n";
import reactPlugin from "eslint-plugin-react";
import reactHooksEslintPlugin from "eslint-plugin-react-hooks";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
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
    rules: {
      "react/react-in-jsx-scope": "off",
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
    plugins: {
      "react-hooks": reactHooksEslintPlugin,
      n: nodePlugin,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
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
      "react/button-has-type": ["error"],
      "react/jsx-equals-spacing": ["warn", "never"],
      "react/jsx-fragments": "warn",
      "react/jsx-newline": [
        "warn",
        {
          prevent: true,
          allowMultilines: false,
        },
      ],
      "react/jsx-no-target-blank": "off",
      "react/self-closing-comp": [
        "warn",
        {
          component: true,
          html: true,
        },
      ],
      "react-hooks/exhaustive-deps": "error",
    },
  },
  ...tailwindPlugin.configs["flat/recommended"],
  {
    settings: {
      react: {
        version: "detect",
      },
      tailwindcss: {
        callees: ["cn", "clsx", "cva"],
        cssFiles: [],
        classRegex: "^(className|[a-zA-Z]+ClassName)$",
      },
    },
  },
  {
    files: ["metro.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  eslintConfigPrettier,
);
