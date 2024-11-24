import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { supabase } from "@/db";
import { useSession } from "@/app/ctx";

export default function Page() {
  const { session } = useSession();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      birthDate: "",
      gender: 1,
      maritalStatus: 1,
      life: 1,
      notes: "",
    },
  });
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("user")
      .select("name, surname")
      .filter("uid", "eq", session)
      .single();
    if (data) {
      reset({
        name: data.name || "",
        surname: data.surname || "",
      });
    }

    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        position: "bottom",
        bottomOffset: 50,
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (values: any) => {
    const { data, error } = await supabase
      .from("user")
      .update({
        name: values.name,
        surname: values.surname,
      })
      .eq("uid", session)
      .select("name, surname")
      .single();

    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while adding the person",
        position: "bottom",
        bottomOffset: 100,
        swipeable: true,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: `${data.name} ${data.surname} updated successfully`,
        position: "bottom",
        bottomOffset: 100,
        swipeable: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.mainContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <View style={styles.inputLabelContainer}>
                  <Text style={styles.inputText}>Name</Text>
                  {errors.name && (
                    <Text style={styles.errorText}>*required.</Text>
                  )}
                </View>

                <View style={styles.inputWithIconContainer}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={styles.iconColor.color}
                  />
                  <TextInput
                    style={styles.inputField}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your name"
                  />
                </View>
              </View>
            )}
            name="name"
            rules={{ required: true }}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <View style={styles.inputLabelContainer}>
                  <Text style={styles.inputText}>Surname</Text>
                  {errors.surname && (
                    <Text style={styles.errorText}>*required.</Text>
                  )}
                </View>

                <View style={styles.inputWithIconContainer}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={styles.iconColor.color}
                  />
                  <TextInput
                    style={styles.inputField}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter the surname"
                  />
                </View>
              </View>
            )}
            name="surname"
            rules={{ required: false }}
          />
        </ScrollView>
        <Pressable style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.saveButtonText}>Update</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    flex: 1,
    flexDirection: "column",
    gap: 20,
    paddingBottom: 27,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: Colors.button,
    padding: 10,
  },
  scrollViewContainer: {
    backgroundColor: "#fff",
    flexDirection: "column",
    borderRadius: 10,
    gap: 0,
  },
  inputContainer: {
    padding: 7,
    borderRadius: 5,
    flexDirection: "column",
    gap: 10,
  },
  inputLabelContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  inputText: {
    color: "#000000a6",
    fontSize: 17,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  inputWithIconContainer: {
    flexDirection: "row",
    gap: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0000003d",
    borderStyle: "solid",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  iconColor: {
    color: "#0000005a",
  },
  inputField: {
    fontSize: 17,
    paddingVertical: 10,
    flex: 1,
    height: 45,
  },
  dateText: {
    fontSize: 17,
    paddingVertical: 3,
    color: "#000000a6",
  },
  datePicker: {
    backgroundColor: "#fff",
    height: 150,
  },
  datePickerButtonsContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    padding: 10,
  },
  datePickerButton: {
    backgroundColor: "#0a7ea4",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  datePickerButtonText: {
    color: "#fff",
    fontSize: 17,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 5,
    flex: 1,
    justifyContent: "space-between",
  },
  notesInput: {
    fontSize: 17,
    height: 100,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#0000003d",
    borderRadius: 5,
    padding: 10,
  },
  saveButton: {
    backgroundColor: Colors.button,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
