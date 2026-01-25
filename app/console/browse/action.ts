"use server";
import { createClient } from "@/lib/supabase/server";

export async function joinPool(post_id: string) {
    const supabase = await createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      throw new Error("Unauthorized");
    }
   const member_id = userData.user.id;
   const {data,error} = await supabase.from("subscription_members").select("*")
   .eq("subscription_id",post_id)
   .eq("member_id",member_id)
   console.log("checking member data",data)

   if(data && data.length > 0){
     return {
        success:false,
        message:"You are already a member of this pool"
     }
   }
   
   
   const {data:memberData,error:memberError} = await supabase.from("subscription_members").insert({
    subscription_id:post_id,
    member_id:member_id,
    
   })

   if(memberError){
    return {
        success:false,
        message:"Failed to join pool"
    }
   }
   return {
    success:true,
    message:"Joined pool successfully",
    data:memberData
   }
   
}