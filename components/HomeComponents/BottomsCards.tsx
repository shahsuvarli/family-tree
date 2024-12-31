import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { results } from "@/assets/data/home-page-cards";
import { useSession } from "@/app/ctx";
import { Result } from "@/types";

const BottomsCards = () => {
  const { session } = useSession();
  return (
    <View style={styles.gridContainer}>
      {results.map((item: Result) => (
        <Pressable
          style={styles.gridCardContainer}
          onPress={() =>
            router.push({ pathname: item.route, params: { id: session } })
          }
          key={item.id}
        >
          <LinearGradient
            colors={item.colors}
            style={styles.gridItem}
            start={{ x: 0, y: 0 }}
            end={{ x: 2, y: -2 }}
          >
            <View style={styles.gridItemTop}>
              <Image source={item.image} style={styles.gridItemImage} />
            </View>
            <View style={styles.gridItemBottom}>
              <Text style={styles.gridItemText}>{item.title}</Text>
            </View>
          </LinearGradient>
        </Pressable>
      ))}
    </View>
  );
};

export default BottomsCards;

const styles = StyleSheet.create({
  gridContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    flex: 2,
    marginTop: 10,
    width: "100%",
    gap: 7,
    borderRadius: 20,
  },
  gridCardContainer: {
    flexBasis: "49%",
  },
  gridItem: {
    flexDirection: "column",
    padding: 10,
    borderRadius: 20,
    height: 110,
    gap: 10,
  },

  gridItemTop: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  gridItemBottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingLeft: 7,
  },
  gridItemImage: {
    width: 50,
    height: 50,
  },
  gridItemText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
});
