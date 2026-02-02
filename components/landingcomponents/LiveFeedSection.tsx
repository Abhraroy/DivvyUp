import Link from "next/link";
import { ArrowRight, Music, Tv, Play, FileEdit, Shield } from "lucide-react";
import { ServiceCard, CreateGroupCard } from "./ServiceCard";

export default function LiveFeedSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 mb-10 flex justify-between items-end">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            Live Feed // Available Slots
          </h2>
        </div>

        <Link
          href="/browse"
          className="hidden md:flex items-center gap-2 text-[#DFFF00] font-bold text-sm uppercase tracking-wider hover:text-white transition-colors"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            name="Netflix Premium"
            price="4.50"
            slots={2}
            totalSlots={4}
            icon={<Tv size={20} className="text-white" />}
          />
          <ServiceCard
            name="Spotify Family"
            price="3.50"
            slots={1}
            totalSlots={6}
            icon={<Music size={20} className="text-white" />}
          />
          <ServiceCard
            name="Youtube Premium"
            price="2.50"
            slots={5}
            totalSlots={6}
            icon={<Play size={20} className="text-white" />}
          />
          <ServiceCard
            name="Adobe Creative Cloud"
            price="10.00"
            slots={2}
            totalSlots={10}
            icon={<FileEdit size={20} className="text-white" />}
          />
          <ServiceCard
            name="NordVPN"
            price="2.00"
            slots={0}
            totalSlots={6}
            icon={<Shield size={20} className="text-white" />}
            isFull={true}
          />

          {/* Create Group Call to Action */}
          <div className="h-full">
            <CreateGroupCard />
          </div>
        </div>

        <Link
          href="/browse"
          className="md:hidden mt-8 flex items-center justify-center gap-2 text-[#DFFF00] font-bold text-sm uppercase tracking-wider hover:text-white transition-colors"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
