import eslintPluginN from "eslint-plugin-n";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  {
    rules: {
      "no-duplicate-imports": "warn",
      "no-restricted-syntax": [
        "error",
        { message: "Enums are not allowed.", selector: "TSEnumDeclaration" },
      ],
      "object-shorthand": "error",
      "no-useless-rename": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.js"],
    plugins: {
      n: eslintPluginN,
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "n/no-process-env": "off",
    },
  },
);
