import { MessageSquareTextIcon } from "lucide-react";
import ChatIcons from "./chatIcons";

export default function ChatSidebar({
  propObjectArr,
  className = "",
  onSelectConversation,
}: {
  propObjectArr: any[];
  className?: string;
  onSelectConversation?: () => void;
}) {
    return <>
    <div className={`flex h-full w-full border-r-0 md:border-r-4 pt-4 pb-4 pr-2 pl-2 overflow-auto ${className}`}>
    <div className=" h-full w-full flex flex-col gap-4 items-center justify-start  p-1 " >
     <div className="w-full max-h-fit p-4 flex flex-row gap-2 bg-[#DFFF00]" >
        <MessageSquareTextIcon className="text-black" />
        <p className="text-black font-extrabold text-[1.1rem] ">SEE ALL YOUR CHATS</p>
     </div>
     {
      propObjectArr?.map((item:any,index:number)=>(
        <ChatIcons
          key={item.conversation_id}
          conversation_id={item.conversation_id}
          conversation_type={item.conversation_type}
          conversation_name={item.conversation_name}
          onSelect={onSelectConversation}
        />
      ))
     }
    </div>
  </div>
    </>
}