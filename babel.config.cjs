module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ["react-native-reanimated/plugin", "module:react-native-dotenv"],
    presets: ["babel-preset-expo"],
    overrides: [
      {
        test: "./node_modules/ethers",
        plugins: [
          "@babel/plugin-proposal-private-property-in-object",
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-private-methods",
          [
            "module:react-native-dotenv",
            {
              moduleName: "@env",
              path: ".env",
              allowUndefined: false,
            },
          ],
        ],
      },
    ],
  };
};
