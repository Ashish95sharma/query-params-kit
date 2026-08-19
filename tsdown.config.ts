import { defineConfig } from "tsdown";

function typesFor(file: string): string {
  return file
    .replace(/\.mjs$/, ".d.mts")
    .replace(/\.cjs$/, ".d.cts")
    .replace(/\.js$/, ".d.ts");
}

function resolvedFile(value: unknown, fallback: string): string {
  if (typeof value === "string") {
    return value;
  }

  if (
    value &&
    typeof value === "object" &&
    "default" in value &&
    typeof (value as { default: unknown }).default === "string"
  ) {
    return (value as { default: string }).default;
  }

  return fallback;
}

export default defineConfig({
  entry: "src/index.ts",
  format: ["esm", "cjs"],
  dts: true,
  platform: "neutral",
  exports: {
    legacy: true,
    customExports(exports) {
      const root = exports["."];

      if (root && typeof root === "object") {
        const importPath = resolvedFile(root.import, "./dist/index.js");
        const requirePath = resolvedFile(root.require, "./dist/index.cjs");
        const importTypes = typesFor(importPath);
        const requireTypes = typesFor(requirePath);

        exports["."] = {
          types: importTypes,
          import: {
            types: importTypes,
            default: importPath,
          },
          require: {
            types: requireTypes,
            default: requirePath,
          },
        };
      }

      return exports;
    },
  },
});
