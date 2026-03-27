"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ShieldAlert, Loader2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Complaint {
  id: string; 
  referenceId: string;
  fullName: string;
  phoneNumber: string;
  complaintType: string;
  description: string;
  photo?: string;
  status: "pending" | "inProgress" | "resolved" | "rejected";
  createdAt: string;
}

export function ComplaintAdminTable({ initialData }: { initialData: Complaint[] }) {
  const [complaints, setComplaints] = useState<Complaint[]>(initialData);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const updateStatus = async (referenceId: string, status: string) => {
    setLoadingId(referenceId);
    try {
      const res = await fetch(`/api/complaints/${referenceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setComplaints((prev) => prev.map((c) => (c.referenceId === referenceId ? { ...c, status: updated.status } : c)));
      toast.success(`Status updated to ${status}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update status.");
    } finally {
      setLoadingId(null);
    }
  };

  const deleteComplaint = async (referenceId: string) => {
    if (!confirm("Are you sure you want to delete this complaint permanently?")) return;
    setLoadingId(referenceId);
    try {
      const res = await fetch(`/api/complaints/${referenceId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setComplaints((prev) => prev.filter((c) => c.referenceId !== referenceId));
      toast.success("Complaint deleted successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete record.");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-100 text-amber-800";
      case "inProgress": return "bg-blue-100 text-blue-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (complaints.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <ShieldAlert className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No complaints found</h3>
        <p className="mt-2 text-sm text-gray-500">There are no complaints submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
            <tr>
              <th className="px-6 py-4 font-semibold">Reference ID</th>
              <th className="px-6 py-4 font-semibold">Citizen</th>
              <th className="px-6 py-4 font-semibold">Type</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {complaints.map((complaint) => {
              const isLoading = loadingId === complaint.referenceId;
              
              return (
                <tr key={complaint.referenceId} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-gray-700">
                    {complaint.referenceId}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{complaint.fullName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{complaint.phoneNumber}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-left group outline-none">
                          <p className="font-medium text-primary capitalize">{complaint.complaintType.replace(/([A-Z])/g, ' $1').trim()}</p>
                          <p className="text-xs text-gray-400 mt-0.5 max-w-[150px] truncate group-hover:text-primary transition-colors">
                            {complaint.description}
                          </p>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Complaint Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase">Description</p>
                            <p className="text-sm mt-1 text-gray-800 bg-gray-50 p-3 rounded-lg border leading-relaxed">{complaint.description}</p>
                          </div>
                          {complaint.photo ? (
                            <div>
                               <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Attached Photo</p>
                               <div className="relative w-full aspect-video rounded-lg overflow-hidden border bg-gray-50">
                                 <Image src={complaint.photo} alt="Photo Evidence" fill className="object-contain" />
                               </div>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400 italic">No photo attached by the user.</p>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`${getStatusColor(complaint.status)} capitalize px-2.5 py-1 text-xs border-0 shadow-none`}>
                      {complaint.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap flex justify-end">
                    {isLoading ? (
                      <div className="inline-flex justify-end w-full pr-4">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        {complaint.status === "pending" && (
                          <Button size="sm" variant="outline" className="text-blue-600 bg-blue-50 hover:bg-blue-100 border-none px-3" onClick={() => updateStatus(complaint.referenceId, "inProgress")}>
                            Investigate
                          </Button>
                        )}
                        {(complaint.status === "pending" || complaint.status === "inProgress") && (
                          <Button size="sm" variant="outline" className="text-green-600 bg-green-50 hover:bg-green-100 border-none px-3" onClick={() => updateStatus(complaint.referenceId, "resolved")}>
                            Resolve
                          </Button>
                        )}
                        {complaint.status !== "rejected" && complaint.status !== "resolved" && (
                          <Button size="sm" variant="outline" className="text-amber-600 bg-amber-50 hover:bg-amber-100 border-none px-3" onClick={() => updateStatus(complaint.referenceId, "rejected")}>
                            Reject
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700 bg-white" onClick={() => deleteComplaint(complaint.referenceId)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
