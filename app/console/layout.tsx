
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
import { ReactNode } from "react";
export default function ConsoleLayout({ children }: { children: ReactNode }) {

    return (
        <>
            <div className="overflow-hidden flex flex-col md:flex md:flex-row h-screen w-full">
                <Navbar />
                <div className="block md:hidden h-[5vh] w-screen bg-amber-600 shrink-0 ">f</div>
                <div className="flex-1 overflow-y-auto">{children}</div>
                <MobNavbar className="md:hidden flex h-[10vh]  shrink-0 " /> 
            </div>
            {/* <div className="md:hidden flex flex-col h-screen w-full overflow-hidden ">
                <div className="h-[5vh] w-screen bg-amber-600 shrink-0 ">f</div>
                <div className="flex-1 overflow-y-auto">{children}</div>
                <MobNavbar className=" h-[10vh]  shrink-0 " /> 
            </div> */}

        </>
    );
}