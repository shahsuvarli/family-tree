import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { supabase } from "@/db";
import { useIsFocused } from "@react-navigation/native";
import { useSession } from "@/app/ctx";
import { format } from "date-fns";
import { router } from "expo-router";

interface UserType {
  name: string;
  surname: string;
  email: string;
  people_added: number;
  family_members: number;
  created_at: string;
}

const Page = () => {
  const [user, setUser] = useState<UserType>();
  const image = "https://avatars.githubusercontent.com/u/46631807?v=4";
  const is_focused = useIsFocused();
  const { session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("user")
          .select("*")
          .eq("uid", session)
          .single();
        if (!error) {
          setUser({
            ...data,
            created_at: format(data.created_at, "dd/MM/yyyy"),
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [is_focused]);

  if (!user) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.button}
        style={styles.activityIndicator}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Header view */}
        <View style={styles.headerContentContainer}>
          <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: image,
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.userInfoContainer}>
              <Text style={styles.userName}>
                {user?.name} {user?.surname}
              </Text>
              <Text style={styles.userJoinDate}>
                joined on {user?.created_at}
              </Text>
            </View>
          </View>
          <View style={styles.userEmailContainer}>
            <View style={styles.userEmailRow}>
              <MaterialCommunityIcons
                name="email-outline"
                size={30}
                color="#808080"
              />
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
        </View>

        {/* Cards view */}
        <View style={styles.cardsContainer}>
          <View style={styles.cardItemContainer}>
            <Text style={styles.cardTitle}>{user?.people_added}</Text>
            <Text style={styles.cardSubtitle}>people added</Text>
          </View>
          <View style={styles.cardItemContainer}>
            <Text style={styles.cardTitle}>{user?.family_members}</Text>
            <Text style={styles.cardSubtitle}>family members</Text>
          </View>
        </View>

        {/* Body view */}
        <View style={styles.bodyContainer}>
          <Text style={styles.settingsTitle}>Settings</Text>
          <View style={styles.separator} />
          <FlatList
            data={[{ id: 1, name: "Recently added" }]}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push("/(auth)/(other)/recently-added")}
                style={styles.listItem}
              >
                <Text style={styles.listItemText}>{item.name}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={Colors.darkGrey}
                />
              </Pressable>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 20,
    backgroundColor: "#fff",
    flexDirection: "column",
    gap: 20,
  },
  headerContentContainer: {
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 30,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: Colors.button,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  userInfoContainer: {
    flexDirection: "column",
    gap: 15,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 25,
    color: Colors.button,
  },
  userJoinDate: {
    fontSize: 15,
    color: "#808080",
  },
  userEmailContainer: {
    paddingTop: 15,
    gap: 17,
  },
  userEmailRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  userEmail: {
    color: Colors.darkGrey,
    fontSize: 17,
  },
  cardsContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.grey,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardItemContainer: {
    borderStyle: "solid",
    borderRightColor: Colors.grey,
    borderRightWidth: 1,
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 13,
    gap: 7,
  },
  cardTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: Colors.button,
  },
  cardSubtitle: {
    color: Colors.darkGrey,
    fontSize: 15,
  },
  bodyContainer: {
    paddingHorizontal: 17,
    height: "100%",
  },
  settingsTitle: {
    color: Colors.button,
    fontSize: 15,
    marginBottom: 10,
  },
  separator: {
    borderStyle: "solid",
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  listItem: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    borderStyle: "solid",
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
  },
  listItemText: {
    fontSize: 17,
  },
});
