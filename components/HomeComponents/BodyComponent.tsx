import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Image } from "react-native";

const kpis = [
  {
    id: 1,
    image: require("@/assets/images/family-kpi.png"),
    count: 30,
    title: "people",
  },
  {
    id: 2,
    image: require("@/assets/images/relation-kpi.png"),
    count: 30,
    title: "relations",
  },
];

const BodyComponent = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        width: "100%",
        justifyContent: "space-between",
        padding: 3,
        borderRadius: 10,
        marginTop: 10,
      }}
    >
      {kpis.map((item) => (
        <LinearGradient
          colors={["#FF6100", "#fff"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            backgroundColor: "#FF6600",
            borderRadius: 20,
            flex: 1,
            borderStyle: "solid",
            padding: 10,
            justifyContent: "space-evenly",
            flexDirection: "row",
            alignItems: "center",
          }}
          key={item.id}
        >
          <Image
            source={item.image}
            tintColor={"#fff"}
            style={{ width: 35, height: 35 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.recentText}>30</Text>
            <Text style={styles.count}>{item.title}</Text>
          </View>
        </LinearGradient>
      ))}
    </View>
  );
};

export default BodyComponent;

const styles = StyleSheet.create({
  count: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
  },
  recentText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
});
