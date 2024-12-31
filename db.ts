import { createClient } from "@supabase/supabase-js";
import {
  REACT_NATIVE_SUPABASE_URL,
  REACT_NATIVE_SUPABASE_ANON_KEY,
} from "@env";

export const supabase = createClient(
  "https://ccngxugxkbnetjpbwqlr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjbmd4dWd4a2JuZXRqcGJ3cWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxNDcxOTEsImV4cCI6MjA0NTcyMzE5MX0.ombrkGyaFIuxsbe_sdk5v36kG_U0txzDxzGHxiRI9_c"
);
