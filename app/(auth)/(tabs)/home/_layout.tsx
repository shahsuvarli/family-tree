import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          gestureDirection: "horizontal",
        }}
      />

      <Stack.Screen
        name="edit-person"
        options={{
          title: "Edit",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
