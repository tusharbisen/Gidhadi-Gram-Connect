"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Marquee } from "@/components/ui/marquee"

const AnnouncementMarquee = () => {
  const { t } = useLanguage()

  // Latest announcement using translation keys
  const latestAnnouncement = {
    text: t("covidVaccinationDesc"),
    urgent: true,
  }

  return <Marquee text={latestAnnouncement.text} urgent={latestAnnouncement.urgent} />
}

export default AnnouncementMarquee
