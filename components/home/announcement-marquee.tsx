
"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Marquee } from "@/components/ui/marquee";
import { memo } from "react";

const AnnouncementMarquee = () => {
  const { t } = useLanguage();

  // Memoize to prevent unnecessary re-renders
  const announcement = t("scrollmarquee");

  return (
    <div className="sticky top-[60px] md:top-[68px] z-40 border-b border-blue-100 shadow-sm">
      <Marquee text={announcement} />
    </div>
  );
};

// Memoize the component to prevent re-renders when parent updates
export default memo(AnnouncementMarquee);
