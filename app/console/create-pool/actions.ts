"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createPool(formData: FormData) {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    throw new Error("Unauthorized");
  }
  console.log(formData)

  const title = formData.get("poolName") as string;
  const platform_type = formData.get("platform") as string;
  const applicationLink = formData.get("applicationLink") as string;
  const totalPrice = parseFloat(formData.get("totalPrice") as string)||null;
  const totalSlots = parseInt(formData.get("totalSlots") as string)||null;
  const description = formData.get("description") as string;
  const expiryDate = formData.get("expiryDate") as string;
  const ownDetails = formData.get("ownDetails") as string;
  const postType = ownDetails?"OFFERING":"GROUP"; // Defaultting to OFFERING for "Create Pool"
  const groupStatus = "FORMING";
  let pricePerUser = null;

  // Calculate price per user (simple division for now)
  // Assuming the owner takes a slot, or the slots are "available slots"
  // Let's assume 'totalSlots' is what they entered as "Available Slots"
  // So price per person = Total / (Available + 1 for owner)?
  // Or just Total / Available if they want to split it that way.
  // The design shows "Total Price" and "Available Slots".
  // Let's just do Total / (Slots + 1) to be safe for a "pool", or just store the raw values.

  if(ownDetails === "on" && totalPrice && totalSlots){
    pricePerUser = totalPrice > 0 && totalSlots > 0 ? (totalPrice / (totalSlots + 1)) : null;
  }


  const { data,error } = await supabase.from("subscription_posts").insert({
    owner_id: userData.user.id,
    platform:applicationLink,
    title: title,
    description:description,
    total_slots: totalSlots,
    filled_slots: 0,
    price_per_user: pricePerUser,
    post_type: postType,
    group_status: groupStatus,
    platform_type: platform_type,
    expiry_date:expiryDate 
  }).select("*");

  if (error) {
    console.error("Error creating pool:", error);
    throw new Error("Failed to create pool");
  }
  console.log(data)
   

  console.log("Creating conversation")
  console.log(data[0].id)

  const payload = {
    subscription_id:`${data[0].id}`,
    type:"group"
  }

  console.log(payload)


  const {data:subscriptionMember,error:subscriptionMemberError} = await supabase.from("subscription_members").insert({
    subscription_id:`${data[0].id}`,
    member_id:userData.user.id,
  }).select("*");
  console.log(subscriptionMember)
  if(subscriptionMemberError){
    console.error("Error creating subscription member:", subscriptionMemberError);
    throw new Error("Failed to create subscription member");
  }



  const {data:conversation,error:conversationError} = await supabase.from("conversations").insert(payload).select("*");

  if(conversationError){
    console.error("Error creating conversation:", conversationError);
    throw new Error("Failed to create conversation");
  }

  console.log(conversation)

  const {data:conversationParticipant ,error:conversationParticipantError} = await supabase.from("conversation_participants").insert({
    conversation_id:conversation[0].id,
    user_id:userData.user.id,
  }).select();

  if(conversationParticipantError){
    console.error("Error creating conversation participant:", conversationParticipantError);
    throw new Error("Failed to create conversation participant");
  }

  console.log("conversationParticipant",conversationParticipant)

   redirect("/console/browse");
}



