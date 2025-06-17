import AdminDashboard from "@/components/admin/admin-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Gram Panchayat Gidhadi",
  description: "Admin dashboard for Gram Panchayat Gidhadi officials",
}

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-4xl">Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  )
}
