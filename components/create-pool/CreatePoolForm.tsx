"use client";

import { useState, useEffect } from "react";
import { createPool } from "@/app/console/create-pool/actions";
import {
  Loader2,
  TrendingDown,
  CheckSquare,
  Image,
  Check,
  ArrowBigLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

const SERVICES = [
  "ENTERTAINMENT",
  "MUSIC",
  "GAMING",
  "PRODUCTIVITY",
  "CREATIVE",
  "DEVELOPER",
  "EDUCATION",
  "VPN_SECURITY",
  "CLOUD_STORAGE",
  "AI_TOOLS",
  "OTHER",
];

const COMMON_TLDS = [
  ".com",
  ".in",
  ".org",
  ".net",
  ".io",
  ".co",
  ".ai",
  ".app",
  ".dev",
  ".tech",
  ".me",
  ".xyz",
  ".cloud",
  ".store",
  ".online",
];

export default function CreatePoolForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<string>("");
  const [slots, setSlots] = useState<string>("2");
  const [value, setValue] = useState<string>("");
  const [debounceValue, setDebounceValue] = useState<string>("");
  const [logoLink, setLogoLink] = useState<string>("");
  const [ownDetails, setOwnDetails] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  const calculatedShare =
    price && slots
      ? (parseFloat(price) / (parseInt(slots) + 1)).toFixed(2)
      : "0.00";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    console.log(event.currentTarget);
    const formData = new FormData(event.currentTarget);
    try {
      await createPool(formData);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (debounceValue.length < 3) return;
    if (!debounceValue.includes(".")) return;
    const hasDomain = COMMON_TLDS.some((tld) => debounceValue.endsWith(tld));
    if (!hasDomain) return;
    setLogoLink(
      `https://www.google.com/s2/favicons?domain=${debounceValue}&sz=256`,
    );
  }, [debounceValue]);

  return (
    <div className="w-full max-w-full md:max-w-6xl mx-auto border-4 border-white bg-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h1 className="text-5xl font-black uppercase leading-none tracking-tighter mb-2">
        Create
        <br />
        New Pool
      </h1>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8 border-b-4 border-black pb-4">
        Efficiency-driven subscription sharing
      </p>
      <div
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        onClick={() => router.push("/console/browse")}
      >
        <ArrowBigLeft className="h-5 w-5" />
        <span className="font-bold uppercase tracking-wider">
          Back to Browse
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Own Subscription Checkbox */}
        <div className="md:col-span-2 flex items-center gap-3 border-4 border-white p-4 bg-black">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="ownDetails"
              name="ownDetails"
              className="peer h-6 w-6 appearance-none border-4 border-white bg-black checked:bg-transparent"
              checked={ownDetails}
              onChange={(e) => setOwnDetails(e.target.checked)}
            />
            <Check className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 font-extrabold -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100" />
          </div>
          <label
            htmlFor="ownDetails"
            className="font-black uppercase tracking-wider cursor-pointer select-none"
          >
            I already own this subscription
          </label>
        </div>

        {/* pool name */}
        <div className="space-y-2">
          <label className="inline-block bg-[#DFFF00] px-2 py-1 text-xs font-black text-black uppercase tracking-widest border-2 border-black">
            Pool Name
          </label>
          <input
            name="poolName"
            type="text"
            placeholder="Enter Pool Name"
            className="w-full border-4 border-white p-3 font-bold outline-none text-xl no-spinner"
            required
          />
        </div>
        {/* Service Selection */}
        <div className="space-y-2">
          <label className="inline-block bg-[#DFFF00] px-2 py-1 text-xs font-black text-black uppercase tracking-widest border-2 border-black">
            Select Subscription Type
          </label>
          <div className="relative border-4 border-white">
            <select
              name="platform"
              className="w-full appearance-none bg-black p-4 font-bold uppercase outline-none"
              required
              defaultValue="a"
            >
              <option value="a" disabled hidden>
                Choose a Subscription Type
              </option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 border-l-2 border-black pl-2">
              ▼
            </div>
          </div>
        </div>
        {/* application link */}
        <div className="space-y-2">
          <label className="inline-block bg-[#DFFF00] px-2 py-1 text-xs font-black text-black uppercase tracking-widest border-2 border-black">
            Application Link
          </label>
          <div className="relative flex items-center gap-4">
            <input
              name="applicationLink"
              type="text"
              placeholder="example.com"
              className="flex-1 min-w-0 border-4 border-white p-4 font-bold outline-none bg-black text-white placeholder:text-gray-500"
              required
              onChange={(e) => setValue(e.target.value)}
            />
            {logoLink ? (
              <img
                src={logoLink}
                alt="App Icon"
                className="w-12 h-12 md:w-16 md:h-16 shrink-0 object-cover border-4 border-white"
              />
            ) : (
              <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 flex items-center justify-center border-4 border-white">
                <Image className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Total Price */}
        {ownDetails && (
          <div className="space-y-2">
            <label className="inline-block bg-[#DFFF00] px-2 py-1 text-xs font-black text-black uppercase tracking-widest border-2 border-black">
              Total Price
            </label>
            <div className="flex border-4 border-white bg-black items-center px-4">
              <span className="font-black text-xl mr-2">$</span>
              <input
                name="totalPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="w-full p-3 font-bold outline-none text-xl no-spinner"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required={ownDetails}
              />
            </div>
          </div>
        )}

        {/* Available Slots */}
        <div className="space-y-2">
          <label className="inline-block bg-[#DFFF00] px-2 py-1 text-xs font-black text-black uppercase tracking-widest border-2 border-black">
            Available Slots
          </label>
          <input
            name="totalSlots"
            type="number"
            min="1"
            max="10"
            className="w-full border-4 border-white p-3 font-bold outline-none text-xl no-spinner"
            value={slots}
            onChange={(e) => setSlots(e.target.value)}
            required
          />
        </div>

        {/* Reputation Required */}
        <div className="space-y-2">
          <label className="inline-block bg-[#DFFF00] px-2 py-1 text-xs font-black text-black uppercase tracking-widest border-2 border-black">
            Reputation Required
          </label>
          <input
            name="reputationRequired"
            type="number"
            min="0"
            className="w-full border-4 border-white p-3 font-bold outline-none text-xl no-spinner"
            defaultValue="1000"
            required
          />
        </div>

        {/* Expiry Date */}
        <div className="space-y-2">
          <label className="inline-block bg-[#DFFF00] px-2 py-1 text-xs font-black text-black uppercase tracking-widest border-2 border-black">
            Pool Ends On
          </label>
          <div className="flex border-4 border-white bg-black items-center px-4">
            <input
              name="expiryDate"
              type="date"
              min={today}
              className="w-full p-3 font-bold outline-none text-xl bg-black text-white uppercase white-spinner"
              required
            />
          </div>
        </div>

        {/* Rules */}
        <div className="space-y-2 md:col-span-2">
          <label className="inline-block bg-[#DFFF00] px-2 py-1 text-xs font-black text-black uppercase tracking-widest border-2 border-black">
            Pool Rules
          </label>
          <textarea
            name="description"
            rows={4}
            className="w-full border-4 border-white p-4 font-bold uppercase placeholder:text-gray-300 outline-none resize-none"
            placeholder="Describe your sharing terms..."
            required
          />
        </div>

        {/* Summary Card */}
        {ownDetails && (
          <div className="flex items-center justify-between border-4 border-white p-4 bg-black md:col-span-2">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-black text-white">
                <TrendingDown className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-black">
                  Your Shared Cost
                </p>
                <p className="text-2xl font-black tracking-tighter">
                  ${calculatedShare}{" "}
                  <span className="text-sm font-bold text-black">/mo</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider max-w-25 leading-tight">
                Automatic Split Verification Enabled
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden border-4 border-white bg-[#DFFF00] p-4 text-center font-black text-black uppercase tracking-widest transition-transform active:translate-y-1 hover:bg-[#ccff00] disabled:opacity-50 md:col-span-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" /> Creating...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Publish Post{" "}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
