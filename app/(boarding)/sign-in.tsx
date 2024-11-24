import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Controller, useForm } from "react-hook-form";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSession } from "../ctx";
import { supabase } from "@/db";

const Page = () => {
  const { signIn } = useSession();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "shahsuvarli.elvin@gmail.com",
      password: "Elvin351",
    },
  });

  const onSubmit = async ({ email, password }: any) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Toast.show({
        type: "error",
        text1: "Invalid credentials",
        text2: "Please check your email and password",
        position: "bottom",
      });
      return;
    }

    const userId = user?.id;
    await AsyncStorage.setItem("family-tree", userId as string);

    signIn(userId);

    Toast.show({
      type: "success",
      text1: "Signed in successfully",
      text2: "Welcome back",
      position: "bottom",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Back!</Text>
      </View>
      <View>
        <View style={{ flexDirection: "column", gap: 20 }}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Ionicons name="mail" size={24} color={Colors.button} />
                <TextInput
                  placeholder="Email"
                  style={styles.inputField}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
              </View>
            )}
            name="email"
            rules={{ required: "Email is required" }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed" size={24} color={Colors.button} />
                <TextInput
                  placeholder="Password"
                  style={styles.inputField}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  maxLength={20}
                />
              </View>
            )}
            name="password"
            rules={{ required: true }}
          />
        </View>
        <Link href="/forgot-password" style={styles.forgotPasswordLink}>
          Forgot password?
        </Link>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.signInButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.signInButtonText}>Sign In</Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={20}
            color="#fff"
            style={{ marginLeft: 5 }}
          />
        </Pressable>
        <View style={styles.signUpLinkContainer}>
          <Text style={styles.signUpLinkText}>Don't have an accoun?</Text>
          <Link href="../sign-up">
            <Text style={styles.signUpLink}>Sign up</Text>
          </Link>
        </View>
      </View>

      <Text style={styles.orContinueText}>or continue with</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.googleSignInButton}
          onPress={() => router.push("../(auth)/(tabs)/home")}
        >
          <Image
            source={require("@/assets/images/google.png")}
            style={{ height: 30, width: 30 }}
          />
          <Text style={styles.googleSignInText}>Google</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: Colors.button,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 30,
    color: Colors.background,
  },
  inputContainer: {
    gap: 10,
    backgroundColor: Colors.grey,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  inputField: {
    fontSize: 17,
    height: 40,
    width: "100%",
  },
  forgotPasswordLink: {
    color: Colors.button,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  signInButton: {
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.button,
    width: "100%",
    height: 50,
  },
  signInButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
  signUpLinkContainer: {
    flexDirection: "row",
    gap: 5,
  },
  signUpLinkText: {
    color: Colors.button,
  },
  signUpLink: {
    color: Colors.button,
    fontWeight: "bold",
  },
  orContinueText: {
    color: Colors.button,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
  },
  googleSignInButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.grey,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  googleSignInText: {
    color: Colors.text,
    fontSize: 20,
  },
});
