// app/actions.ts
"use server"

import { supabase } from "@/lib/supabase";

export default async function bookAppointment(formData: FormData) {
  // Extract data
  const appointmentdata = {
    name: formData.get("name"),
    email: formData.get("email"),
    service: formData.get("service"),
    dob: formData.get("dob"),
    slot: formData.get("time"),
    notes: formData.get("notes"),
    date: formData.get("date")
  };

  const {data , error} = await supabase.from("appointment").insert(appointmentdata)

  if(error){
    throw new Error(error.message)
  }

//   else{
//     return("appointment created");
//   }


  // In a real app, you would use revalidatePath('/') or redirect('/')
  return { success: true, message: "Appointment requested successfully!" };
}