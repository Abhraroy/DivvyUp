import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SubsCard } from "@/components/ui/subsCard";
import { Plus, Crown, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default async function ConsolePage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  // Fetch user's created pools
  const { data: createdPools, error: poolsError } = await supabase
    .from("subscription_posts")
    .select("*, owner_id(*)")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  // Fetch stats
  const { data: allJoinedPools } = await supabase
    .from("subscription_members")
    .select("*")
    .eq("member_id", user.id);

  const totalCreated = createdPools?.length || 0;
  const totalJoined = allJoinedPools?.length || 0;

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      <div className="container mx-auto flex h-full max-w-7xl flex-col px-4 pt-8 pb-8">
        {/* Header */}
        <header className="flex-none mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">
            Manage your pools and track your subscriptions.
          </p>
        </header>

        {/* Promo Banner */}
        <div className="mb-8 relative overflow-hidden rounded-2xl bg-[#DFFF00] p-[2px]">
          <div className="relative bg-[#0a0a0a] rounded-2xl p-6 md:p-8">
            <div className="absolute inset-0 bg-[#DFFF00]  rounded-2xl" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-purple-500 text-gray-900 text-xs font-bold uppercase rounded-full animate-pulse">
                    New
                  </span>
                  <span className="text-xs font-bold text-gray-900 uppercase">
                    Split & Save
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl text-black font-black tracking-tight mb-2">
                  Why Pay Full Price?
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-950 to-blue-600">
                    {" "}
                    Split It!
                  </span>
                </h2>
                <p className="text-gray-900 text-sm md:text-base max-w-xl">
                  Share Netflix, Spotify, YouTube Premium & more. Save up to{" "}
                  <span className="text-green-900 font-bold">75%</span> on your
                  subscriptions every month.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/console/create-pool"
                  className="px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider hover:bg-gray-200 hover:text-black transition-colors whitespace-nowrap"
                >
                  Start a Pool
                </Link>
                <Link
                  href="/console/browse"
                  className="px-6 py-3 border-2 border-black text-black font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors whitespace-nowrap"
                >
                  Browse Pools
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="border-2 border-[#DFFF00] rounded-xl bg-gray-900/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <Crown className="h-6 w-6 text-[#DFFF00]" />
              <span className="text-xs font-bold text-gray-500 uppercase">
                Created
              </span>
            </div>
            <p className="text-3xl font-black">{totalCreated}</p>
            <p className="text-sm text-gray-500">Pools You Own</p>
          </div>

          <div className="border-2 border-[#DFFF00] rounded-xl bg-gray-900/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <Users className="h-6 w-6 text-[#DFFF00]" />
              <span className="text-xs font-bold text-gray-500 uppercase">
                Joined
              </span>
            </div>
            <p className="text-3xl font-black">{totalJoined}</p>
            <p className="text-sm text-gray-500">Pools You're In</p>
          </div>

          <div className="border-2 border-[#DFFF00] rounded-xl bg-gray-900/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="h-6 w-6 text-[#DFFF00]" />
              <span className="text-xs font-bold text-gray-500 uppercase">
                Active
              </span>
            </div>
            <p className="text-3xl font-black">{totalCreated + totalJoined}</p>
            <p className="text-sm text-gray-500">Total Active</p>
          </div>
        </div>

        {/* Your Pools Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Pools/Requests Created By You
            </h2>
            <Link
              href="/console/create-pool"
              className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create Pool
            </Link>
          </div>

          {createdPools && createdPools.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {createdPools.map((post) => (
                <SubsCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-800 rounded-lg py-16">
              <Crown className="h-12 w-12 text-gray-700 mb-4" />
              <p className="text-lg font-bold text-gray-500 mb-2">
                No pools created yet
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Start your first pool and share subscriptions
              </p>
              <Link
                href="/console/create-pool"
                className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create Your First Pool
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/console/browse"
            className="border-2 border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors group"
          >
            <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-purple-400 transition-colors">
              Browse Pools →
            </h3>
            <p className="text-sm text-gray-500">
              Find and join subscription pools from other users
            </p>
          </Link>

          <Link
            href="/console/chat"
            className="border-2 border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors group"
          >
            <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-purple-400 transition-colors">
              Messages →
            </h3>
            <p className="text-sm text-gray-500">
              Chat with pool members and manage requests
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
