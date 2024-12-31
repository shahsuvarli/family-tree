import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useSession } from "@/app/ctx";
import { supabase } from "@/db";
import Toast from "react-native-toast-message";
import { PersonType, SectionType } from "@/types";

interface PersonLineAddProps {
  item: PersonType;
  section: SectionType;
  person_id: string;
  handleClosePress: () => void;
  fetchData: () => void;
}

const PersonLineAdd = ({
  item,
  section,
  person_id,
  handleClosePress,
  fetchData,
}: PersonLineAddProps) => {
  const { session } = useSession();
  const created_at = new Date(item.created_at).toLocaleDateString();

  const handleAddPerson = async () => {
    const { error } = await supabase.from("relation").insert([
      {
        user_id: session,
        p1_id: person_id,
        relation_type_id: section.id,
        p2_id: item.id,
        native: true,
      },
    ]);
    if (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        position: "bottom",
        bottomOffset: 50,
      });
    } else {
      handleClosePress();
      fetchData();
      Toast.show({
        type: "success",
        text1: "Person added to family",
        text2: "Person added to family",
        position: "bottom",
        bottomOffset: 50,
      });
    }
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        gap: 20,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "space-between",
        borderStyle: "solid",
        borderBottomColor: Colors.grey,
        borderBottomWidth: 0.3,
        width: "100%",
      }}
    >
      <View
        style={{
          height: 50,
          borderRadius: 50,
          flexDirection: "row",
          gap: 15,
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: item.gender === 1 ? Colors.male : Colors.female,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            {item.initials}
          </Text>
        </View>
        <View style={{ flexDirection: "column", gap: 7 }}>
          <Text style={{ fontSize: 20, color: Colors.button }}>
            {item.name} {item.surname}
          </Text>
          <Text style={{ color: Colors.darkGrey }}>{created_at}</Text>
        </View>
      </View>

      <Pressable onPress={() => handleAddPerson()}>
        <Ionicons
          name="add"
          size={27}
          color={Colors.button}
          style={{
            marginRight: 20,
          }}
        />
      </Pressable>
    </TouchableOpacity>
  );
};

export default PersonLineAdd;
