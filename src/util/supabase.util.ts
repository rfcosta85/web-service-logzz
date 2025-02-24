import { createClient } from "@supabase/supabase-js";
import  dotenv from "dotenv";

dotenv.config();

const supabaseUrl= process.env.SUPABASE_URL;
const supabaseAnnonKey= process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnnonKey) {
    throw new Error("Env variables of supabase not defined")
}
export const supabase = createClient(supabaseUrl, supabaseAnnonKey)
