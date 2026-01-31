"use client";
import { Users, User } from "lucide-react";
import { useChatStore } from "@/lib/zustand/chatStore";

export default function ChatIcons({
  conversation_id,
  conversation_type,
  conversation_name,
  onSelect,
}: {
  conversation_id: string;
  conversation_type: string;
  conversation_name: string;
  onSelect?: () => void;
}) {
  const { setConversationId, setConversationType, setConversationName } =
    useChatStore();

  const handleClick = () => {
    setConversationId(conversation_id);
    setConversationType(conversation_type);
    setConversationName(conversation_name);
    onSelect?.();
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-h-fit p-4 flex flex-row gap-2 border-2 border-[#DFFF00] cursor-pointer hover:bg-white/10 transition-colors"
    >
      {conversation_type === "direct" ? (
        <User className="text-white" />
      ) : (
        <Users className="text-white" />
      )}
      <p className="text-white font-extrabold text-[1.1rem] ">
        {conversation_name}
      </p>
    </div>
  );
}
