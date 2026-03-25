
"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Marquee } from "@/components/ui/marquee";
import { memo } from "react";

const AnnouncementMarquee = () => {
  const { t } = useLanguage();

  // Memoize to prevent unnecessary re-renders
  const announcement = t("scrollmarquee");

  return <Marquee text={announcement} />;
};

// Memoize the component to prevent re-renders when parent updates
export default memo(AnnouncementMarquee);
