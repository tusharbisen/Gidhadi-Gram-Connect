import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal - Gram Panchayat Gidhadi",
  description: "Secure admin management portal",
};

export default function AdminPage() {
  redirect("/admin/dashboard");
}
