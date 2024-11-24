import { Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
// import { router } from "expo-router";

const TopBarComponent = () => {
  const [greeting, setGreeting] = useState("");
  const router =useRouter();

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);
  return (
    <>
      <Text style={styles.greetingText}>Hi, Elvin!</Text>
      <Text style={styles.morningText}>{greeting}</Text>
      <Pressable
        style={styles.searchButton}
        onPress={() => router.push("/(auth)/(other)/search")}
      >
        <Ionicons name="search" size={30} color={Colors.button} />
        <Text style={{ color: Colors.button, fontSize: 17 }}>My family</Text>
      </Pressable>
    </>
  );
};

export default TopBarComponent;

const styles = StyleSheet.create({
  greetingText: {
    fontSize: 33,
    color: Colors.button,
    fontWeight: "bold",
  },
  morningText: {
    fontSize: 17,
    color: Colors.darkGrey,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.grey,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 10,
    borderRadius: 20,
    opacity: 0.3,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.darkerGrey,
  },
});
