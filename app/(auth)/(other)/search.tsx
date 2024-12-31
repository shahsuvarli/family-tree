import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/db";
import { useSession } from "@/app/ctx";
import PersonLine from "@/components/PersonLine";
import { PersonType } from "@/types";

const page = () => {
  const [search, setSearch] = useState<string>("");
  const { session } = useSession();
  const [data, setData] = useState<PersonType[]>();
  const [refreshing, setRefreshing] = useState(false);

  const fetchSearchResults = async (search: string) => {
    setRefreshing(true);
    const { data, error } = await supabase
      .from("people")
      .select("*")
      .filter("user_id", "eq", session)
      .order("created_at", { ascending: false })
      .or(`name.ilike.%${search}%,surname.ilike.%${search}%`);

    setData(data || []);
    setRefreshing(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchResults(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <View
      style={{
        padding: 15,
        flexDirection: "column",
        gap: 15,
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View style={styles.searchButton}>
        <Ionicons name="search" size={30} color={Colors.button} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={(text) => setSearch(text)}
          autoFocus
          keyboardAppearance="light"
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PersonLine item={item} />}
        refreshing={refreshing}
        onRefresh={() => fetchSearchResults(search)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchSearchResults(search)}
          />
        }
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", padding: 20 }}>
            <Ionicons name="search" size={100} color={Colors.button} />
            <Text style={{ color: Colors.button }}>No results found</Text>
          </View>
        )}
      />
    </View>
  );
};

export default page;

const styles = StyleSheet.create({
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.darkerGrey,
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
    padding: 5,
    color: Colors.button,
    paddingVertical: 15,
  },
});
