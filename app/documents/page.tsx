import DocumentsList from "@/components/documents/documents-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents & Downloads - Gram Panchayat Gidhadi",
  description:
    "Official documents, forms and reports of Gram Panchayat Gidhadi",
};

export default function DocumentsPage() {
  return <DocumentsList />;
}
