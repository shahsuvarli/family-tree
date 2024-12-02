import { createClient } from "@supabase/supabase-js";
import {
  REACT_NATIVE_SUPABASE_URL,
  REACT_NATIVE_SUPABASE_ANON_KEY,
} from "@env";

export const supabase = createClient(
  REACT_NATIVE_SUPABASE_URL,
  REACT_NATIVE_SUPABASE_ANON_KEY
);
