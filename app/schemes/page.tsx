import SchemesList from "@/components/schemes/schemes-list";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Schemes & Services - Gram Panchayat Gidhadi",
  description:
    "Government schemes and services available for Gidhadi village residents",
};

export default function SchemesPage() {
  return (
    <PageShell titleKey="schemes" fallbackTitle="Schemes & Services">
      <SchemesList />
    </PageShell>
  );
}
