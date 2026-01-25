"use client";
import { subscription_posts } from "../ui/subsCard";
import { X } from "lucide-react";
import { joinPool } from "@/app/console/browse/action";
interface JoiningPageProps {
  post: subscription_posts;
  onClose: () => void;
}

export default function JoiningPage({ post, onClose }: JoiningPageProps) {
  // Determine button text similar to SubsCard logic
  let buttonText = "Join Pool";
  if (post.post_type === "GROUP") {
    buttonText = "Join Group";
  } else if (post.post_type === "REQUEST") {
    buttonText = "Make Offer";
  }


  const handleClick = async()=>{
    console.log("clicked");
    const res = await joinPool(post.id);
    console.log(res);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Card Content */}
      <div className="relative z-10 w-full max-w-md border-2 border-white bg-black p-6 text-white shadow-2xl mx-4">
        {/* Close Button (Inside content) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header / Title */}
        <div className="mb-6 pr-8">
          <h2 className="text-2xl font-black uppercase leading-tight tracking-tight">
            {post.title}
          </h2>
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400 mt-1">
            {post.platform}
          </p>
        </div>

        {/* Description & Owner */}
        <div className="mb-8 space-y-4">
          {post.description && (
            <p className="text-gray-300 text-sm leading-relaxed">
              {post.description}
            </p>
          )}

          <div className="pt-4 border-t border-white/20">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              Created By
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold">
                {post.owner_id?.name || "Unknown User"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-white py-3 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-gray-200"
        onClick={handleClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
