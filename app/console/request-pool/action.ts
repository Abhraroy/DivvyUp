"use server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function requestPool(formData: FormData) {
  const supabase = await createClient();
  const {data:{user}} = await supabase.auth.getUser();
  if(!user){
    throw new Error("User not found");
  }
  const poolName = formData.get("poolName") as string;
  const platform = formData.get("platform") as string;
  const applicationLink = formData.get("applicationLink") as string;
  const description = formData.get("description") as string;
  console.log(poolName, platform, applicationLink, description);


    const { data, error } = await supabase
      .from("subscription_posts")
      .insert({
        owner_id: user.id,
        platform: applicationLink,
        title: poolName,
        description: description,
        total_slots: null,
        filled_slots: null,
        price_per_user: null,
        post_type: "REQUEST",
        group_status: "FORMING",
        platform_type: platform,
        expiry_date: null,
      })
      .select("*");
    
    


    if (error) {
      console.error("Error creating pool:", error);
      throw new Error("Failed to create pool");
    }
    console.log(data);
    redirect("/console/browse");
}
