import { LinearGradientProps } from "expo-linear-gradient";
import { RelativePathString } from "expo-router";
import { ImageProps } from "react-native";

export interface PersonType {
  created_at: string;
  gender: number;
  id: string;
  initials: string;
  name: string;
  person_id: string;
  relation_type: string;
  relation_type_id: string;
  surname: string;
  dob?: string;
  is_active?: boolean;
  life?: number;
  marital_status?: number;
  notes?: string;
  user_id?: string;
}

export interface FamilyType {
  data: PersonType[];
  title: string;
}

export interface SectionType {
  data: PersonType[];
  id: string;
  section: string;
  title: string;
}

export type ColorsType = {
  [key: string]: string;
};

export interface Result {
  id: number;
  title: string;
  colors: LinearGradientProps["colors"];
  image: ImageProps["source"];
  route: RelativePathString;
}
