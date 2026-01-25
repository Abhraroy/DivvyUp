"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

const PLATFORMS = ["All", "Netflix", "Spotify", "Youtube", "Amazon Prime", "Apple Music"];
const POST_TYPES = [
  { label: "All", value: "all" },
  { label: "Offering", value: "OFFERING" },
  { label: "Request", value: "REQUEST" },
  { label: "Group", value: "GROUP" },
];

export function BrowseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPlatform = searchParams.get("platform") || "All";
  const currentType = searchParams.get("type") || "all";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "All" || value === "all") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (name: string, value: string) => {
    router.push(`?${createQueryString(name, value)}`);
  };

  return (
    <div className="flex flex-col gap-4 border-b border-gray-800 pb-6 mb-8">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-semibold text-gray-400 mr-2 uppercase tracking-wider">Platform:</span>
        {PLATFORMS.map((platform) => (
          <button
            key={platform}
            onClick={() => handleFilterChange("platform", platform)}
            className={cn(
              "px-4 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors",
              currentPlatform === platform
                ? "bg-white text-black border-white"
                : "bg-transparent text-gray-500 border-gray-700 hover:border-gray-500"
            )}
          >
            {platform}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-semibold text-gray-400 mr-2 uppercase tracking-wider">Type:</span>
        {POST_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => handleFilterChange("type", type.value)}
            className={cn(
              "px-4 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors",
              currentType === type.value
                ? "bg-[#DFFF00] text-black border-[#DFFF00]"
                : "bg-transparent text-gray-500 border-gray-700 hover:border-gray-500"
            )}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
