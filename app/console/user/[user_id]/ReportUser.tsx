"use client";

import { useState } from "react";
import { Flag, X, AlertTriangle } from "lucide-react";
import { reportUser } from "./actions";

interface ReportUserProps {
  reportedUserId: string;
}

export default function ReportUser({ reportedUserId }: ReportUserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("Spam");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await reportUser(reportedUserId, reason, details);
      if (result.success) {
        setMessage({ type: "success", text: result.message });
        setTimeout(() => setIsOpen(false), 2000);
        setDetails("");
        setReason("Spam");
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg transition-colors text-sm font-bold uppercase tracking-wider"
      >
        <Flag size={16} />
        Report User
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f0f0f] border-2 border-white w-full max-w-md p-6 relative shadow-[8px_8px_0px_#DFFF00]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-500 text-black p-2 rounded-full">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-black uppercase text-white">
                Report User
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                  Reason for reporting
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-black border border-white/20 p-3 text-white focus:border-[#DFFF00] outline-none rounded-none"
                >
                  <option value="Spam">Spam</option>
                  <option value="Scams/Fraud">Scams or Fraud</option>
                  <option value="Harassment">Harassment or Abuse</option>
                  <option value="Inappropriate Content">
                    Inappropriate Content
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">
                  Additional Details (Optional)
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={4}
                  className="w-full bg-black border border-white/20 p-3 text-white focus:border-[#DFFF00] outline-none rounded-none resize-none"
                  placeholder="Please provide more context..."
                ></textarea>
              </div>

              {message && (
                <div
                  className={`p-3 text-sm font-bold uppercase ${
                    message.type === "success"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 border border-white/20 text-white font-bold uppercase hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-[#DFFF00] text-black font-black uppercase hover:bg-white transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
