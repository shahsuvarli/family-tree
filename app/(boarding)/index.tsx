import { View, Text, Pressable, Image } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const Page = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/family.png")}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Connecting Generations</Text>
        <Text style={styles.subtitle}>Unveiling Legacies</Text>
      </View>
      <View>
        <Pressable
          onPress={() => router.push("/(boarding)/sign-in")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("./sign-up")}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  image: {
    width: 300,
    height: 350,
    alignSelf: "center",
  },
  titleContainer: {
    marginVertical: 20,
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.button,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.secondaryButton,
    textAlign: "right",
  },
  button: {
    backgroundColor: Colors.button,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: Colors.secondaryButton,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: Colors.button,
    fontWeight: "bold",
    fontSize: 16,
  },
});
