import AdminLogin from "@/components/admin/admin-login"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login - Gram Panchayat Gidhadi",
  description: "Admin login for Gram Panchayat Gidhadi officials",
}

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-4xl">Admin Login</h1>
      <AdminLogin />
    </div>
  )
}
