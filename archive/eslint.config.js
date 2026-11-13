// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "node_modules/*", ".expo/*", "ios/*", "android/*", "legacy/*"],
  },
  {
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
]);
