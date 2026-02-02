import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Background Grid/Noise (Optional implementation later) */}

      <div className="container mx-auto px-4 z-10 relative">
        <div className="inline-flex items-center gap-2 mb-6 border border-[#DFFF00]/30 bg-[#DFFF00]/10 px-3 py-1 rounded-sm">
          <span className="w-2 h-2 rounded-full bg-[#DFFF00] animate-pulse"></span>
          <span className="text-[#DFFF00] text-xs font-mono uppercase tracking-widest">
            System Operational // v2.0.4
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase max-w-4xl">
          Stop Overpaying.
          <br />
          <span className="text-[#DFFF00]">Start Sharing.</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
          <div className="border-l-4 border-[#DFFF00] pl-6 py-1">
            <p className="text-white/60 font-mono text-sm leading-relaxed max-w-md">
              &gt; 50,000+ active shares initialized.
              <br />
              &gt; Raw savings distributed.
              <br />
              &gt; Zero bullshit protocol.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/browse"
            className="bg-[#DFFF00] hover:bg-[#b0cc00] text-black px-8 py-4 font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all rounded-sm border-2 border-transparent hover:scale-105"
          >
            Find a Group <ArrowRight size={20} />
          </Link>
          <Link
            href="/host"
            className="bg-transparent border-2 border-white/20 hover:border-[#DFFF00] hover:text-[#DFFF00] text-white px-8 py-4 font-bold uppercase tracking-wide flex items-center justify-center transition-all rounded-sm"
          >
            Host a Service
          </Link>
        </div>
      </div>

      {/* Decorative Scroller */}
      <div className="absolute bottom-0 w-full overflow-hidden bg-[#DFFF00]/10 border-y border-[#DFFF00]/20 py-2">
        <div className="whitespace-nowrap animate-marquee flex gap-8">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="text-[#DFFF00]/80 font-black italic uppercase text-sm"
            >
              PREMIUM • HULU • DISNEY+ • HBO MAX • APPLE ONE • ADOBE CC • OFFICE
              365 • NETFLIX • SPOTIFY • YOUTUBE PREMIUM
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
