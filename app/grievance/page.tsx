import ComplaintForm from "@/components/grievance/complaint-form";
import StatusTracker from "@/components/grievance/status-tracker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Grievance & Track Complaints | Gidhadi Village Portal",
  description: "Submit and track complaints directly to the Gidhadi Gram Panchayat. Register civil issues, monitor your ticket status online, and get problems resolved quickly.",
  alternates: {
    canonical: "/grievance",
  },
};

export default function GrievancePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">Grievance Redressal & Complaint Tracking</h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Register your civil issues and monitor the status of your complaints with the Gidhadi Gram Panchayat.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        <ComplaintForm />
        <StatusTracker />
      </div>
    </div>
  );
}
