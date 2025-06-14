import { defineConfig } from "tsup";

export const config = defineConfig({
  format: ["esm", "cjs"],
  legacyOutput: true,
  entry: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.{spec,test}.{ts,tsx}",
    "src/**/*.{jpg,png,svg}",
  ],
  outDir: "dist",
  target: "es2019",
  bundle: false,
  sourcemap: true,
  loader: {
    ".jpg": "copy",
    ".png": "copy",
    ".svg": "copy",
  },
});
