import CreatePoolForm from "@/components/create-pool/CreatePoolForm";
import { Shield, Fingerprint, Cog } from "lucide-react";
import RequestPoolForm from "@/components/create-pool/RequestPoolForm";

export default function RequestPoolPage() {
  return (
    <div className="flex min-h-[calc(100vh-2rem)] flex-col items-center py-12 px-4">
      <RequestPoolForm />

      <div className="mt-12 grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
        {/* Security */}
        <div className="border-4 border-black bg-white p-6">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <h3 className="font-black uppercase tracking-wider text-sm">Security</h3>
          </div>
          <p className="text-[10px] font-bold uppercase leading-tight text-gray-500">
            Payments are escrowed until verification.
          </p>
        </div>

        {/* Identity */}
        <div className="border-4 border-black bg-white p-6">
          <div className="mb-2 flex items-center gap-2">
            <Fingerprint className="h-5 w-5" />
            <h3 className="font-black uppercase tracking-wider text-sm">Identity</h3>
          </div>
          <p className="text-[10px] font-bold uppercase leading-tight text-gray-500">
            All members are identity-verified.
          </p>
        </div>

        {/* Automation */}
        <div className="border-4 border-black bg-white p-6">
          <div className="mb-2 flex items-center gap-2">
            <Cog className="h-5 w-5" />
            <h3 className="font-black uppercase tracking-wider text-sm">Automation</h3>
          </div>
          <p className="text-[10px] font-bold uppercase leading-tight text-gray-500">
            Renewals processed automatically.
          </p>
        </div>
      </div>
    </div>
  );
}