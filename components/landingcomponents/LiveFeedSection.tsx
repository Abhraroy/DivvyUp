import Link from "next/link";
import { ArrowRight, BarChart3, MessageSquare, CreditCard } from "lucide-react";

export default function LiveFeedSection() {
  return (
    <section className="w-full border-b border-white/20 bg-[#0a0a0a] py-24 px-8">
      <div className="mx-auto max-w-480">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            The Interface <br /> Architecture
          </h2>
          <p className="max-w-xl text-sm font-mono text-gray-400 border-l-2 border-[#DFFF00] pl-4">
            Pure utility. Zero clutter. Real-time data sync across the ecosystem
            to keep you in the loop.
          </p>
        </div>

        {/* Mockups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mockup 1: Dashboard/Dark Mode */}
          <div className="group relative border border-white/20 bg-[#111] p-2 hover:border-[#DFFF00] transition-colors">
            <div className="bg-[#0a0a0a] border border-white/10 p-4 h-64 flex flex-col gap-2 overflow-hidden shadow-inner">
              {/* Mock Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-2">
                <div className="w-20 h-2 bg-white/20 rounded-full"></div>
                <div className="w-4 h-4 rounded-full bg-white/10"></div>
              </div>
              {/* Mock Lines */}
              <div className="space-y-2">
                <div className="w-3/4 h-8 bg-white/10 rounded-sm animate-pulse"></div>
                <div className="w-full h-24 bg-white/5 rounded-sm border border-white/5 p-2">
                  <div className="w-1/2 h-2 bg-white/20 mb-2"></div>
                  <div className="w-1/3 h-2 bg-white/10"></div>
                </div>
                <div className="w-full h-8 bg-[#DFFF00]/10 border border-[#DFFF00]/20 rounded-sm flex items-center px-2">
                  <span className="text-[10px] text-[#DFFF00] font-mono">
                    ACTIVE · SYNCED
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 px-2 pb-2">
              <h4 className="font-bold text-white uppercase text-sm flex items-center gap-2">
                <BarChart3 size={16} /> Real-time Dashboard
              </h4>
              <p className="text-xs text-gray-500 font-mono mt-1">
                Live status of all your pools.
              </p>
            </div>
          </div>

          {/* Mockup 2: Chat/Interaction */}
          <div className="group relative border border-white/20 bg-[#111] p-2 hover:border-[#DFFF00] transition-colors">
            <div className="bg-white p-4 h-64 flex flex-col gap-3 overflow-hidden shadow-inner relative">
              {/* Mock Chat Bubbles */}
              <div className="self-start bg-gray-200 p-2 rounded-tl-xl rounded-tr-xl rounded-br-xl max-w-[80%]">
                <div className="w-24 h-2 bg-gray-400 rounded-full"></div>
              </div>
              <div className="self-end bg-black p-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl max-w-[80%]">
                <div className="w-32 h-2 bg-white/50 rounded-full"></div>
              </div>
              <div className="self-start bg-gray-200 p-2 rounded-tl-xl rounded-tr-xl rounded-br-xl max-w-[80%]">
                <div className="w-16 h-2 bg-gray-400 rounded-full mb-1"></div>
                <div className="w-20 h-2 bg-gray-300 rounded-full"></div>
              </div>
              {/* Input Area */}
              <div className="absolute bottom-4 left-4 right-4 h-8 bg-gray-100 border border-gray-300 rounded-full flex items-center px-3">
                <div className="w-full h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            <div className="mt-4 px-2 pb-2">
              <h4 className="font-bold text-white uppercase text-sm flex items-center gap-2">
                <MessageSquare size={16} /> Direct Chat
              </h4>
              <p className="text-xs text-gray-500 font-mono mt-1">
                Direct chat with your pool members.
              </p>
            </div>
          </div>

          {/* Mockup 3: Payment/Cards */}
          <div className="group relative border border-white/20 bg-[#111] p-2 hover:border-[#DFFF00] transition-colors">
            <div className="bg-[#1a1a1a] border border-white/10 p-4 h-64 flex flex-col justify-center items-center relative overflow-hidden">
              {/* Mock Graph */}
              <div className="flex items-end gap-2 h-32 w-full px-4 border-b border-white/20">
                <div className="w-1/5 h-[40%] bg-white/10 hover:bg-[#DFFF00] transition-colors"></div>
                <div className="w-1/5 h-[60%] bg-white/10 hover:bg-[#DFFF00] transition-colors"></div>
                <div className="w-1/5 h-[30%] bg-white/10 hover:bg-[#DFFF00] transition-colors"></div>
                <div className="w-1/5 h-[80%] bg-white/10 hover:bg-[#DFFF00] transition-colors"></div>
                <div className="w-1/5 h-[50%] bg-white/10 hover:bg-[#DFFF00] transition-colors"></div>
              </div>
              <div className="w-full mt-4 flex justify-between px-2 text-[10px] text-gray-500 font-mono uppercase">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
              </div>
            </div>
            <div className="mt-4 px-2 pb-2">
              <h4 className="font-bold text-white uppercase text-sm flex items-center gap-2">
                <CreditCard size={16} /> Volume Metrics
              </h4>
              <p className="text-xs text-gray-500 font-mono mt-1">
                Track your savings over time.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/signin"
            className="inline-block bg-[#DFFF00] text-black font-black text-xl uppercase tracking-widest px-12 py-6 border-4 border-transparent hover:scale-105 transition-transform shadow-[0_0_20px_rgba(223,255,0,0.3)]"
          >
            Ready to Start Divvying Up?
          </Link>
        </div>
      </div>
    </section>
  );
}
