"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Home, Settings, MessageSquareText, LogOut, User } from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Dashboard', icon: Home, href: '/console' },
    { label: 'Browse', icon: Settings, href: '/console/browse' },
    { label: 'Chat', icon: MessageSquareText, href: '/console/chat' },
];

export default function Navbar() {
    const pathname = usePathname();

  return (
    <>
        {/* Desktop Sidebar */}
        <nav className="hidden md:flex flex-col h-screen w-64 bg-brand-dark/95 backdrop-blur-md border-r border-white/10 z-50">
            <div className="p-6">
                <Link href="/console" className="flex items-center gap-2 group mb-8">
                    <div className="bg-brand-blue p-1.5 rounded-sm group-hover:bg-brand-blue-hover transition-colors">
                        <LayoutGrid size={24} className="text-white  " />
                    </div>
                    <span className="text-white font-black text-xl tracking-tighter text-wrap">
                        SPLITSUB
                    </span>
                </Link>

                <div className="flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => {
                         const Icon = item.icon;
                         const isActive = pathname === item.href;
                         return (
                            <Link 
                                key={item.href} 
                                href={item.href} 
                                className={`flex items-center gap-3 px-4 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all ${isActive ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                            >
                                <Icon size={18} className={isActive ? "text-brand-blue" : ""} />
                                {item.label}
                            </Link>
                         )
                    })}
                </div>
            </div>

            <div className="mt-auto p-6 border-t border-white/10">
                 <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-sm font-bold text-xs uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/5 transition-all">
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </nav>

        {/* Mobile Top Header */}
        {/* <header className="md:hidden fixed top-0 left-0 w-full bg-brand-dark/95 backdrop-blur-md border-b border-white/10 z-50 px-6 py-4 flex justify-between items-center">
            <Link href="/console" className="flex items-center gap-2 group">
                 <div className="bg-brand-blue p-1.5 rounded-sm">
                    <LayoutGrid size={20} className="text-white" />
                </div>
                <span className="text-white font-black text-lg tracking-tighter">
                    SPLITSUB
                </span>
            </Link>
             <button className="text-white/50 hover:text-white transition-colors">
                <LogOut size={20} />
            </button>
        </header> */}

        {/* Mobile Bottom Bar */}
        {/* <nav className="md:hidden fixed bottom-0 left-0 w-full bg-brand-dark/95 backdrop-blur-md border-t border-white/10 z-50 px-6 py-4 flex justify-between items-center">
             {NAV_ITEMS.map((item) => {
                 const Icon = item.icon;
                 const isActive = pathname === item.href;
                 return (
                    <Link 
                        key={item.href} 
                        href={item.href} 
                        className={`flex flex-col items-center gap-1 ${isActive ? 'text-brand-blue' : 'text-white/50'}`}
                    >
                        <Icon size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                    </Link>
                 )
            })}
             <button className="flex flex-col items-center gap-1 text-white/50">
                <User size={20} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
            </button>
        </nav> */}
    </>
  );
}
