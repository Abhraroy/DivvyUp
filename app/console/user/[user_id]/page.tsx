import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Mail, Calendar, Users, Crown, Shield } from "lucide-react";
import ReputationButtons from "./ReputationButtons";
import ReportUser from "./ReportUser";
import PromoteUser from "./PromoteUser";

export default async function PublicProfile({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const supabase = await createClient();
  const userId = (await params).user_id;

  // Verify user exists and fetch profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (profileError || !profile) {
    notFound();
  }

  // Fetch user's data
  const [
    { data: activePools, error: activePoolError },
    { data: ownedPools, error: ownedPoolError },
  ] = await Promise.all([
    supabase
      .from("subscription_members")
      .select("*,subscription_posts(*)")
      .eq("member_id", userId),
    supabase.from("subscription_posts").select("*").eq("owner_id", userId),
  ]);

  const joinedDate = new Date(profile.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });

  const joinedPoolsCount = activePools ? activePools.length : 0;
  // We can include owned pools in active count or keep separate.
  // User asked for "count active pools", usually implies total participation.
  // Let's stick to the previous logic or simplified one.

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      <div className="container mx-auto flex h-full max-w-7xl flex-col px-4 pt-8 pb-8">
        {/* Header */}
        <header className="flex-none mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            User Profile
          </h1>
          <p className="text-gray-400">Viewing public profile.</p>
        </header>
        {/* Profile Card */}
        <div className="mb-8 border-4 border-[#DFFF00] rounded-sm p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-[#DFFF00] flex items-center justify-center text-3xl font-black uppercase bg-[#0a0a0a] text-white">
                {profile.name?.charAt(0) || profile.email?.charAt(0) || "U"}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-gray-900"></div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-black tracking-tight">
                  {profile.name || "User"}
                </h2>
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase rounded-full">
                  Community Member
                </span>
              </div>

              {profile.email && (
                <p className="text-gray-400 flex items-center gap-2 mb-3">
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </p>
              )}

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Joined {joinedDate}
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Shield className="h-4 w-4" />
                  Verified User
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Stats Grid - Modified as per request */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Reputation with Buttons */}
          <div className="border-4 border-[#DFFF00] bg-[#DFFF00] p-8 flex flex-col items-center justify-center gap-4 shadow-[8px_8px_0px_#fff]">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-8 w-8 text-black" />
              <span className="text-xl font-black text-black uppercase tracking-wider">
                Reputation Score
              </span>
            </div>
            <p className="text-6xl text-black font-black">
              {profile.reputation || 0}
            </p>
          </div>

          {/* Active Pools Count */}
          <div className="border-4 border-white bg-[#0a0a0a] p-8 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-8 w-8 text-white" />
              <span className="text-xl font-black text-white uppercase tracking-wider">
                Active Pools
              </span>
            </div>
            <p className="text-6xl text-white font-black">{joinedPoolsCount}</p>
            <p className="text-sm font-mono text-gray-400 uppercase">
              Currently Participating
            </p>
          </div>
        </div>
        {/* Active Pools Section */}
        {ownedPools && ownedPools.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black uppercase tracking-tight">
                Pools Created by {profile.name || "User"}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ownedPools.map((pool) => (
                <div
                  key={pool.id}
                  className="border-2 border-white rounded-xl p-4 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white text-black flex items-center justify-center font-bold">
                      {pool.platform?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold">{pool.platform}</p>
                      <p className="text-xs text-gray-500 uppercase">
                        {pool.post_type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {pool.price_per_user && `₹${pool.price_per_user}/slot`}
                    </span>
                    <span className="text-green-500 font-bold">Open</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Actions Section (Report & Promote) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black uppercase tracking-tight">
              User Actions
            </h3>
          </div>
          <div className="flex flex-wrap gap-4 p-6 border-2 border-white/10 bg-[#0f0f0f] rounded-xl">
            <ReportUser reportedUserId={userId} />
            <div className="w-px bg-white/10 mx-2 self-stretch"></div>
            <PromoteUser targetUserId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}
