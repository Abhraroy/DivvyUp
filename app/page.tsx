import LandingNavbar from "@/components/landingcomponents/LandingNavbar";
import HeroSection from "@/components/landingcomponents/HeroSection";
import StatsSection from "@/components/landingcomponents/StatsSection";
import LiveFeedSection from "@/components/landingcomponents/LiveFeedSection";
import HowItWorksSection from "@/components/landingcomponents/HowItWorksSection";
import LandingFooter from "@/components/landingcomponents/LandingFooter";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log(user, error);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#DFFF00] selection:text-black">
      <LandingNavbar user={user} />
      <HeroSection />
      <StatsSection />
      <LiveFeedSection />
      <HowItWorksSection />
      <LandingFooter />
    </main>
  );
}
