import base from "@repo/eslint-config/base";
import rule from "@repo/eslint-config/rule";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  {
    ignores: ["./.wrangler/**"],
  },
  base,
  rule,
  eslintConfigPrettier,
);
