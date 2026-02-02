import Link from "next/link";

// import Link from 'next/link';
// keeping as is but changing styles
export default function LandingFooter() {
  return (
    <footer className="bg-[#0a0a0a] pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-[#DFFF00] font-black uppercase tracking-widest mb-6">
              Newsletter
            </h4>
            <p className="text-white/60 font-mono text-xs mb-4">
              Get notified about new slots for high-demand services.
            </p>
            <div className="flex max-w-md">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent border border-white/20 text-white font-mono text-sm p-3 w-full focus:outline-none focus:border-[#DFFF00]/50 placeholder:text-white/20"
              />
              <button className="bg-[#DFFF00] hover:bg-[#b0cc00] text-black font-bold uppercase px-6 text-sm transition-colors">
                Sub
              </button>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-6">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/browse"
                  className="text-white/60 hover:text-white font-mono text-xs uppercase transition-colors"
                >
                  Browse
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-white/60 hover:text-white font-mono text-xs uppercase transition-colors"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-white/60 hover:text-white font-mono text-xs uppercase transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/trust"
                  className="text-white/60 hover:text-white font-mono text-xs uppercase transition-colors"
                >
                  Trust & Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-white/60 hover:text-white font-mono text-xs uppercase transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/60 hover:text-white font-mono text-xs uppercase transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie"
                  className="text-white/60 hover:text-white font-mono text-xs uppercase transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 font-mono text-[10px] uppercase">
            © 2023 Share_Net Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-green-500 font-mono text-[10px] uppercase tracking-widest">
              Systems Normal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
