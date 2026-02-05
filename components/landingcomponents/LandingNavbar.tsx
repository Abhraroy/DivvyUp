"use client";
import Link from "next/link";
import { LayoutGrid,CircleSlash2 } from "lucide-react";
import { useAuthStore } from "@/lib/zustand/AuthStore";

export default function LandingNavbar({ user }: any) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-[#0a0a0a]">
      <div className="mx-auto flex h-20 max-w-[1920px] items-center justify-between px-6 md:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="border border-[#DFFF00] p-1 shadow-[4px_4px_0px_#fff] transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
            <CircleSlash2 size={24} className="text-[#DFFF00]" />
          </div>
          <span className="text-white font-black text-2xl uppercase tracking-tighter">
            Divvy<span className="text-[#DFFF00]">.Up</span>
          </span>
        </Link>

        {/* Desktop Links (Optional - added for completeness based on ref) */}
        <div className="hidden md:flex gap-8">
          {["Features","console", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-[#DFFF00] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div>
          {user?.email && user?.role === "authenticated" ? (
            <Link
              href="/console"
              className="bg-white hover:bg-[#DFFF00] text-black font-black text-xs uppercase tracking-widest px-8 py-3 transition-colors border-2 border-transparent hover:border-black"
            >
              Enter Console
            </Link>
          ) : (
            <Link
              href="/signin"
              className="border-2 border-white bg-transparent hover:bg-white hover:text-black text-white font-black text-xs uppercase tracking-widest px-8 py-3 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
