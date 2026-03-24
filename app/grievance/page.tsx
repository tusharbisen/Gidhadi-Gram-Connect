import ComplaintForm from "@/components/grievance/complaint-form";
import StatusTracker from "@/components/grievance/status-tracker";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Grievance - Gram Panchayat Gidhadi",
  description: "Submit and track complaints to Gram Panchayat Gidhadi",
};

export default function GrievancePage() {
  return (
    <PageShell titleKey="grievancePortal" fallbackTitle="Grievance Portal">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        <ComplaintForm />
        <StatusTracker />
      </div>
    </PageShell>
  );
}
