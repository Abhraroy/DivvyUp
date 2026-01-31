"use client"
import { Home, MessageSquareText, Settings, TvMinimal, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MobNavbarProps = {
    className?: string;
};

export default function MobNavbar({ className = "" }: MobNavbarProps) {
    const pathname = usePathname();
    const NAV_ITEMS = [
        { label: 'Dashboard', icon: Home, href: '/console' },
        { label: 'Browse', icon: TvMinimal, href: '/console/browse' },
        { label: 'Chat', icon: MessageSquareText, href: '/console/chat' },
        { label: 'Settings', icon: Settings, href: '/console/settings' },
    ];
    return (
        <nav
            className={`md:hidden  w-full bg-black  backdrop-blur-md border-t border-white/10 px-6 py-4 flex justify-between items-center ${className}`}
        >
            {NAV_ITEMS.map((item: any) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                    <Link 
                        key={item.href} 
                        href={item.href} 
                        className={`flex flex-col items-center gap-1 ${isActive ? 'text-brand-blue' : 'text-white/50'}`}
                    >   <Icon size={20} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                    </Link>
                )
            })}
            <button className="flex flex-col items-center gap-1 text-white/50">
                <User size={20} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
            </button>
        </nav>
    )
}