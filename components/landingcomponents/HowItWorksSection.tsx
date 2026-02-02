export default function HowItWorksSection() {
  return (
    <section className="py-20 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div>
            <div className="border-l-4 border-[#DFFF00] pl-6 py-2 mb-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Pick a Service
              </h3>
            </div>
            <p className="text-white/60 font-mono text-xs leading-relaxed">
              Browse the live feed. Find the subscription you need. Check
              availability instantly.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <div className="border-l-4 border-[#DFFF00] pl-6 py-2 mb-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Pay Your Share
              </h3>
            </div>
            <p className="text-white/60 font-mono text-xs leading-relaxed">
              Secure payment via escrow. Funds are only released when you get
              access.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <div className="border-l-4 border-[#DFFF00] pl-6 py-2 mb-6">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Get Access
              </h3>
            </div>
            <p className="text-white/60 font-mono text-xs leading-relaxed">
              Receive credentials instantly in your dashboard. Enjoy premium for
              peanuts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
