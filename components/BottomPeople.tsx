import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import PersonLineAdd from "./PersonLineAdd";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/db";
import { useSession } from "@/app/ctx";
import Toast from "react-native-toast-message";
import { PersonType, SectionType } from "@/types";

interface BottomPeopleProps {
  section: SectionType;
  person_id: string;
  handleClosePress: () => void;
}

const BottomPeople = ({
  section,
  person_id,
  handleClosePress,
}: BottomPeopleProps) => {
  const { session } = useSession();
  const [data, setData] = useState<PersonType[]>([]);
  const [search, setSearch] = useState("");
  const fetchData = async (text: string = "") => {
    const { data, error } = await supabase
      .from("people")
      .select("*")
      .filter("user_id", "eq", session)
      .order("created_at", { ascending: false })
      .or(`name.ilike.%${text}%,surname.ilike.%${text}%`);
    setData(data || []);

    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to fetch data",
        position: "bottom",
        bottomOffset: 50,
      });
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData(search);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          add {section?.title?.toLowerCase()}
        </Text>
        <TextInput
          placeholder="Search"
          style={styles.textInput}
          autoCorrect={false}
          placeholderTextColor={Colors.darkGrey}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <PersonLineAdd
            item={item}
            section={section}
            person_id={person_id}
            handleClosePress={handleClosePress}
            fetchData={fetchData}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
    </View>
  );
};

export default BottomPeople;

const styles = StyleSheet.create({
  headerContainer: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkerSecondaryColor,
    padding: 7,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
  },
  headerText: {
    fontSize: 17,
  },
  textInput: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.darkerSecondaryColor,
  },
  flatList: {
    width: "100%",
    paddingHorizontal: 10,
  },
});
