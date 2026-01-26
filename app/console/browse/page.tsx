import { createClient } from "@/lib/supabase/server";
import { SubsCard } from "@/components/ui/subsCard";
import { BrowseFilters } from "@/components/browse/BrowseFilters";
import { Tv, Music, Video, ShoppingCart, Globe } from "lucide-react";
import CreatePoolBanner from "@/components/ui/createPoolBanner";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ platform?: string; type?: string }>;
}) {
  const params = await searchParams;
  const platformFilter = params.platform;
  const typeFilter = params.type;

  const supabase = await createClient();
  const { data: {user}, error: userError } = await supabase.auth.getUser();

  let query = supabase
    .from("subscription_posts")
    .select("*, owner_id(*)")
    .neq("owner_id",user?.id)
    .order("created_at", { ascending: false });

  if (platformFilter && platformFilter !== "All") {
    query = query.ilike("platform", `%${platformFilter}%`);
  }

  if (typeFilter && typeFilter !== "all") {
    query = query.eq("post_type", typeFilter);
  }

  const { data: posts, error } = await query;
  console.log(posts)

  if (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a0a0a] text-white">
      <div className="container mx-auto flex h-full max-w-7xl flex-col px-4 pt-8 pb-8">
        <header className="flex-none mb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Find Your Squad
          </h1>
          <p className="text-gray-400">
            Join a pool, split the cost, enjoy premium for less.
          </p>
        </header>

        <div className="flex-none mb-4">
          <BrowseFilters />
        </div>

        <div className="flex-none mb-8">
          <CreatePoolBanner />
        </div>

        <div className="flex-1">
          <div className=" min-h-fit flex flex-col">
            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {posts.map((post) => (
                  <SubsCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center border-2 border-dashed border-gray-800 rounded-lg py-12">
                <p className="text-lg font-bold text-gray-500">
                  No active pools found
                </p>
                <p className="text-sm text-gray-600">
                  Try adjusting your filters or start a new pool!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
