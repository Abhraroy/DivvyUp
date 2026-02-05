import LandingNavbar from "@/components/landingcomponents/LandingNavbar";
import LandingFooter from "@/components/landingcomponents/LandingFooter";
import { createClient } from "@/lib/supabase/server";
import { Heart, Shield, Globe, Zap, Users } from "lucide-react";

export default async function AboutPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const values = [
    {
      title: "Community First",
      description:
        "We are building more than a platform; we are building a collective. We believe in the power of sharing resources to benefit everyone.",
      icon: Users,
    },
    {
      title: "Radical Transparency",
      description:
        "No hidden fees, no shady practices. We operate with complete openness because trust is our currency.",
      icon: Globe,
    },
    {
      title: "Uncompromising Security",
      description:
        "Your data and payments are sacred. We use industrial-grade encryption and verification to keep you safe.",
      icon: Shield,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#DFFF00] selection:text-black font-sans">
      <LandingNavbar user={user} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 border-b border-white/10 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-[#DFFF00]/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-block bg-[#DFFF00] text-black px-3 py-1 font-black uppercase text-xs tracking-widest mb-6 border-2 border-black -rotate-1">
            Our Story
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter mb-8">
            We Are <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              Divvy.Up
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl font-mono border-l-4 border-[#DFFF00] pl-6">
            Born from the frustration of wasted subscriptions. Built for the era
            of smart ownership.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-6 bg-[#0a0a0a] relative border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-[0.9]">
              The Mission
            </h2>
            <div className="space-y-6 text-lg text-gray-400 font-mono">
              <p>
                Let's face it: keeping up with every streaming service, tool,
                and platform is expensive. We saw a world where people were
                paying for 24/7 access but only using it 1% of the time.
              </p>
              <p>
                <span className="text-white font-bold">
                  That didn't sit right with us.
                </span>
              </p>
              <p>
                SubPartner exists to unlock the efficiency of the sharing
                economy for digital goods. We connect people who have excess
                capacity with people who need access, creating a win-win
                ecosystem where everyone saves money.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-[#DFFF00] translate-x-4 translate-y-4 border-2 border-white/20 hidden lg:block"></div>
            <div className="relative bg-white/5 border border-white/20 p-12 backdrop-blur-sm">
              <Heart className="w-16 h-16 text-[#DFFF00] mb-6" />
              <p className="text-2xl font-black uppercase text-white leading-tight">
                "We believe access to information and entertainment shouldn't be
                a luxury privilege."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 px-6 bg-[#0f0f0f] relative">
        {/* Noise overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
            Our Core Values
          </h2>
          <div className="w-24 h-2 bg-[#DFFF00]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-[#0a0a0a] border border-white/10 p-8 hover:border-[#DFFF00] transition-colors duration-300"
            >
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 bg-white/10 text-[#DFFF00] rounded-full group-hover:bg-[#DFFF00] group-hover:text-black transition-all">
                <value.icon size={24} />
              </div>

              <h3 className="text-xl font-black uppercase mb-4 text-white">
                {value.title}
              </h3>

              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats/Impact Section (Simplified) */}
      <section className="py-20 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Pools", value: "500+" },
            { label: "Members", value: "2.4K" },
            { label: "Savings Generated", value: "$45K+" },
            { label: "Uptime", value: "99.9%" },
          ].map((stat, i) => (
            <div key={i} className="p-4">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#DFFF00]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
