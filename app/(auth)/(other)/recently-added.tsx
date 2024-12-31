import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "@/db";
import PersonLine from "@/components/PersonLine";
import { PersonType } from "@/types";

const Page = () => {
  const [data, setData] = useState<PersonType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("people")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
      setError("Failed to fetch data.");
      setData([]);
    } else {
      setData(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? ( // Show a loading indicator
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? ( // Show error message if there's an error
        <Text style={styles.errorText}>{error}</Text>
      ) : data.length === 0 ? ( // Handle empty data case
        <Text style={styles.noDataText}>No data available.</Text>
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={{ padding: 20 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PersonLine item={item} />}
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
