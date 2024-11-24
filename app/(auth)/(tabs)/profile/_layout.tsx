import { Pressable } from "react-native";
import { router, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useSession } from "@/app/ctx";
import { Colors } from "@/constants/Colors";

const ProfileLayout = () => {
  const { signOut } = useSession();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.push("/profile/edit-profile")}>
              <FontAwesome
                name="pencil-square-o"
                size={25}
                color={Colors.button}
                style={{ marginLeft: 5 }}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={signOut}>
              <FontAwesome
                name="sign-out"
                size={27}
                color={Colors.warning}
                style={{ marginRight: 5 }}
              />
            </Pressable>
          ),
        }}
      />
      {/* <Stack.Screen
        name="recently-added"
        options={{ headerShown: true, title: "Recently added" }}
      /> */}
      <Stack.Screen
        name="edit-profile"
        options={{ headerShown: true, title: "Edit profile" }}
      />
    </Stack>
  );
};

export default ProfileLayout;
