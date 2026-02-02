export default function StatsSection() {
  return (
    <section className="w-full border-b border-white/10 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {/* Stat 1 */}
          <div className="py-12 md:px-8">
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#DFFF00]"></span>
              System Uptime
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              99.9<span className="text-[#DFFF00] text-2xl">%</span>
            </h2>
          </div>

          {/* Stat 2 */}
          <div className="py-12 md:px-8">
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#DFFF00]"></span>
              Total Saved
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              $500K<span className="text-[#DFFF00] text-2xl">+</span>
            </h2>
          </div>

          {/* Stat 3 */}
          <div className="py-12 md:px-8">
            <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1 h-3 bg-[#DFFF00]"></span>
              Verified Hosts
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              100<span className="text-[#DFFF00] text-2xl">%</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
