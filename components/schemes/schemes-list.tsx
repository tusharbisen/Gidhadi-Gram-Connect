"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Wheat,
  Heart,
  Users,
  GraduationCap,
  Briefcase,
  Building2,
  Calendar,
  IndianRupee,
  Languages,
} from "lucide-react"

// Sample scheme data
const schemes = [
  {
    id: 1,
    name: "PM-KISAN Samman Nidhi",
    category: "Agriculture",
    type: "Central",
    description: "Direct income support to small and marginal farmers",
    benefits: "₹6,000/year",
    deadline: "Ongoing",
    eligibility: "Small & marginal farmers",
  },
  {
    id: 2,
    name: "Mahatma Jyotiba Phule Jan Arogya Yojana",
    category: "Health & Insurance",
    type: "Maharashtra",
    description: "Health insurance coverage for families",
    benefits: "₹1.5 lakh/year",
    deadline: "31st March 2024",
    eligibility: "BPL families",
  },
  {
    id: 3,
    name: "Pradhan Mantri Matru Vandana Yojana",
    category: "Women & Children",
    type: "Central",
    description: "Maternity benefit for pregnant and lactating mothers",
    benefits: "₹5,000",
    deadline: "Ongoing",
    eligibility: "Pregnant women",
  },
  {
    id: 4,
    name: "Lek Ladki Yojana",
    category: "Women & Children",
    type: "Maharashtra",
    description: "Financial assistance for girl child education",
    benefits: "₹75,000 total",
    deadline: "Ongoing",
    eligibility: "Girl children",
  },
  {
    id: 5,
    name: "PM Scholarship Scheme",
    category: "Education & Youth",
    type: "Central",
    description: "Scholarships for higher education",
    benefits: "₹2,500/month",
    deadline: "15th October 2024",
    eligibility: "Merit students",
  },
  {
    id: 6,
    name: "MGNREGA",
    category: "Employment",
    type: "Central",
    description: "Guaranteed employment for rural households",
    benefits: "₹309/day",
    deadline: "Ongoing",
    eligibility: "Rural households",
  },
  {
    id: 7,
    name: "Pradhan Mantri Awas Yojana - Gramin",
    category: "Rural Development",
    type: "Central",
    description: "Housing assistance for rural poor",
    benefits: "₹1.2 lakh",
    deadline: "31st March 2024",
    eligibility: "Homeless families",
  },
  {
    id: 8,
    name: "Krishi Sinchan Yojana",
    category: "Agriculture",
    type: "Maharashtra",
    description: "Irrigation support for farmers",
    benefits: "50% subsidy",
    deadline: "30th November 2024",
    eligibility: "All farmers",
  },
]

const categories = [
  { id: "All", name: "All", icon: FileText },
  { id: "Agriculture", name: "Agriculture", icon: Wheat },
  { id: "Health & Insurance", name: "Health & Insurance", icon: Heart },
  { id: "Women & Children", name: "Women & Children", icon: Users },
  { id: "Education & Youth", name: "Education & Youth", icon: GraduationCap },
  { id: "Employment", name: "Employment", icon: Briefcase },
  { id: "Rural Development", name: "Rural Development", icon: Building2 },
]

export default function GidhadiGramConnect() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [language, setLanguage] = useState("English")

  const filteredSchemes =
    activeCategory === "All" ? schemes : schemes.filter((scheme) => scheme.category === activeCategory)

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-500 to-sky-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore Government Schemes for You</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Central and Maharashtra-specific schemes to support farmers, women, students, and rural families
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100">
              Browse All Schemes
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-sky-600 bg-transparent"
            >
              Check Eligibility
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-8 bg-white shadow-md">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-sky-100 data-[state=active]:text-sky-700"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-xs hidden sm:block">{category.name}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemes.map((scheme) => (
                <Card key={scheme.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant={scheme.type === "Central" ? "default" : "secondary"}
                        className={
                          scheme.type === "Central" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"
                        }
                      >
                        {scheme.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{scheme.name}</CardTitle>
                    <CardDescription className="text-sm">{scheme.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2">
                      <div className="flex items-center text-sky-600 font-semibold">
                        <IndianRupee className="w-4 h-4 mr-1" />
                        <span>{scheme.benefits}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Deadline: {scheme.deadline}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Eligibility:</strong> {scheme.eligibility}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Check Eligibility
                    </Button>
                    <Button size="sm" className="flex-1 bg-sky-600 hover:bg-sky-700">
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No schemes found in this category.</p>
          </div>
        )}
      </main>

      {/* Language Toggle Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-sky-600 hover:bg-sky-700"
        onClick={() => setLanguage(language === "English" ? "Marathi" : "English")}
      >
        <Languages className="w-6 h-6" />
      </Button>
    </div>
  )
}
