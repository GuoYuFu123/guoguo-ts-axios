import { plugins } from "./roolup.base";

export default {
  input: "src/index.ts",
  output: {
    dir: "./lib",
    format: "esm",
    exports: "named",
  },
  plugins,
};
