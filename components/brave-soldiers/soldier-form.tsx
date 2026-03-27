"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Loader2 } from "lucide-react";

export function SoldierForm() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const photoFile = formData.get("photo") as File;
    let base64Photo = undefined;
    if (photoFile && photoFile.size > 0) {
      if (photoFile.size > 5 * 1024 * 1024) {
        setError("Photo must be less than 5MB");
        setLoading(false);
        return;
      }
      try {
        base64Photo = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(photoFile);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      } catch (err) {
        setError("Failed to process photo");
        setLoading(false);
        return;
      }
    }

    const payload = {
      name: formData.get("name"),
      village: formData.get("village"),
      force: formData.get("force"),
      rank: formData.get("rank"),
      phone: formData.get("phone"),
      photo: base64Photo,
      message: formData.get("message"),
      isPublic: formData.get("isPublic") === "on",
    };

    try {
      const res = await fetch("/api/soldiers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-2xl text-center border-2 border-green-200">
        <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-green-600" />
        <h3 className="text-xl font-bold mb-2">Submission Received</h3>
        <p>Thank you for your submission. Our admins will review and approve it shortly.</p>
        <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white" onClick={() => setSuccess(false)}>
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 text-left max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-primary" />
        {t("share_your_story") || "Submit brave soldier details"}
      </h3>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm">{error}</div>}

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Full Name *</label>
            <input required name="name" type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. Nikhil Thakare" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Village/City *</label>
            <input required name="village" type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. Gidhadi" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Force/Regiment *</label>
            <input required name="force" type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. Indian Army" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Rank (Optional)</label>
            <input name="rank" type="text" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. Havildar" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Phone Number (Optional)</label>
            <input name="phone" type="tel" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Used by admins for verification only" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Upload Photo (Optional, max 5MB)</label>
            <input name="photo" type="file" accept="image/*" className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700">Short Message/Story (Optional)</label>
          <textarea name="message" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="Share a few words of respect..." />
        </div>

        <label className="flex items-center gap-3 cursor-pointer py-2">
          <input type="checkbox" name="isPublic" defaultChecked className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
          <span className="text-sm text-slate-600">Make this profile visible to the public once approved.</span>
        </label>

        <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl shadow-lg mt-4 text-base">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}
        </Button>
      </form>
    </div>
  );
}
