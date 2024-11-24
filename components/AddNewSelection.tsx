import { Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddNewSelection = ({ option, value, onChange }: any) => {
  interface Option {
    id: number;
    icon?: keyof typeof Ionicons.glyphMap;
    value: string;
  }

  interface Props {
    option: Option;
    size: number;
    color: string;
  }

  const IconComponent: React.FC<Props> = ({ option, size, color }) => {
    return (
      <Ionicons
        name={option.icon}
        size={size+5}
        color={color}
        style={{
          // backgroundColor: "red",
          borderRadius: 100,
          paddingRight: 5,
          borderColor: color,
          borderWidth: 1,
        }}
      />
    );
  };
  return (
    <Pressable
      key={option.id}
      style={{
        flexDirection: "row",
        alignItems: "center",
        // gap: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#0000003d",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 5,
        flex: 1,
        backgroundColor: value === option.id ? "#0a7ea4" : "#fff",
      }}
      onPress={() => onChange(option.id)}
    >
      <IconComponent
        option={option}
        size={15}
        color={value === option.id ? "#fff" : "#000000a6"}
        key={option.id}
      />
      <Text
        style={{
          color: value === option.id ? "#fff" : "#000000a6",
          fontSize: 15,
          fontWeight: value === option.id ? "bold" : "normal",
        }}
      >
        {option.value}
      </Text>
    </Pressable>
  );
};

export default AddNewSelection;
