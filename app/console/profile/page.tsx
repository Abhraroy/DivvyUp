import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  User,
  Mail,
  Calendar,
  CreditCard,
  Users,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  Crown,
  Wallet,
} from "lucide-react";

export default async function Profile() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  // Fetch user's owned pools

  const [
    { data: profileData, error: profileError },
    { data: activePools, error: activePoolError },
    {data:ownedPools, error:ownedPoolError}
  ] = await Promise.all([
    supabase.from("profiles").select("created_at").eq("user_id", user.id).single(),
    supabase
      .from("subscription_members")
      .select("*,subscription_posts(*)")
      .eq("member_id", user.id),
    supabase
      .from("subscription_posts")
      .select("*")
      .eq("owner_id", user.id),
  ]);

  console.log("activePools", activePools);
  console.log("profileData", profileData);

  const joinedDate = new Date(profileData?.created_at).toLocaleDateString();
  console.log("joinedDate", joinedDate);

  //   const [{data: Act}, {data: joinedPools}] = await Promise.all([
  //     supabase
  //     .from("subscription_posts")
  //     .select("*")
  //     .eq("owner_id", user.id),
  //     supabase
  //     .from("subscription_members")
  //     .select("*, subscription_id(*)")
  //     .eq("member_id", user.id),
  //   ])

  //   const { data: ownedPools } = await supabase
  //     .from("subscription_posts")
  //     .select("*")
  //     .eq("owner_id", user.id);

  //   // Fetch user's joined pools
  //   const { data: joinedPools } = await supabase
  //     .from("pool_members")
  //     .select("*, pool_id(*)")
  //     .eq("user_id", user.id);

  //   console.log(ownedPools);
  //   console.log(joinedPools);

  //   const totalPools = (ownedPools?.length || 0) + (joinedPools?.length || 0);
  //   const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
  //     month: "long",
  //     year: "numeric",
  //   });

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      <div className="container mx-auto flex h-full max-w-7xl flex-col px-4 pt-8 pb-8">
        {/* Header */}
        <header className="flex-none mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Your Profile
          </h1>
          <p className="text-gray-400">
            Manage your account, subscriptions, and preferences.
          </p>
        </header>

        {/* Profile Card */}
        <div className="mb-8 border-4 border-[#DFFF00] rounded-sm p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-[#DFFF00] flex items-center justify-center text-3xl font-black uppercase">
                {user.email?.charAt(0) || "U"}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-gray-900"></div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-black tracking-tight">
                  {user.user_metadata?.full_name ||
                    user.email?.split("@")[0] ||
                    "User"}
                </h2>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-bold uppercase rounded-full">
                  Member
                </span>
              </div>
              <p className="text-gray-400 flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1 text-gray-500">
                  <Calendar className="h-4 w-4" />
                  Joined {joinedDate}
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Users className="h-4 w-4" />
                  {activePools?.length} Active Pool{activePools?.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button className="px-4 py-2 border-2 border-[#DFFF00] rounded-lg font-bold text-sm hover:border-white hover:bg-white hover:text-black transition-all duration-200">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="border-2 border-gray-800 rounded-xl bg-[#DFFF00] p-5">
            <div className="flex items-center justify-between mb-3">
              <Crown className="h-6 w-6 text-black" />
              <span className="text-xs font-bold text-black uppercase">
                Created Pools
              </span>
            </div>
            <p className="text-3xl text-black font-black">{activePools?.length || 0}</p>
            <p className="text-sm text-black">Pools Created</p>
          </div>

          <div className="border-2 border-gray-800 rounded-xl bg-[#DFFF00] p-5">
            <div className="flex items-center justify-between mb-3">
              <Users className="h-6 w-6 text-black" />
              <span className="text-xs font-bold text-black uppercase">
                Joined
              </span>
            </div>
            <p className="text-3xl text-black font-black">{activePools && ownedPools ? activePools?.length - ownedPools?.length : 0}</p>
            <p className="text-sm text-black">Pools Joined</p>
          </div>

          <div className="border-2 border-gray-800 rounded-xl bg-[#DFFF00] p-5">
            <div className="flex items-center justify-between mb-3">
              <Wallet className="h-6 w-6 text-black" />
              <span className="text-xs font-bold text-black uppercase">
                Savings
              </span>
            </div>
            <p className="text-3xl text-black font-black">₹0</p>
            <p className="text-sm text-black">Total Saved</p>
          </div>

          <div className="border-2 border-gray-800 rounded-xl bg-[#DFFF00] p-5">
            <div className="flex items-center justify-between mb-3">
              <Crown className="h-6 w-6 text-black" />
              <span className="text-xs font-bold text-black uppercase">
                Reputation
              </span>
            </div>
            <p className="text-3xl text-black font-black">1000</p>
            <p className="text-sm text-black">User Rating</p>
          </div>
        </div>

        {/* Settings Section */}
        <div className="mb-8">
          <h3 className="text-xl font-black uppercase tracking-tight mb-4">
            Account Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Account Settings */}
            <div className="border-2 border-gray-800 rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <div className="text-left">
                    <p className="font-bold">Personal Information</p>
                    <p className="text-sm text-gray-500">Update your details</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>

              <div className="border-t border-gray-800" />

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div className="text-left">
                    <p className="font-bold">Payment Methods</p>
                    <p className="text-sm text-gray-500">
                      Manage your payments
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>

              <div className="border-t border-gray-800" />

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <div className="text-left">
                    <p className="font-bold">Security</p>
                    <p className="text-sm text-gray-500">
                      Password & authentication
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Preferences */}
            <div className="border-2 border-gray-800 rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-gray-400" />
                  <div className="text-left">
                    <p className="font-bold">Preferences</p>
                    <p className="text-sm text-gray-500">
                      Notifications & display
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>

              <div className="border-t border-gray-800" />

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div className="text-left">
                    <p className="font-bold">Billing History</p>
                    <p className="text-sm text-gray-500">
                      View past transactions
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>

              <div className="border-t border-gray-800" />

              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="w-full flex items-center justify-between p-4 hover:bg-red-500/10 transition-colors text-red-500"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-bold">Sign Out</p>
                      <p className="text-sm text-red-400/70">
                        Log out of your account
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Active Pools Preview */}
        {activePools && activePools.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-black uppercase tracking-tight">
                Active Pools
              </h3>
              <a
                href="/console/browse"
                className="text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors"
              >
                View All →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activePools.map((pool) => (
                <div
                  key={pool.id}
                  className="border-2 border-white rounded-xl p-4 hover:border-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Crown className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold">{pool.subscription_posts.platform}</p>
                      <p className="text-xs text-gray-500 uppercase">
                        {pool.subscription_posts.post_type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {
                        pool.subscription_posts.price_per_user &&
                        `₹${pool.subscription_posts.price_per_user}/slot`
                      }
                    </span>
                    <span className="text-green-500 font-bold">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
