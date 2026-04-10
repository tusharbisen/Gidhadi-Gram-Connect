import SchemesList from "@/components/schemes/schemes-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government Schemes & Services | Gidhadi Village Portal",
  description:
    "Discover and apply for PM-KISAN, MGNREGA, and other Maharashtra government schemes. Check eligibility and access essential Gram Panchayat services online.",
  alternates: {
    canonical: "/schemes",
  },
};

export default function SchemesPage() {
  return <SchemesList />;
}
