import { Pressable } from "react-native";
import { router, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function OtherLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="person"
        options={() => ({
          headerShown: true,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Home",
          headerShown: true,
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="favorite"
        options={({ route }: any) => ({
          headerShown: true,
          title: "Favorites",
          headerRight: () => {
            return (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/(auth)/(tabs)/home/edit-person",
                    params: { person_id: route.params.id },
                  })
                }
              >
                <FontAwesome
                  name="pencil-square-o"
                  size={25}
                  color={Colors.button}
                />
              </Pressable>
            );
          },
        })}
      />
      <Stack.Screen
        name="recently-added"
        options={{
          title: "Recently added",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
