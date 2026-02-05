"use client";

import { useState } from "react";
import { TrendingUp, CheckCircle } from "lucide-react";
import { promoteUser } from "./actions";

interface PromoteUserProps {
  targetUserId: string;
}

export default function PromoteUser({ targetUserId }: PromoteUserProps) {
  const [isPromoting, setIsPromoting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handlePromote = async () => {
    setIsPromoting(true);
    setMessage(null);

    try {
      const result = await promoteUser(targetUserId);
      if (result.success) {
        setMessage({ type: "success", text: result.message });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setIsPromoting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handlePromote}
        disabled={isPromoting}
        className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 border border-green-500/50 rounded-lg transition-colors text-sm font-bold uppercase tracking-wider disabled:opacity-50"
      >
        {isPromoting ? (
          "Promoting..."
        ) : (
          <>
            <TrendingUp size={16} />
            Promote User
          </>
        )}
      </button>

      {message && (
        <span
          className={`text-xs font-bold uppercase ${message.type === "success" ? "text-green-500" : "text-red-500"}`}
        >
          {message.text}
        </span>
      )}
    </div>
  );
}
