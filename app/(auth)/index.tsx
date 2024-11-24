import { View, Text } from "react-native";
import { Redirect } from "expo-router";

const page = () => {
  return <Redirect href="../(auth)/(tabs)/home" />;
};

export default page;
