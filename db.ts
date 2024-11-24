import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL: any = process.env.REACT_NATIVE_SUPABASE_URL;
const SUPABASE_ANON_KEY: any = process.env.REACT_NATIVE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
