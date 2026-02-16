"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function useHandleUpdate() {
  const router = useRouter(); // ✅ Hook yahan top level pe

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const id = formData.get("id");
    const amount = formData.get("amount");
    const status = formData.get("status");

    const { error } = await supabase
      .from("appointment")
      .update({
        amount,
        status,
      })
      .eq("id", id);

    if (!error) {
      alert("Updated successfully");
      router.push("/dashboard");   // ✅ Correct redirect
      router.refresh();            // optional: refresh data
    }
  };
 return handleUpdate;
}
