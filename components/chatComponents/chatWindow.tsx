"use client";
import { useChatStore } from "@/lib/zustand/chatStore";
import { ArrowLeft, MessageSquareDashed, Users, User, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "@/lib/zustand/AuthStore";

export type ChatWindowProps = {
  onBack?: () => void;
  className?: string;
};

export default function ChatWindow(props: ChatWindowProps) {
  const { onBack, className = "" } = props;
  const { conversation_id, conversation_name, conversation_type } =
    useChatStore();
  const { user, setUser } = useAuthStore();
  const [chatList, setChatList] = useState<any[]>([]);
  const [conversation_members, setConversationMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef<any>(null);
  const supabase = createClient();
  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    setUser(data?.user?.id);
  };

  useEffect(() => {
    setConversationMembers([]);
    setChatList([]);
    fetchUser();
    const fetchConversationMembers = async () => {
      if (!conversation_id) {
        return;
      }
      const { data, error } = await supabase
        .from("conversation_participants")
        .select("*,profiles(*)")
        .eq("conversation_id", conversation_id);
      console.log("member data", data);
      if (data) {
        setConversationMembers(data);
      }
    };
    fetchConversationMembers();
  }, [conversation_id]);

  useEffect(() => {
    const fetchChat = async () => {
      if (!conversation_id) {
        return;
      }
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", conversation_id);
      console.log(data);
      if (data) {
        setChatList(data);
      }
    };
    fetchChat();
  }, [conversation_id]);

  useEffect(() => {
    if (!conversation_id) return;
    const channel = supabase
      .channel(`chat-${conversation_id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `conversation_id=eq.${conversation_id}`,
        },
        (payload) => {
          console.log(payload);
          setChatList((prev) => [...prev, payload.new]);
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [conversation_id]);

  const sendMessage = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    console.log(ref.current?.value);
    console.log(user);
    const content = ref.current?.value.trim();
    if (!content || content === "") {
      console.log("empty message");
      setLoading(false);
      return;
    }
    const { data, error } = await supabase.from("chat_messages").insert({
      conversation_id,
      sender_id: user,
      content,
    });
    ref.current.value = "";
    setLoading(false);
  };

  if (!conversation_id) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-4">
        <MessageSquareDashed className="h-16 w-16 text-gray-900" />
        <p className="text-xl font-semibold text-gray-400">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  return (
    <div className={`h-full w-full flex flex-col ${className}`}>
      <div className="w-full border-b p-4 flex flex-row gap-2 items-center justify-start  ">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="md:hidden mr-1 inline-flex items-center justify-center rounded-md border border-white/20 p-2"
            aria-label="Back to chats"
          >
            <ArrowLeft className="h-4 w-4 text-white" />
          </button>
        )}
        {conversation_type === "direct" ? (
          <User className="text-white" />
        ) : (
          <Users className="text-white" />
        )}
        <h2 className="font-bold text-lg">{conversation_name}</h2>
      </div>

      {conversation_type === "group" && <div className="w-full border-b p-4 flex flex-row items-start justify-start  ">
        {conversation_members?.map((item: any, index: number) => (
          <div key={index} className="flex flex-row gap-1">
            {item.profiles.user_id === user ? (
              <p className="text-white">You</p>
            ) : (
              <p className="text-white">{item.profiles?.name}</p>
            )}
            <span>{index < conversation_members.length - 1 && ", "}</span>
          </div>
        ))}
      </div>}

      <div className="flex-1 overflow-auto flex flex-col gap-2  justify-end p-2 md:p-16 ">
        {chatList?.map((item: any, index: number) => (
          <div
            key={index}
            className={
              item.sender_id === user
                ? "w-full flex flex-row items-end justify-end"
                : "w-full flex flex-row items-start justify-start"
            }
          >
            <div className=" w-fit p-2 h-fit flex flex-col gap-1.5 items-center justify-start rounded-md border-2 border-[#DFFF00]/50 ">
              {conversation_type === "group" ? (
                <>
                  {item.sender_id === user ? (
                    <p className="text-white font-semibold text-left">You</p>
                  ) : (
                    <p className="text-white font-semibold text-left">
                      {item.profiles?.name}
                    </p>
                  )}
                  <p className="text-white">{item.content}</p>
                </>
              ) : (
                <p className="text-white">{item.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full border-t p-4 flex flex-row gap-2 items-center justify-start  ">
        <form
          onSubmit={sendMessage}
          className="w-full flex flex-row gap-2 items-center justify-start  "
        >
          <input
            ref={ref}
            type="text"
            placeholder="Type your message"
            className="w-full border-2 border-[#DFFF00] rounded-md p-2"
          />
          <button disabled={loading} className="bg-[#DFFF00] text-black font-bold py-2 px-4 rounded-md">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
