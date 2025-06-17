"use client"

import { useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Briefcase, Heart, GraduationCap, ExternalLink } from "lucide-react"

const schemes = [
  {
    id: 1,
    titleKey: "pmay",
    descriptionKey: "pmayDesc",
    eligibilityKey: "pmayEligibility",
    type: "Central",
    icon: Home,
  },
  {
    id: 2,
    titleKey: "nrega",
    descriptionKey: "nregaDesc",
    eligibilityKey: "nregaEligibility",
    type: "Central",
    icon: Briefcase,
  },
  {
    id: 3,
    titleKey: "ayushman",
    descriptionKey: "ayushmanDesc",
    eligibilityKey: "ayushmanEligibility",
    type: "Central",
    icon: Heart,
  },
  {
    id: 4,
    titleKey: "samagraShiksha",
    descriptionKey: "samagraShikshaDesc",
    eligibilityKey: "samagraShikshaEligibility",
    type: "State",
    icon: GraduationCap,
  },
]

const SchemesList = () => {
  const { t } = useLanguage()
  const [filter, setFilter] = useState("All")

  const filteredSchemes = filter === "All" ? schemes : schemes.filter((scheme) => scheme.type === filter)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Central":
        return "bg-blue-100 text-blue-800"
      case "State":
        return "bg-green-100 text-green-800"
      case "Local":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      {/* Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">{t("governmentSchemes")}</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">{t("allSchemes")}</SelectItem>
            <SelectItem value="Central">{t("central")}</SelectItem>
            <SelectItem value="State">{t("state")}</SelectItem>
            <SelectItem value="Local">{t("local")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="scheme-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gov-blue/10 rounded-lg">
                    <scheme.icon className="h-6 w-6 text-gov-blue" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{t(scheme.titleKey)}</CardTitle>
                  </div>
                </div>
                <Badge className={getTypeColor(scheme.type)}>{t(scheme.type.toLowerCase())}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">{t(scheme.descriptionKey)}</p>
              <div className="mb-4">
                <h4 className="font-medium text-sm text-gray-900 mb-1">{t("eligibility")}:</h4>
                <p className="text-sm text-gray-600">{t(scheme.eligibilityKey)}</p>
              </div>
              <Button className="w-full" variant="outline">
                {t("learnMore")}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default SchemesList
