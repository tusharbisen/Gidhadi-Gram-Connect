"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const announcements = [
  {
    id: 1,
    titleKey: "covidVaccination",
    contentKey: "covidVaccinationDesc",
    date: "2023-06-15",
    urgent: false,
  },
  {
    id: 2,
    titleKey: "waterSupplyInterruption",
    contentKey: "waterSupplyInterruptionDesc",
    date: "2023-06-10",
    urgent: true,
  },
  {
    id: 3,
    titleKey: "gramSabhaMeeting",
    contentKey: "gramSabhaMeetingDesc",
    date: "2023-06-05",
    urgent: false,
  },
]

const LatestAnnouncements = () => {
  const { t } = useLanguage()

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("latestAnnouncements")}</CardTitle>
        <Link href="/news">
          <Button variant="ghost" size="sm" className="text-primary">
            {t("viewAll")}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <h3 className="mb-1 font-semibold">{t(announcement.titleKey)}</h3>
              <CardDescription className="mb-2 text-xs">
                {new Date(announcement.date).toLocaleDateString()}
              </CardDescription>
              <p className="text-sm text-gray-700">{t(announcement.contentKey)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestAnnouncements
