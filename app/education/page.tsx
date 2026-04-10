import EducationResources from "@/components/education/education-resources";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educational Resources | Gidhadi Village Portal",
  description: "Best free YouTube channels for every student — from KG to Degree.",
  alternates: {
    canonical: "/education",
  },
};

export default function EducationPage() {
  return <EducationResources />;
}
