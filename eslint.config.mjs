import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Static hosting serves the original images without an image optimization server.
  { rules: { "@next/next/no-img-element": "off" } },
  globalIgnores([
    "dist/**",
    ".next/**",
    "out/**",
    "next-env.d.ts",
    "test-results/**",
    "playwright-report/**",
  ]),
]);
