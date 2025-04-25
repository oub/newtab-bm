export default {
  verbose: false,
  artifactsDir: "./releases",
  build: {
    overwriteDest: true,
  },
  ignoreFiles: [
    "node_modules",
    "package*.json",
    "public",
    "releases",
    "src",
    "index.html",
    "pnpm-lock.yaml",
    "*.config.*",
    "tsconfig.*",
  ],
};
