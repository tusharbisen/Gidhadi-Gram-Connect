"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, ShieldAlert, Loader2, Image as ImageIcon, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { complaintStatusSchema, ComplaintStatusValues } from "@/lib/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Complaint {
  id: string; 
  referenceId: string;
  fullName: string;
  phoneNumber: string;
  complaintType: string;
  description: string;
  photo?: string;
  status: "pending" | "inProgress" | "resolved" | "rejected";
  remarks?: string;
  createdAt: string;
}

export function ComplaintAdminTable({ initialData }: { initialData: Complaint[] }) {
  const [complaints, setComplaints] = useState<Complaint[]>(initialData);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  
  // State for the update dialog
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const form = useForm<ComplaintStatusValues>({
    resolver: zodResolver(complaintStatusSchema),
    defaultValues: {
      status: "pending",
      remarks: "",
    },
    mode: "onChange",
  });

  const openUpdateDialog = (complaint: Complaint, targetStatus?: "pending" | "inProgress" | "resolved" | "rejected") => {
    setSelectedComplaint(complaint);
    form.reset({
      status: targetStatus || complaint.status,
      remarks: complaint.remarks || "",
    });
    setUpdateDialogOpen(true);
  };

  const onUpdateSubmit = async (data: ComplaintStatusValues) => {
    if (!selectedComplaint) return;
    
    setLoadingId(selectedComplaint.referenceId);
    try {
      const res = await fetch(`/api/complaints/${selectedComplaint.referenceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update status");
      }
      const updated = await res.json();
      setComplaints((prev) => prev.map((c) => (c.referenceId === selectedComplaint.referenceId ? { ...c, status: updated.status, remarks: updated.remarks } : c)));
      toast.success(`Status updated to ${data.status}`);
      setUpdateDialogOpen(false);
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

  const isSubmittingUpdate = loadingId === selectedComplaint?.referenceId;

  return (
    <>
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
                            
                            {complaint.remarks && (
                              <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">Admin Remarks</p>
                                <p className="text-sm mt-1 text-blue-800 bg-blue-50/50 p-3 rounded-lg border border-blue-100 leading-relaxed italic">
                                  "{complaint.remarks}"
                                </p>
                              </div>
                            )}

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
                          <Button size="sm" variant="outline" className="text-blue-600 bg-blue-50 hover:bg-blue-100 border-none px-3" onClick={() => openUpdateDialog(complaint)}>
                            Update Status
                          </Button>
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

      {/* Update Status Dialog */}
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
          </DialogHeader>
          {selectedComplaint && (
            <div className="mt-4">
              <div className="mb-4 text-sm text-gray-600">
                Updating <span className="font-bold text-gray-900">{selectedComplaint.referenceId}</span>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onUpdateSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmittingUpdate}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="inProgress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="remarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Remarks {form.watch("status") === "resolved" && <span className="text-red-500">*</span>}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter remarks for the citizen..."
                            className={`resize-none ${form.formState.errors.remarks ? "border-red-500" : ""}`}
                            rows={3}
                            disabled={isSubmittingUpdate}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setUpdateDialogOpen(false)}
                      disabled={isSubmittingUpdate}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmittingUpdate}>
                      {isSubmittingUpdate ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
