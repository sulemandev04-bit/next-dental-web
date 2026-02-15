"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function updateAmount(formData:FormData) {
 
  const id = formData.get("id");
  const amount = formData.get("amount");
  const status = formData.get("status");

  await supabase
    .from("appointment")
    .update({
      amount: amount,
      status: status,
    })
    .eq("id", id);

  redirect("/addAmount");
}
