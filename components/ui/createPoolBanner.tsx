"use client"
import {useRouter} from "next/navigation";

export default function CreatePoolBanner() {
    const router = useRouter();
    return (
        <div className="w-full bg-[#DFFF00] p-8 md:p-12 text-black flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tighter mb-2">
                    Don't See Your <br className="hidden md:block" /> Favorite Service?
                </h2>
                <p className="text-sm md:text-base font-bold uppercase tracking-widest mb-8 max-w-xl">
                    Post a requirement and we'll help you find partners to split the cost with in minutes.
                </p>
                <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
                    <button className="flex-1 bg-black text-white py-4 px-6 text-sm font-black uppercase tracking-widest hover:bg-gray-900 transition-colors"
                    onClick={() => router.push("/console/create-pool")}
                    >
                        Start a New Group
                    </button>
                    <button className="flex-1 border-2 border-black bg-transparent text-black py-4 px-6 text-sm font-black uppercase tracking-widest hover:bg-black/5 transition-colors"
                    onClick={() => router.push("/console/request-pool")}
                    >
                        Request a Pool
                    </button>
                </div>
            </div>
    );
}   