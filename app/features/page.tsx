import LandingNavbar from "@/components/landingcomponents/LandingNavbar";
import LandingFooter from "@/components/landingcomponents/LandingFooter";
import { createClient } from "@/lib/supabase/server";
import {
  Users,
  ShieldCheck,
  MessageSquare,
  BadgeCheck,
  TrendingUp,
  Zap,
} from "lucide-react";

export default async function FeaturePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const features = [
    {
      title: "Smart Pooling",
      description:
        "Join or create pools for your favorite streaming services. Automatic slot management ensures fair usage.",
      icon: Users,
    },
    {
      title: "Secure Payments",
      description:
        "Automated, secure transaction handling via Stripe. No more chasing friends for their share.",
      icon: ShieldCheck,
    },
    {
      title: "Real-time Chat",
      description:
        "Integrated messaging for every pool. Coordinate with members instantly without leaving the app.",
      icon: MessageSquare,
    },
    {
      title: "Verified Hosts",
      description:
        "All pool hosts are verified to ensure trust and safety using our identity verification system.",
      icon: BadgeCheck,
    },
    {
      title: "Automated Savings",
      description:
        "Save up to 80% on monthly subscriptions by splitting costs. Track your savings in real-time.",
      icon: TrendingUp,
    },
    {
      title: "Instant Access",
      description:
        "Get secure access to shared credentials immediately upon joining a pool. No waiting time.",
      icon: Zap,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#DFFF00] selection:text-black font-sans">
      <LandingNavbar user={user} />

      {/* Header Section */}
      <section className="relative pt-32 pb-20 px-6 border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#DFFF00]/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-block bg-[#DFFF00] text-black px-3 py-1 font-black uppercase text-xs tracking-widest mb-6 border-2 border-black rotate-1">
            Platform Features
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter mb-8">
            Everything <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              Under Control
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl font-mono border-l-4 border-[#DFFF00] pl-6">
            Powerful tools designed to make subscription sharing simple, secure,
            and automated.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-[#0a0a0a] relative">
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 text-4xl font-black text-white/20 select-none group-hover:opacity-40 transition-opacity">
                0{index + 1}
              </div>

              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-[#DFFF00] text-black border-2 border-black shadow-[4px_4px_0px_#fff] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                <feature.icon size={24} strokeWidth={2.5} />
              </div>

              <h3 className="text-2xl font-black uppercase mb-4 text-white group-hover:text-[#DFFF00] transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Corner accent */}
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-[#DFFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/10 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-8">
            Ready to start saving?
          </h2>
          <a
            href="/console/browse"
            className="inline-block bg-[#DFFF00] text-black text-lg px-12 py-6 font-black uppercase tracking-wider hover:bg-white transition-colors shadow-[8px_8px_0px_#fff] hover:shadow-[4px_4px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            Explore Pools
          </a>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
