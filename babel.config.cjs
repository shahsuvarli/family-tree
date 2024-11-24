module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ["react-native-reanimated/plugin"],
    presets: ["babel-preset-expo"],
    overrides: [
      {
        test: "./node_modules/ethers",
        plugins: [
          "@babel/plugin-proposal-private-property-in-object",
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-private-methods",
        ],
      },
    ],
  };
};
