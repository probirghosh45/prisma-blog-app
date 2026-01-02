import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JS base config
  {
    files: ["**/*.{ts,mts,cts}"],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },

  // TS + type-aware config
  {
    files: ["**/*.{ts,mts,cts}", "!eslint.config.ts"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: true, // 🔥 REQUIRED for type-aware rules
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.node,
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "error",
          "@typescript-eslint/typedef": [
      "error",
      {
        variableDeclaration: false,
        variableDeclarationIgnoreFunction: true
      }
    ]
    },
  },

  // ESLint config file (no type-aware linting)
  {
    files: ["eslint.config.ts"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: false,
      },
      globals: globals.node,
    },
  },
]);
