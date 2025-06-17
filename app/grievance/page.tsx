import ComplaintForm from "@/components/grievance/complaint-form"
import StatusTracker from "@/components/grievance/status-tracker"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grievance - Gram Panchayat Gidhadi",
  description: "Submit and track complaints to Gram Panchayat Gidhadi",
}

export default function GrievancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-4xl">Grievance Portal</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <ComplaintForm />
        <StatusTracker />
      </div>
    </div>
  )
}
