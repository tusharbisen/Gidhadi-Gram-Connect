import SchemesList from "@/components/schemes/schemes-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Schemes & Services - Gram Panchayat Gidhadi",
  description: "Government schemes and services available for Gidhadi village residents",
}

export default function SchemesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-4xl">Schemes & Services</h1>
      <SchemesList />
    </div>
  )
}
