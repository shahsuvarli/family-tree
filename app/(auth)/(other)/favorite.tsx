import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/db";
import PersonLine from "@/components/PersonLine";
import { PersonType } from "@/types";

const Page = () => {
  const [data, setData] = useState<PersonType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("people")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("is_favorite", true);

    if (error) {
      console.error(error.message);
      setError("Failed to fetch data.");
    } else {
      setData(data || []);
    }

    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading && !refreshing ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : data.length === 0 ? (
        <Text style={styles.noDataText}>No favorite people found.</Text>
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={{ padding: 20 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PersonLine item={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "gray",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  noDataText: {
    fontSize: 18,
    color: "gray",
  },
});
