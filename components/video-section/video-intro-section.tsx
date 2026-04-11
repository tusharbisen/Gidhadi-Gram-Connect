"use client";

import { Users, Briefcase, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";

// ─── Constants ────────────────────────────────────────────────────────────────

const VIDEO_SRC =
  "https://res.cloudinary.com/dy1w6zqom/video/upload/v1753786003/Gidhadi_Gram_connect_1_sbwhpq.mp4";

const FEATURE_CARDS = [
  {
    icon: Users,
    emoji: "🏘️",
    titleKey: "featureCommunity",
    descKey: "featureCommunityDesc",
    fallbackTitle: "Community Connection",
    fallbackDesc:
      "Connecting villagers, sharing resources, and building stronger community bonds.",
    color: "text-primary",
  },
  {
    icon: Briefcase,
    emoji: "💼",
    titleKey: "featureServices",
    descKey: "featureServicesDesc",
    fallbackTitle: "Local Services",
    fallbackDesc:
      "Access to local businesses, government services, and essential information.",
    color: "text-teal-700",
  },
  {
    icon: Smartphone,
    emoji: "📱",
    titleKey: "featureDigital",
    descKey: "featureDigitalDesc",
    fallbackTitle: "Digital Innovation",
    fallbackDesc:
      "Modern technology meeting traditional village life for better living.",
    color: "text-primary",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function VideoIntroSection() {
  const { t } = useLanguage();
  return (
    <section className="w-full py-10 sm:py-14 md:py-20 bg-gradient-to-br from-primary/5 via-white to-primary/5 mt-5 rounded-2xl border border-primary/20 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Village · Gram · गाव
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-3 leading-tight tracking-tight">
            "गिधाडी ग्राम कनेक्ट म्हणजे काय?"
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary mb-4">
            {t("whatIsGidhadiGramTitle")}
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t("whatIsGidhadiGramSubtitle")}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-1 w-8 rounded-full bg-primary/40" />
            <div className="h-1 w-16 rounded-full bg-primary" />
            <div className="h-1 w-8 rounded-full bg-primary/40" />
          </div>
        </div>

        {/* ── Video Player ─────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-primary/20">
            {/* Native Video */}
            <video
              className="w-full aspect-video"
              poster="/thumbel.png"
              controls
              playsInline
              preload="metadata"
              aria-label="Gidhadi Gram Connect introduction video"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* ── Feature Cards ───────────────────────────────────────────── */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {FEATURE_CARDS.map(
              ({ icon: Icon, emoji, titleKey, descKey, fallbackTitle, fallbackDesc, color }) => (
                <div
                  key={titleKey}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 text-center"
                >
                  <div className="text-2xl mb-2" aria-hidden="true">
                    {emoji}
                  </div>
                  <h4 className={`text-sm sm:text-base font-bold mb-1.5 ${color}`}>
                    {t(titleKey) !== titleKey ? t(titleKey) : fallbackTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {t(descKey) !== descKey ? t(descKey) : fallbackDesc}
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <div className="text-center mt-8 sm:mt-10">
          <Button
            size="lg"
            onClick={() => window.open("https://chat.whatsapp.com/KeddNQWgeb94SSGnZYxCDy", "_blank", "noopener,noreferrer")}
            className="bg-primary hover:bg-primary active:bg-primary text-white px-7 sm:px-9 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full shadow-lg hover:shadow-primary/20 transition-all duration-200 hover:scale-105"
          >
            {t("joinCommunityBtn") !== "joinCommunityBtn"
              ? t("joinCommunityBtn")
              : "Join Gidhadi Gram Community"}
          </Button>
        </div>

      </div>
    </section>
  );
}