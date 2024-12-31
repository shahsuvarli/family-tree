import { View, SectionList, Text, Pressable, StyleSheet } from "react-native";
import PersonLine from "@/components/PersonLine";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useSession } from "@/app/ctx";
import useFamily from "@/hooks/useFamily";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import BottomPeople from "@/components/BottomPeople";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { supabase } from "@/db";
import { FamilyType, PersonType, SectionType } from "@/types";

export default function Person() {
  const { id: person_id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [family, setFamily] = useState<FamilyType[]>();
  const [section, setSection] = useState<SectionType>();
  const { session } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  const getUserData = async () => {
    const { data, error } = await supabase
      .from("people")
      .select("id, name, is_favorite")
      .eq("id", person_id)
      .single();

    if (data || !error) {
      setIsFavorite(() => data.is_favorite);
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

  const handleFavorite = useCallback(async () => {
    const { data, error } = await supabase
      .from("people")
      .update({ is_favorite: !isFavorite })
      .eq("id", person_id)
      .select("id, is_favorite")
      .single();
    if (data || !error) {
      getUserData();
    }
  }, [person_id]);

  useEffect(() => {
    async function fetchProfile() {
      const value = await useFamily(session, person_id);
      setFamily(value);
    }

    fetchProfile();
  }, [open]);

  useEffect(() => {
    getUserData();
  }, []);

  const opacityShareValue = useSharedValue(1);

  const bottomSheetModalRef = useRef<BottomSheet>(null);

  function handlePlusPress(section: SectionType): void {
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

  if (!family) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: opacityShareValue }]}>
        <SectionList
          sections={family}
          renderItem={() => {
            return null;
          }}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section }: { section: FamilyType }) => {
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
                    section.data.map((item: PersonType) => {
                      return <PersonLine item={item} key={item.id} />;
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
          keyExtractor={(item) => item.id}
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
