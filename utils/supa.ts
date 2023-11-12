import { supabase } from "../config/initSupabase";

export const verifyUserEmail = async (email: string) => {
  const { data } = await supabase
    .from("users")
    .select("name")
    .eq("email", email)
    .single();

  return data;
};

export const verifyUserEmailAndPassword = async (email: string, password: string) => {
    const { data } = await supabase
      .from("users")
      .select("name")
      .eq("email", email)
      .eq('password', password)
      .single();
  
    return data;
  };
  
