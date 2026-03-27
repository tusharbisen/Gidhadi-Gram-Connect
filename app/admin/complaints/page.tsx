import { connectToDatabase } from "@/lib/db";
import { Complaint } from "@/lib/models/complaint";
import { ComplaintAdminTable } from "@/components/admin/complaint-admin-table";
import { AlertCircle } from "lucide-react";
import { LogoutButton } from "@/components/admin/logout-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminComplaintsPage() {
  let allComplaints: any[] = [];

  try {
    await connectToDatabase();
    const docs = await Complaint.find().sort({ createdAt: -1 }).lean();
    allComplaints = JSON.parse(JSON.stringify(docs));
    
    // Ensure ids are serialized safely
    allComplaints = allComplaints.map(doc => ({
      ...doc,
      id: doc._id
    }));
  } catch (error) {
    console.error("Error fetching complaints for admin:", error);
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6 pt-24 md:pt-32">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 md:p-3 rounded-full shrink-0">
            <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Grievance Management
            </h1>
            <p className="text-sm md:text-base text-slate-600">
              Review, update, and resolve village complaints.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="sm" className="hidden sm:flex border-slate-200">Soldiers Directory</Button>
          </Link>
          <LogoutButton />
        </div>
      </div>

      <ComplaintAdminTable initialData={allComplaints} />
    </div>
  );
}
