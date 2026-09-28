import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Authentication Error // Divvy.Up",
  description: "Unable to complete Google authentication.",
};

export default function AuthCodeErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0d0d0d] p-4">
      <div className="w-full max-w-md border-2 border-red-500 bg-[#1a1a1a] p-8 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
        {/* Warning Header */}
        <div className="flex items-center gap-3 border-b-2 border-red-500 pb-4 text-red-500">
          <AlertTriangle className="h-6 w-6 shrink-0" />
          <h1 className="text-xs font-bold uppercase tracking-widest">
            AUTH_EXCHANGE_FAILURE // 401
          </h1>
        </div>

        {/* Message */}
        <div className="my-6 space-y-3">
          <p className="text-sm font-bold uppercase tracking-wider text-white">
            Authentication Could Not Be Completed
          </p>
          <p className="text-xs text-gray-400 font-mono leading-relaxed">
            The OAuth authorization code is invalid, has expired, or the consent request was interrupted.
          </p>
        </div>

        {/* Action Button */}
        <div className="space-y-3">
          <Link
            href="/signin"
            className="flex w-full items-center justify-center gap-2 border-2 border-white bg-white px-4 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-gray-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Return_To_Signin
          </Link>

          <Link
            href="/"
            className="flex w-full items-center justify-center border-2 border-gray-700 bg-transparent px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-300 transition-all hover:border-white hover:text-white"
          >
            Home_Page
          </Link>
        </div>
      </div>
    </main>
  );
}
