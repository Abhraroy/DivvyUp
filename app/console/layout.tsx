
// import Navbar from "@/components/consolecomponents/Navbar";
// import { ReactNode } from "react";

// export default function ConsoleLayout({ children }: { children: ReactNode }) {
//     return <>
//         <Navbar />
//         <div className="md:ml-64 pb-20 md:pb-0">
//             {children}
//         </div>

//     </>;
// }







import MobNavbar from "@/components/NavComponents/MobNavbar";
import Navbar from "@/components/NavComponents/Navbar";
import Image from "next/image";
import { ReactNode } from "react";
import {CircleSlash2} from "lucide-react"
export default function ConsoleLayout({ children }: { children: ReactNode }) {

    return (
        <>
            <div className="overflow-hidden flex flex-col md:flex md:flex-row h-screen w-full">
                <Navbar />
                <div className=" md:hidden flex items-center justify-center h-[5vh] p-2 gap-4 w-screen bg-brand-dark shrink-0 ">
                    <CircleSlash2 size={25} className="text-white" />
                    <span className="text-white font-bold text-xl tracking-tighter text-wrap">DivvyUP</span>
                </div>
                <div className="flex-1 min-h-0 min-w-0 overflow-y-auto custom-scrollbar">{children}</div>
                <MobNavbar className="md:hidden flex h-[10vh]  shrink-0 " />
            </div>
        </>
    );
}