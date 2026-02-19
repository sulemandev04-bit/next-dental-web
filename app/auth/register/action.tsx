// app/register/actions.ts
"use server"

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function handleRegistration(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Basic Server-side Validation
  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match." };
  }

  const{data , error} = await supabase.auth.signUp({
    email,
    password
  })
  redirect("/dashboard")
  
  
}