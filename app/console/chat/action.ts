"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createDirectConvo(other_user_id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const { data, error } = await supabase.rpc("create_direct_conversation", {
    other_user: other_user_id,
  });
  console.log(data);
  if (error) {
    console.error("Error creating conversation:", error);
    throw new Error("Failed to create conversation");
  }
  redirect(`/console/chat`);
}
