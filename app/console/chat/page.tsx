import ChatShell from "./ChatShell";
import { createClient } from "@/lib/supabase/server";

export default async function ChatPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return <ChatShell initialConversations={[]} />;
  }

  const { data: myConversations } = await supabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("user_id", user.id);

  const ids =
    myConversations?.map((c: any) => c.conversation_id).filter(Boolean) ?? [];

  if (ids.length === 0) {
    return <ChatShell initialConversations={[]} />;
  }

  const { data: subdata } = await supabase
    .from("conversations")
    .select(
      `
        id,
        type,
        subscription_posts ( title ),
        conversation_participants (
          user_id,
          profiles( name )
        )
      `,
    )
    .in("id", ids);

  const initialConversations =
    subdata?.map((item: any) => {
      if (item.type === "direct") {
        const otherUser = item.conversation_participants?.find(
          (p: any) => p.user_id !== user.id,
        );

        return {
          conversation_id: item.id,
          conversation_type: item.type,
          conversation_name: otherUser?.profiles?.name ?? "Unknown user",
        };
      }

      return {
        conversation_id: item.id,
        conversation_type: item.type,
        conversation_name: item.subscription_posts?.title ?? "Group",
      };
    }) ?? [];

  return <ChatShell initialConversations={initialConversations} />;
}
