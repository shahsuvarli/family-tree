import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/db";
import PersonLine from "@/components/PersonLine";

const Page = () => {
  const [data, setData] = useState<any>(null);
  const fetchData = async () => {
    const { data } = await supabase
      .from("people")
      .select("*")
      .order("created_at", { ascending: false });
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{ padding: 20 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PersonLine item={item} />}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
