"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { memo, useMemo } from "react";

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
    date: "2025-07-01",
    urgent: true,
  },
];

const LatestAnnouncements = () => {
  const { t, language } = useLanguage();

  // Memoize sorted announcements (urgent first, then by date)
  const sortedAnnouncements = useMemo(() => {
    return [...announcements].sort((a, b) => {
      // Urgent items first
      if (a.urgent && !b.urgent) return -1;
      if (!a.urgent && b.urgent) return 1;
      // Then by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, []);

  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN";
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="mb-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          <CardTitle className="text-xl">{t("latestAnnouncements")}</CardTitle>
        </div>
        <Link href="/news">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            {t("viewAll")}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedAnnouncements.map((announcement, index) => (
            <div
              key={announcement.id}
              className={`border-b border-gray-100 pb-4 last:border-0 last:pb-0 transition-all duration-300 hover:bg-gray-50 rounded-lg p-3 -mx-3 ${
                announcement.urgent ? "bg-red-50/50" : ""
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  {announcement.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      URGENT
                    </Badge>
                  )}
                  {t(announcement.titleKey)}
                </h3>
              </div>
              <CardDescription className="mb-2 text-xs text-gray-500">
                {formatDate(announcement.date)}
              </CardDescription>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t(announcement.contentKey)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(LatestAnnouncements);