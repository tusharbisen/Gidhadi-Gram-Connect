import CandidateProfiles from "@/components/election/candidate-profiles"
import DemoPoll from "@/components/election/demo-poll"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Elections - Gram Panchayat Gidhadi",
  description: "Information about elections, candidates and voting in Gidhadi village",
}

export default function ElectionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-primary md:text-4xl">Elections</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <CandidateProfiles />
        <DemoPoll />
      </div>
    </div>
  )
}
