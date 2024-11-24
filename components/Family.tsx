import { View, Text, SectionList } from "react-native";
import { Colors } from "@/constants/Colors";

const Family = () => {
  return (
    <View>
      <SectionList
        style={{ backgroundColor: Colors.grey, padding: 10 }}
        sections={[
          { title: "Parents", data: ["Devin"] },
          {
            title: "Siblings",
            data: [
              "Jackson",
              "James",
              "Jillian",
              "Jimmy",
              "Joel",
              "John",
              "Julie",
            ],
          },
          {
            title: "children",
            data: ["Dorothy", "Dylan", "Dawn", "Dustin"],
          },
          {
            title: "Spouse",
            data: ["Dorothy", "Dylan", "Dawn", "Dustin"],
          },
        ]}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: Colors.background, padding: 10 }}>
            <Text style={{ fontSize: 17 }}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 15 }}>{section.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

export default Family;
