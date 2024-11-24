import { Ionicons } from "@expo/vector-icons";
import { Redirect, router, Stack } from "expo-router";
import { ActivityIndicator, Pressable } from "react-native";
import { useSession } from "../ctx";

const AuthLayout = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (session) {
    return <Redirect href="../(auth)/(tabs)/home" />;
  }

  return (
    <Stack
      screenOptions={{
        // headerShadowVisible: true,
        // headerTransparent: true,
        // headerBlurEffect: "dark",
        // headerLargeTitle: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-in"
        options={{
          headerTitle: "Login",
          headerLeft: () => (
            <Pressable
              style={{
                backgroundColor: "#9f9c9f26",
                padding: 7,
                borderRadius: 10,
              }}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={25} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerTitle: "Sign Up",
          headerLeft: () => (
            <Pressable
              style={{
                backgroundColor: "#9f9c9f26",
                padding: 7,
                borderRadius: 10,
              }}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={25} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
};

export default AuthLayout;
