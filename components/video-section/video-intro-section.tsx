"use client";

import { useState, useRef, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Users, Briefcase, Smartphone } from "lucide-react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // start muted for mobile autoplay policy
  const [showControls, setShowControls] = useState(false);

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch((err) => {
        // Autoplay was blocked — user interaction needed
        console.warn("Play prevented:", err);
      });
    }
  }, [isPlaying]);

  const handleMuteToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = !isMuted;
    video.muted = next;
    setIsMuted(next);
  }, [isMuted]);

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
          <div
            className="relative bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-primary/20"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            onTouchStart={() => setShowControls((v) => !v)}
          >
            {/* Video */}
            <video
              ref={videoRef}
              className="w-full aspect-video"
              poster="/thumbel.png"
              muted={isMuted}
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              aria-label="Gidhadi Gram Connect introduction video"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Hover/touch overlay controls */}
            <div
              className={`absolute inset-0 bg-black/20 flex items-end justify-start p-3 sm:p-4 transition-opacity duration-300 ${
                showControls && isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayPause}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-800 shadow transition-transform hover:scale-105"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Play className="h-4 w-4 sm:h-5 sm:w-5 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={handleMuteToggle}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-800 shadow transition-transform hover:scale-105"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Centre play button — visible when paused */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <button
                  onClick={handlePlayPause}
                  className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-primary hover:bg-primary text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary"
                  aria-label="Play video"
                >
                  <Play className="h-6 w-6 sm:h-7 sm:w-7 ml-1" />
                </button>
              </div>
            )}
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