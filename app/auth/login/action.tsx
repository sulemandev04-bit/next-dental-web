// app/login/actions.ts
"use server"

import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation'

export default async function handleLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const {data , error} = await supabase.auth.signInWithPassword({
    email,
    password
  })

  // Logic: Check database for user
  if (error) {
     return { success: false, error: "Invalid email or password." };
  } else {
    redirect("/dashboard") 
  }
}