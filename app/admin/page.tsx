import AdminLogin from "@/components/admin/admin-login";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Admin Login - Gram Panchayat Gidhadi",
  description: "Admin login for Gram Panchayat Gidhadi officials",
};

export default function AdminPage() {
  return (
    <PageShell titleKey="adminLogin" fallbackTitle="Admin Login">
      <AdminLogin />
    </PageShell>
  );
}
