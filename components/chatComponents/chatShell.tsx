"use client";

import ChatSidebar from "@/components/chatComponents/chatSidebar";
import ChatWindow from "@/components/chatComponents/chatWindow";
import { useChatStore } from "@/lib/zustand/chatStore";

export default function ChatShell({ propObjectArr }: any) {
  const { conversation_id } = useChatStore();
  console.log("conversation_id", conversation_id);

  return (
    <>
    <ChatSidebar className={`md:flex w-full border-r-0 ${conversation_id ? "hidden" : "block"}`} propObjectArr={propObjectArr} />
    <ChatWindow className={`md:flex w-full ${conversation_id ? "block" : "hidden"}`} />
    </>
  );
}
