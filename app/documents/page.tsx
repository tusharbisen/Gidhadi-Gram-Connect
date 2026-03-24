import DocumentsList from "@/components/documents/documents-list";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Documents & Downloads - Gram Panchayat Gidhadi",
  description: "Official documents, forms and reports of Gram Panchayat Gidhadi",
};

export default function DocumentsPage() {
  return (
    <PageShell
      titleKey="documentsDownloads"
      fallbackTitle="Documents & Downloads"
    >
      <DocumentsList />
    </PageShell>
  );
}
