import AdminLogin from "@/components/admin/admin-login";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login - Gram Panchayat Gidhadi",
  description: "Admin login for Gram Panchayat Gidhadi officials",
};

export default function AdminPage() {
  return <AdminLogin />;
}
