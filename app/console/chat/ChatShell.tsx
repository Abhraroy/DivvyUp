"use client";

import { useEffect, useState } from "react";
import ChatSidebar from "@/components/chatComponents/chatSidebar";
import ChatWindow from "@/components/chatComponents/chatWindow";
import { useChatStore } from "@/lib/zustand/chatStore";

export type ConversationListItem = {
  conversation_id: string;
  conversation_type: string;
  conversation_name: string;
};

export default function ChatShell({
  initialConversations,
}: {
  initialConversations: ConversationListItem[];
}) {
  const [mobilePane, setMobilePane] = useState<"list" | "chat">("list");

  return (
    <div className="relative flex h-full w-full min-h-0 overflow-hidden md:flex-row">
      {/* Sidebar (always mounted; slides on mobile) */}
      <div
        className={[
          "absolute inset-0 min-h-0 transition-transform duration-200",
          "md:static md:inset-auto md:w-1/5 md:translate-x-0",
          mobilePane === "list"
            ? "translate-x-0"
            : "-translate-x-full pointer-events-none md:pointer-events-auto",
        ].join(" ")}
      >
        <ChatSidebar
          propObjectArr={initialConversations}
          className="h-full w-full"
          onSelectConversation={() => setMobilePane("chat")}
        />
      </div>

      {/* Chat window (always mounted; slides on mobile) */}
      <div
        className={[
          "absolute inset-0 min-h-0 transition-transform duration-200",
          "md:static md:inset-auto md:flex-1 md:translate-x-0",
          mobilePane === "chat"
            ? "translate-x-0"
            : "translate-x-full pointer-events-none md:pointer-events-auto",
        ].join(" ")}
      >
        <ChatWindow onBack={() => setMobilePane("list")} className="h-full w-full" />
      </div>
    </div>
  );
}

