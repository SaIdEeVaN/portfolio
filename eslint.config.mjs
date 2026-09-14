import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Vendored Bklit UI chart code (installed from the @bklit registry). Its mount
  // animations deliberately set state in effects and sync a ref during render, which
  // these React Compiler rules flag. Kept as upstream wrote it so registry updates stay
  // easy to diff; the rest of the codebase is linted normally.
  {
    files: ["src/components/charts/**"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
