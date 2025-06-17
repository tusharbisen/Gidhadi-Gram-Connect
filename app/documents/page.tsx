import DocumentsList from "@/components/documents/documents-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Documents & Downloads - Gram Panchayat Gidhadi",
  description: "Official documents, forms and reports of Gram Panchayat Gidhadi",
}

export default function DocumentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-4xl">Documents & Downloads</h1>
      <DocumentsList />
    </div>
  )
}
