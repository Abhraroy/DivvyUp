"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function updateReputation(userId: string, change: number) {
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("reputation")
    .eq("user_id", userId)
    .single();

  const currentReputation = profile?.reputation || 0;
  const newReputation = currentReputation + change;
  console.log("Current reputation:", currentReputation);
  console.log("New reputation:", newReputation);

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .update({ reputation: newReputation })
    .eq("user_id", userId)
    .select("reputation")
    .single();

  console.log("Updated reputation:", data?.reputation);

  if (error) {
    console.error("Error updating reputation:", error);
    throw new Error("Failed to update reputation");
  }
  console.log("Reputation updated successfully.");
  return newReputation;
}

export async function reportUser(
  reportedUserId: string,
  reason: string,
  details?: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to report a user.");
  }

  // Check if already reported
  const { data: existingReport } = await supabase
    .from("reports")
    .select("id")
    .eq("reporter_id", user.id)
    .eq("reported_id", reportedUserId)
    .single();

  if (existingReport) {
    return {
      success: false,
      message: "You have already reported this user.",
    };
  }

  // Insert report into 'reports' table
  const { error } = await supabase.from("report").insert({
    reporter_id: user.id,
    reported_id: reportedUserId,
    reason,
    details,
  });

  if (error) {
    console.error("Error reporting user:", error);
    return {
      success: false,
      message: "Failed to submit report. Please try again.",
    };
  }

  try {
    await updateReputation(reportedUserId, -50);
  } catch (err) {
    console.error("Failed to update reputation on report:", err);
    // We don't rollback the report here, but in a real system we might want a transaction
  }

  return { success: true, message: "Report submitted successfully." };
}

export async function promoteUser(userId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to promote a user.");
  }

  // Check if already promoted
  const { data: existingPromotion } = await supabase
    .from("promote")
    .select("id")
    .eq("promoter_id", user.id)
    .eq("promoted_id", userId)
    .single();

  if (existingPromotion) {
    return {
      success: false,
      message: "You have already promoted this user.",
    };
  }

  // Insert promotion into 'promotions' table
  const { error } = await supabase.from("promote").insert({
    promoter_id: user.id,
    promoted_id: userId,
  });

  if (error) {
    console.error("Error promoting user:", error);
    return {
      success: false,
      message: "Failed to promote user. Please try again.",
    };
  }

  try {
    await updateReputation(userId, 20);
  } catch (err) {
    console.error("Failed to update reputation on promote:", err);
  }

  return { success: true, message: "User promoted successfully." };
}
