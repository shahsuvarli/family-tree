import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const page = () => {
  const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];
  return (
    <View>
      <PieChart
        data={data}
        focusOnPress
        showText
        textColor="black"
        showValuesAsLabels
      />
    </View>
  );
};

export default page;

const styles = StyleSheet.create({});
