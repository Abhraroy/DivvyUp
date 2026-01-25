import ChatSidebar from "@/components/chatComponents/chatSidebar";
import ChatWindow from "@/components/chatComponents/chatWindow";

export default function ChatPage() {
  return <div className="flex h-screen w-full bg-red-500 ">
    <ChatSidebar />
    <ChatWindow />
  </div>;
}
