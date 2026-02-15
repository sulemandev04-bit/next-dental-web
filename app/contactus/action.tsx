import { supabase } from "@/lib/supabase";

export default async function contactAction(formData: FormData) {

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const number = formData.get("number");
    const message = formData.get("message") as string;

    const { data, error:contactError } = await supabase
    .from('message')
    .insert([
        { name: name, email: email , number: number , message: message },
    ])
    .select()


    if(contactError){
        alert(contactError.message)
    }

    else{
        alert("message send successfully")
    }



 
}
          