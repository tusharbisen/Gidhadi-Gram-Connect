import AdminDashboard from "@/components/admin/admin-dashboard";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Admin Dashboard - Gram Panchayat Gidhadi",
  description: "Admin dashboard for Gram Panchayat Gidhadi officials",
};

export default function AdminDashboardPage() {
  return (
    <PageShell titleKey="adminDashboard" fallbackTitle="Admin Dashboard">
      <AdminDashboard />
    </PageShell>
  );
}
