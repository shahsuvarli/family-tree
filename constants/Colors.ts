/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

type ColorsType = {
  [key: string]: string;
};

export const Colors: ColorsType = {
  background: "#D2B48C",
  button: "#2F4F4F",
  secondaryButton: "#F8F1E4",
  darkerSecondaryColor: "#E5E5E5",
  text: "#3E4444",
  tintColorLight,
  tintColorDark,
  main: "#F45369",
  grey: "#D3D3D3",
  darkGrey: "#808080",
  male: "#4D7CD8",
  female: "#E5518D",
  warning: "#b23b3b",
};
