import { View, SectionList, Text, Pressable, StyleSheet } from "react-native";
import PersonLine from "@/components/PersonLine";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import family_data from "@/assets/data/empty.json";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSession } from "@/app/ctx";
import useFamily from "@/hooks/useFamily";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import BottomPeople from "@/components/BottomPeople";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { supabase } from "@/db";

export default function Person() {
  const { id: person_id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [family, setFamily] = useState<any>([...family_data]);
  const [section, setSection] = useState("");
  const { session } = useSession();
  const [open, setOpen] = useState<Boolean>(false);

  const getUserData = async () => {
    const { data, error } = await supabase
      .from("people")
      .select("id, name, is_favorite")
      .eq("id", person_id)
      .single();

    if (data || !error) {
      // console.log("this happens on getuser data", data);
      // console.log("this happens on getuser data", data);
      // setIsFavorite(data.is_favorite);
      setIsFavorite(() => data.is_favorite);
      // console.log("is favorite", isFavorite);

      navigation.setOptions({
        title: `${data.name}'s family`,
        headerRight: () => {
          return (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 15,
              }}
            >
              <Pressable onPress={handleFavorite}>
                <AntDesign
                  name={isFavorite ? "star" : "staro"}
                  size={30}
                  color={Colors.button}
                />
              </Pressable>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/(auth)/(tabs)/home/edit-person",
                    params: { person_id },
                  })
                }
              >
                <FontAwesome
                  name="pencil-square-o"
                  size={27}
                  color={Colors.button}
                />
              </Pressable>
            </View>
          );
        },
      });
    }
  };

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => {
  //       return (
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             gap: 15,
  //           }}
  //         >
  //           <Pressable onPress={handleFavorite}>
  //             <AntDesign
  //               name={isFavorite ? "star" : "staro"}
  //               size={30}
  //               color={Colors.button}
  //             />
  //           </Pressable>
  //           <Pressable
  //             onPress={() =>
  //               router.push({
  //                 pathname: "/(auth)/(tabs)/home/edit-person",
  //                 params: { person_id },
  //               })
  //             }
  //           >
  //             <FontAwesome
  //               name="pencil-square-o"
  //               size={27}
  //               color={Colors.button}
  //             />
  //           </Pressable>
  //         </View>
  //       );
  //     },
  //   });
  // }, [isFavorite]);

  const handleFavorite = useCallback(async () => {
    // console.log("Pressed hanlde favorite, isfavorite:", isFavorite);

    const { data, error } = await supabase
      .from("people")
      .update({ is_favorite: !isFavorite })
      .eq("id", person_id)
      .select("id, is_favorite")
      .single();
    if (data || !error) {
      // console.log("Favorite updated to", data);
      // setIsFavorite(() => data.is_favorite);
      getUserData();
      // setIsFavorite(data.is_favorite);
    }
  }, [person_id]);

  useEffect(() => {
    // console.log("fetching family");
    async function fetchProfile() {
      const value = await useFamily(session, person_id);
      setFamily(value);
    }

    fetchProfile();
  }, [open]);

  useEffect(() => {
    // console.log("fetching user data");
    getUserData();
  }, []);

  const opacityShareValue = useSharedValue(1);

  const bottomSheetModalRef = useRef<BottomSheet>(null);

  function handlePlusPress(section: any) {
    setOpen(true);
    opacityShareValue.value = withSpring(0.5);
    setSection(section);
    bottomSheetModalRef.current?.expand();
  }

  const handleClose = () => {
    opacityShareValue.value = withSpring(1);
    setOpen(false);
  };

  const handleClosePress = () => {
    bottomSheetModalRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: opacityShareValue }]}>
        <SectionList
          sections={family}
          renderItem={() => {
            return null;
          }}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }: any) => {
            const count = section?.data.length;
            return (
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderTitle}>
                  <Text style={styles.sectionHeaderText}>{section?.title}</Text>
                  <Pressable onPress={() => handlePlusPress(section)}>
                    <Ionicons name="add" size={27} color={Colors.darkGrey} />
                  </Pressable>
                </View>
                <View>
                  {count ? (
                    section.data.map((item: any) => {
                      return (
                        <PersonLine
                          item={item}
                          key={item.id}
                          person_id={person_id}
                        />
                      );
                    })
                  ) : (
                    <Text style={styles.noItemsText}>
                      &nbsp; no {section?.title.toLowerCase()} found
                    </Text>
                  )}
                </View>
              </View>
            );
          }}
          stickyHeaderHiddenOnScroll={true}
          keyExtractor={(item, index) => index.toString()}
        />
      </Animated.View>

      {open && (
        <BottomSheet
          ref={bottomSheetModalRef}
          snapPoints={["90%"]}
          style={styles.bottomSheetModalStyle}
          enablePanDownToClose
          onClose={handleClose}
          backgroundStyle={styles.backdrop}
          handleStyle={{ backgroundColor: "transparent", opacity: 0.5 }}
          handleIndicatorStyle={{ backgroundColor: Colors.button }}
        >
          <BottomSheetView style={styles.contentContainer}>
            <BottomPeople
              section={section}
              person_id={person_id}
              handleClosePress={handleClosePress}
            />
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: "#fff",
    padding: 10,
    flex: 1,
  },
  sectionHeader: {
    padding: 10,
    gap: 5,
  },
  sectionHeaderTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeaderText: {
    fontSize: 17,
    color: Colors.darkGrey,
  },
  noItemsText: {
    color: Colors.darkGrey,
    fontSize: 15,
  },
  bottomSheetModalStyle: {
    backgroundColor: "transparent",
  },
  backdrop: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10.84,
  },
  contentContainer: {
    alignItems: "center",
    height: "100%",
    overflow: "hidden",
  },
});
