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
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": [
        "warn",
        {
          component: true,
          html: true,
        },
      ],
      "react-hooks/exhaustive-deps": "error",
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
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "n/no-process-env": "off",
    },
  },
);
