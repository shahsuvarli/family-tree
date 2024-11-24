import { StyleSheet, ScrollView } from "react-native";
import { useSession } from "@/app/ctx";
import { useEffect, useState } from "react";
import { supabase } from "@/db";
import BottomPCards from "@/components/HomeComponents/BottomsCards";
import WelcomeBox from "@/components/HomeComponents/WelcomeBox";
import TopBarComponent from "@/components/HomeComponents/TopBarComponent";
import BodyComponent from "@/components/HomeComponents/BodyComponent";
import { Colors } from "@/constants/Colors";

export default function page() {
  const { session } = useSession();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchdata = async () => {
      const { data, error } = await supabase
        .from("people")
        .select("id, initials, name, gender, created_at, surname")
        .filter("user_id", "eq", session)
        .order("created_at", { ascending: false })
        .limit(5);
      setData(data);
    };
    fetchdata();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexDirection: "column", gap: 10 }}
    >
      <TopBarComponent />
      <WelcomeBox />
      <BodyComponent />
      <BottomPCards />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 15,
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
  },
  horizontalScrollView: {
    flexDirection: "row",
    marginTop: 15,
    width: "100%",
  },
  horizontalScrollContent: {
    justifyContent: "space-between",
    alignItems: "center",
    gap: 7,
  },
  personButton: {
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  personText: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "500",
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.grey,
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 10,
    borderRadius: 20,
    opacity: 0.3,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.darkerGrey,
  },
});
