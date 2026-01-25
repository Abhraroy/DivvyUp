"use client";
import React from "react";
import { cn } from "@/lib/utils";
import JoiningPage from "../browse/JoiningPage";
import { useState } from "react";

export interface subscription_posts {
  id: string;
  post_type: string;
  platform: string;
  title: string;
  description: string | null;
  owner_id: any;
  total_slots: number | null;
  filled_slots: number | null;
  price_per_user: number | null;
  group_status: string | null;
  created_at: string | null;
  updated_at: string | null;
  platform_type: string | null;
  tags: string[] | null;
  expiry_date: string | null;
}

interface SubsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: subscription_posts;
}

export function SubsCard({ post, className, ...props }: SubsCardProps) {
  const [showJoiningPage, setShowJoiningPage] = useState(false);
  const {
    post_type,
    platform,
    title,
    description,
    total_slots,
    filled_slots,
    price_per_user,
    group_status,
    tags,
    expiry_date,
  } = post;

  const slots = (total_slots || 0) - (filled_slots || 0);
  const logo = platform ? platform.slice(0, 2).toUpperCase() : "??";

  let buttonText;

  if (post_type === "OFFERING") {
    buttonText = "Join Pool";
  } else if (post_type === "GROUP") {
    buttonText = "Join Group";
  } else if (post_type === "REQUEST") {
    buttonText = "Make Offer";
  }

  // Determine slot text/color logic based on count if needed
  let slotText = `${slots} LEFT`;
  if (slots === 1) slotText = "LAST ONE";
  if (slots === 0) slotText = "SOLD OUT";

  return (
    <>
      <div
        className={cn(
          "relative flex h-full w-full max-w-[320px] flex-col gap-2 border-2 border-white bg-black p-6 text-white",
          className,
        )}
        {...props}
      >
        {/* Badges Container (Absolute Top) */}
        <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
          {/* Post Type Badge */}
          {group_status && (
            <div className="border border-white bg-white rounded-full text-black px-2 py-1 text-[1rem] font-bold uppercase tracking-wider">
              {post_type}
            </div>
          )}
          {/* Group Status Badge */}
          <div className="border border-white px-2 py-1 rounded-full text-[0.9rem] font-bold uppercase tracking-wider">
            {group_status}
          </div>
        </div>

        {/* Logo Area */}
        <div className="mb-6 flex h-12 w-12 items-center justify-center bg-white text-black font-bold">
          <img
            src={`https://www.google.com/s2/favicons?domain=${platform}&sz=256`}
            alt="Logo"
            className="h-12 w-12 object-contain bg-transparent p-1 "
          />
        </div>

        {/* Content */}
        <div className="mb-8">
          <h3 className="mb-1 text-xl font-black uppercase leading-tight tracking-tight">
            {title}
          </h3>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {tags.map((t, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-gray-800 px-1 py-0.5 uppercase tracking-wider text-gray-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          <p className="text-[0.9rem] font-medium text-white uppercase tracking-wider line-clamp-3">
            {platform}
          </p>

          {/* Expiry Date */}
          {expiry_date && (
            <p className="mt-2 text-[0.9rem] text-white font-mono">
              EXP: {new Date(expiry_date).toLocaleDateString("en-IN")}
            </p>
          )}
        </div>

        {/* Price & Slots */}
        <div className="mt-auto">
          <div className="mb-6 flex items-end justify-between">
            <div>
              {price_per_user !== null && (
                <>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Price/Mo
                  </span>
                  <span className="text-3xl font-black tracking-tight">
                    ${price_per_user}
                  </span>
                </>
              )}
            </div>
            <div className="text-right">
              <span className="block text-[1rem] font-bold uppercase tracking-wider text-gray-500">
                Slots
              </span>
              <div className="flex items-center justify-end gap-1 mb-1">
                {total_slots &&
                  total_slots > 0 &&
                  Array.from({ length: total_slots }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-3 w-3 rounded-full border border-[#DFFF00]",
                        i < (filled_slots || 0)
                          ? "bg-[#DFFF00]"
                          : "bg-transparent",
                      )}
                    />
                  ))}
              </div>
              <span className="text-lg font-bold uppercase text-[#DFFF00]">
                {slotText}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            className="w-full bg-white py-3 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-gray-200"
            onClick={() => setShowJoiningPage(true)}
          >
            {buttonText}
          </button>
        </div>
      </div>
      {showJoiningPage && (
        <JoiningPage post={post} onClose={() => setShowJoiningPage(false)} />
      )}
    </>
  );
}
