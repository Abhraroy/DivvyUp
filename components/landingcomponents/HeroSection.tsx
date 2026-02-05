import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full border-b border-white/20 bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1920px] grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/20">
        {/* Left Col: Hero Content */}
        <div className="flex flex-col justify-between p-8 md:p-16 lg:p-24">
          <div className="mb-12">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-8">
              Split <br />
              <span className="text-[#DFFF00]">Subs,</span> <br />
              Not the <br />
              Fun.
            </h1>
            <p className="text-lg text-gray-400 font-mono border-l-4 border-[#DFFF00] pl-6 max-w-md">
              Join pools for your favorite streaming services. Save up to 80% on
              monthly costs. Integrated messaging, automated payments, zero
              stress.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/console/browse"
              className="bg-[#DFFF00] text-black px-10 py-5 font-black uppercase tracking-wider text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[6px_6px_0px_#fff] transition-all"
            >
              Join Now
            </Link>
            <Link
              href="/console/create-pool"
              className="bg-transparent border-2 border-white text-white px-10 py-5 font-black uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors"
            >
              Create Pool
            </Link>
          </div>

          <div className="mt-12 md:mt-24">
            <div className="inline-flex items-center gap-3 bg-white/5 px-4 py-2 border border-white/10 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-gray-400">
                SECURE PAYMENTS VIA STRIPE
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Visuals / Mockup */}
        <div className="relative flex flex-col p-8 md:p-16 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-80 lg:min-h-screen">
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Mock Card */}
            <div className="w-full max-w-md bg-white p-6 rotate-2 transform hover:rotate-0 transition-transform duration-500 shadow-[20px_20px_0px_0px_#DFFF00]">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <Play className="text-white fill-white" />
                </div>
                <div className="bg-[#DFFF00] px-3 py-1 border-2 border-black font-black uppercase text-xs">
                  Verified
                </div>
              </div>
              <h3 className="text-4xl font-black text-black uppercase mb-2 leading-none">
                Streambox Pro
              </h3>
              <p className="font-mono text-sm text-gray-500 mb-8">
                Share premium entertainment.
              </p>

              <div className="border-t-2 border-black pt-6 flex justify-between items-end">
                <div>
                  <span className="block text-xs font-bold uppercase text-gray-400">
                    Your Share
                  </span>
                  <span className="text-3xl font-black text-black">
                    $3.50<span className="text-sm text-gray-500">/mo</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold uppercase text-gray-400">
                    Pool #42
                  </span>
                </div>
              </div>
            </div>

            {/* Additional floating element */}
            <div className="absolute top-1/4 right-12 w-48 bg-[#DFFF00] p-4 border-2 border-white -rotate-6 hidden lg:block shadow-[8px_8px_0px_0px_#fff]">
              <span className="block text-5xl font-black text-black leading-none">
                $2.4M
              </span>
              <span className="block text-xs font-black uppercase tracking-widest text-black/60">
                Total User Savings
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
