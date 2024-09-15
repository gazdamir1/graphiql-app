import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {},
    ignores: ["**/node_modules/", ".git/"],
  },
  { files: ["**/*.{ts,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: ["tsconfig.json"],
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "react/react-in-jsx-scope": "off",
    },
  }
);
