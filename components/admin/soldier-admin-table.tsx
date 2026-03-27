"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, ShieldAlert, Loader2 } from "lucide-react";
import { toast } from "sonner";
interface Soldier {
  id: string;
  name: string;
  village: string;
  force: string;
  rank: string | null;
  phone: string | null;
  photo: string | null;
  message: string | null;
  isPublic: boolean;
  status: string;
  createdAt: Date;
}
import { useLanguage } from "@/components/providers/language-provider"; // Using provider for multi-lingual if admin desires

interface Props {
  initialData: Soldier[];
}

export function SoldierAdminTable({ initialData }: Props) {
  const [soldiers, setSoldiers] = useState<Soldier[]>(initialData);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: "approved" | "rejected" | "pending") {
    setLoadingId(id);
    try {
      const res = await fetch(`/api/soldiers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setSoldiers((prev) => prev.map((s) => (s.id === id ? updated : s)));
      toast.success(`Status updated to ${status}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update status.");
    } finally {
      setLoadingId(null);
    }
  }

  async function deleteSoldier(id: string) {
    if (!window.confirm("Are you sure you want to permanently delete this application?")) return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/soldiers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setSoldiers((prev) => prev.filter((s) => s.id !== id));
      toast.success("Record deleted successfully.");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete record.");
    } finally {
      setLoadingId(null);
    }
  }

  if (soldiers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
        <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-lg font-medium text-slate-600">No applications found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Name / Village</th>
              <th className="px-6 py-4">Force / Rank</th>
              <th className="px-6 py-4">Status & Privacy</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {soldiers.map((soldier) => (
              <tr key={soldier.id} className="hover:bg-slate-50/50 transition-colors">
                
                {/* ── Name & Village ────────────────────────────── */}
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800 text-base">{soldier.name}</div>
                  <div className="text-slate-500 mt-1">{soldier.village}</div>
                  {soldier.phone && (
                    <div className="text-xs font-mono text-slate-400 mt-1">📞 {soldier.phone}</div>
                  )}
                  {soldier.photo && (
                    <a href={soldier.photo} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">View Photo</a>
                  )}
                </td>

                {/* ── Force & Rank ──────────────────────────────── */}
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-700">{soldier.force}</div>
                  <div className="text-slate-500">{soldier.rank || "—"}</div>
                </td>

                {/* ── Status & Privacy ──────────────────────────── */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      soldier.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : soldier.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {soldier.status}
                  </span>
                  <div className="mt-2 text-xs font-medium text-slate-500">
                    {soldier.isPublic ? "Public Directory" : "Private Only"}
                  </div>
                </td>

                {/* ── Actions ───────────────────────────────────── */}
                <td className="px-6 py-4 text-right align-middle">
                  <div className="flex items-center justify-end gap-2">
                    {soldier.status !== "approved" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                        onClick={() => updateStatus(soldier.id, "approved")}
                        disabled={loadingId === soldier.id}
                      >
                        {loadingId === soldier.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
                        Approve
                      </Button>
                    )}
                    
                    {soldier.status !== "rejected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                        onClick={() => updateStatus(soldier.id, "rejected")}
                        disabled={loadingId === soldier.id}
                      >
                         <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50 ml-2"
                      onClick={() => deleteSoldier(soldier.id)}
                      disabled={loadingId === soldier.id}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
