import { Colors } from "@/constants/Colors";
import { View, Text, Image, StyleSheet } from "react-native";

const WelcomeBox = () => {
  return (
    <View style={styles.welcomeBox}>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeTitle}>Welcome!</Text>
        <Text style={styles.welcomeSubtitle}>
          Feel free to add all your people!
        </Text>
      </View>
      <Image
        source={require("@/assets/images/family-2.png")}
        style={styles.welcomeImage}
      />
    </View>
  );
};

export default WelcomeBox;

const styles = StyleSheet.create({
  welcomeBox: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: Colors.grey,
    padding: 20,
    marginTop: 10,
    gap: 10,
  },
  welcomeTextContainer: {
    flexDirection: "column",
    gap: 10,
    width: "55%",
  },
  welcomeTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.button,
  },
  welcomeSubtitle: {
    fontSize: 17,
    color: Colors.button,
  },
  welcomeImage: {
    width: 150,
    height: 100,
    borderRadius: 20,
    opacity: 0.8,
  },
});
