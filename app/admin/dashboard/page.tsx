import AdminDashboard from "@/components/admin/admin-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Gram Panchayat Gidhadi",
  description: "Admin dashboard for Gram Panchayat Gidhadi officials",
};

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
