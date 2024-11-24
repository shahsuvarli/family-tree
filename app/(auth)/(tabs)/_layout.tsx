import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        // tabBarActiveTintColor: Colors.tintColorLight,
        // headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor: Colors.background,
          borderBottomColor: "red",
          // height: 170,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: () => (
            <Octicons name="home" size={30} color={Colors.button} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-new"
        options={{
          title: "New person",
          headerTitle: "New person",
          tabBarIcon: () => (
            <Feather name="plus-square" color={Colors.button} size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "",
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons
              name="person-circle-outline"
              size={35}
              color={Colors.button}
            />
          ),
          tabBarItemStyle: {
            backgroundColor: Colors.background,
          },
          tabBarLabelStyle: {
            color: Colors.button,
          },
        }}
      />
    </Tabs>
  );
}
