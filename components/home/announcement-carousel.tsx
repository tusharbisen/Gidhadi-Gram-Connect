"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar, ChevronLeft, ChevronRight, X, Megaphone } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const announcements = [
  {
    id: 1,
    title: {
      en: "📢 Welcome to Gidhadi Gram Connect – Your Village, Now Online!",
      hi: "📢 गिधाड़ी ग्राम कनेक्ट में आपका स्वागत है – अब गांव की जानकारी ऑनलाइन!",
      mr: "📢 गिधाडी ग्राम कनेक्टमध्ये तुमचं स्वागत आहे – आता गावाची माहिती ऑनलाइन!",
    },
    date: "2023-06-20",
    urgent: false,
    content: {
      en: "Welcome to Gidhadi Gram Connect – Your Village, Now Online!",
      hi: "📢 गिधाड़ी ग्राम कनेक्ट में आपका स्वागत है – अब गांव की जानकारी ऑनलाइन!",
      mr: "📢 गिधाडी ग्राम कनेक्टमध्ये तुमचं स्वागत आहे – आता गावाची माहिती ऑनलाइन!",
    },
  },
  {
    id: 2,
    title: {
      en: "🪖 Honoring Our Soldiers",
      hi: "🪖 हमारे सैनिकों को सम्मान",
      mr: "🪖 आपल्या सैनिकांचा सन्मान",
    },
    date: "2023-06-12",
    urgent: false,
    content: {
      en: "Submit details of village members serving or retired from the Armed Forces. 📌 Please fill out the form available in the Brave Soldiers section.",
      hi: "सशस्त्र बलों में सेवा देने वाले गांववासियों की जानकारी साझा करें। 📌 कृपया वीर सैनिक अनुभाग में उपलब्ध फॉर्म को भरें।",
      mr: "सशस्त्र दलात सेवा केलेल्या गावकऱ्यांची माहिती शेअर करा. 📌 कृपया शूर सैनिक विभागातील फॉर्म भरा.",
    },
  },
  {
    id: 3,
    title: {
      en: "📣 Promote Your Business with Us!",
      hi: "📣 अपने व्यवसाय का प्रचार करें!",
      mr: "📣 आपला व्यवसाय प्रसिद्ध करा!",
    },
    date: "2025-06-30",
    urgent: false,
    content: {
      en: "We now offer paid promotions for local businesses. 📌 Interested? Contact our team today.",
      hi: "हम स्थानीय व्यवसायों के लिए पेड प्रमोशन की सुविधा दे रहे हैं। 📌 इच्छुक लोग हमारी टीम से संपर्क करें।",
      mr: "आम्ही स्थानिक व्यवसायांसाठी पेड प्रमोशन उपलब्ध करून देत आहोत. 📌 इच्छुकांनी आमच्याशी संपर्क साधा.",
    },
  },
  {
    id: 4,
    title: {
      en: "🚀 Internship Opportunity – Join Gidhadi Gram Connect",
      hi: "🚀 इंटर्नशिप का मौका – गिधाड़ी ग्राम कनेक्ट से जुड़ें",
      mr: "🚀 इंटर्नशिप संधी – गिधाडी ग्राम कनेक्टमध्ये सामील व्हा",
    },
    date: "2025-06-30",
    urgent: false,
    content: {
      en: "We're looking for interns to help build Gidhadi Gram Connect. 📌 Open to Tech students from B.E. or Diploma in IT/CS. Contact us to apply!",
      hi: "हम गिधाड़ी ग्राम कनेक्ट के निर्माण में सहयोग के लिए इंटर्न्स ढूंढ रहे हैं। 📌 बीई/डिप्लोमा (आईटी/सीएस) टेक स्टूडेंट्स के लिए खुला है। संपर्क करें!",
      mr: "गिधाडी ग्राम कनेक्ट तयार करण्यासाठी आम्हाला इंटर्न्सची गरज आहे. 📌 बी.ई. किंवा डिप्लोमा (आयटी/सीएस) विद्यार्थी अर्ज करू शकतात. संपर्क करा!",
    },
  },
  {
    id: 5,
    title: {
      en: "⚠️ Disclaimer – Unofficial Platform",
      hi: "⚠️ अस्वीकरण – यह एक गैर-सरकारी प्लेटफ़ॉर्म है",
      mr: "⚠️ अस्वीकरण – ही एक अनौपचारिक वेबसाइट आहे",
    },
    date: "2025-06-30",
    urgent: false,
    content: {
      en: "This website is unofficial and created for public awareness. It only displays publicly available information from legal and open sources.",
      hi: "यह वेबसाइट एक गैर-सरकारी प्रयास है और केवल जन जागरूकता के लिए बनाई गई है। इसमें केवल सार्वजनिक रूप से उपलब्ध कानूनी जानकारी ही प्रदर्शित की जाती है।",
      mr: "ही वेबसाइट अनौपचारिक असून केवळ जनजागृतीसाठी तयार केली आहे. यामध्ये केवळ कायदेशीर आणि सार्वजनिक माहिती दाखवली जाते.",
    },
  },
];

type Announcement = (typeof announcements)[0];

const TOTAL = announcements.length;
const AUTO_PLAY_MS = 4000;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// ─── Component ────────────────────────────────────────────────────────────────

const AnnouncementCarousel = () => {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selected, setSelected] = useState<Announcement | null>(null);

  // Use ref for the scroll container — we scroll cards into view via scrollIntoView
  // instead of a hardcoded pixel offset so it works at any card size
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Auto-play ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || selected) return;
    const id = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % TOTAL);
    }, AUTO_PLAY_MS);
    return () => clearTimeout(id);
  }, [isPaused, selected, currentIndex]);

  // ── Scroll active card into view ────────────────────────────────────────────
  // Uses absolute horizontal scrolling (scrollLeft) instead of scrollIntoView 
  // to prevent involuntary vertical window jumping when the user scrolls down the page.
  useEffect(() => {
    const card = cardRefs.current[currentIndex];
    const container = scrollRef.current;
    if (card && container) {
      const scrollLeft = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2);
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth"
      });
    }
  }, [currentIndex]);

  // ── Navigation ──────────────────────────────────────────────────────────────
  const go = useCallback((index: number) => {
    setCurrentIndex((index + TOTAL) % TOTAL);
    setIsPaused(true);
    // Resume auto-play after 8 seconds of inactivity
    const id = setTimeout(() => setIsPaused(false), 8000);
    return () => clearTimeout(id);
  }, []);

  const prev = useCallback(() => go(currentIndex - 1), [currentIndex, go]);
  const next = useCallback(() => go(currentIndex + 1), [currentIndex, go]);

  // ── Touch swipe ─────────────────────────────────────────────────────────────
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) >= 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
    setTimeout(() => setIsPaused(false), 8000);
  };

  const current = announcements[currentIndex];

  return (
    <div>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        {/*
          text-base (16px) on mobile — clear section label.
          Scales to text-xl on sm+, text-2xl on md+.
        */}
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Megaphone className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" />
          <span className="leading-tight">{t("latestAnnouncements")}</span>
        </h2>

        {/* Nav controls — right side */}
        <div className="flex items-center gap-2">
          {/* Auto-play pulse dot */}
          <span
            className={`h-2 w-2 rounded-full flex-shrink-0 transition-colors ${
              isPaused ? "bg-gray-300" : "bg-green-500 animate-pulse"
            }`}
            title={isPaused ? "Paused" : "Auto-playing"}
          />
          {/*
            h-9 w-9 (36px) on mobile — larger than the old 32px.
            h-10 w-10 (40px) on sm+.
          */}
          <button
            onClick={prev}
            aria-label="Previous announcement"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm active:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={next}
            aria-label="Next announcement"
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center shadow-sm active:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* ── Marquee ticker ──────────────────────────────────────────────────── */}
      {/*
        Genuine CSS marquee: two copies of the text side by side so the loop
        is seamless. The animation moves from 0 → -50% (one full copy width),
        then jumps back to 0 invisibly. On pause, animation-play-state stops.
        
        text-xs (12px) on mobile — small but readable for a ticker.
        text-sm (14px) on sm+.
      */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 mb-4 overflow-hidden">
        <div
          className={`flex whitespace-nowrap ${isPaused ? "[animation-play-state:paused]" : ""}`}
          style={{ animation: "marquee 18s linear infinite" }}
        >
          {/* Two identical copies — seamless loop */}
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="inline-flex items-center gap-2 pr-12 text-xs sm:text-sm font-medium text-blue-800"
            >
              <AlertTriangle className="h-3 w-3 text-accent flex-shrink-0" />
              {current.title[language]}
              <span className="text-blue-400 mx-2">•</span>
              {current.content[language]}
            </span>
          ))}
        </div>
      </div>

      {/* ── Card carousel ───────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {announcements.map((announcement, index) => (
          <div
            key={announcement.id}
            ref={(el) => { cardRefs.current[index] = el; }}
            /*
              w-[75vw] on mobile: shows ~1.3 cards at a time — user can see
              there's more to scroll. sm: fixed 320px. md: 384px.
              
              Removed scale-105 on active — it gets clipped by overflow-x-auto.
              Use ring + shadow instead for active state.
            */
            className={`flex-shrink-0 w-[75vw] sm:w-80 md:w-96 transition-all duration-300 cursor-pointer rounded-xl border-2 bg-white shadow-sm ${
              index === currentIndex
                ? "border-sky-600 shadow-md shadow-sky-100"
                : "border-gray-100 hover:border-sky-300 hover:shadow-md"
            }`}
            onClick={() => {
              setSelected(announcement);
              setIsPaused(true);
            }}
          >
            <div className="p-3 sm:p-4">
              {/* Badge + Date row */}
              <div className="flex items-center justify-between mb-2.5">
                <Badge
                  variant={announcement.urgent ? "destructive" : "secondary"}
                  /*
                    text-xs (12px) minimum — never go below this for badges.
                    The old text-[10px] was 10px which is unreadable.
                  */
                  className="text-xs px-2 py-0.5"
                >
                  {announcement.urgent ? "URGENT" : "INFO"}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">{formatDate(announcement.date)}</span>
                </div>
              </div>

              {/*
                Title: text-sm (14px) on mobile, text-base (16px) on sm+.
                line-clamp-2 keeps the card height consistent across all announcements.
              */}
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 leading-snug line-clamp-2 mb-1.5">
                {announcement.title[language]}
              </h3>

              {/*
                Body: text-xs (12px) on mobile, text-sm (14px) on sm+.
                3-line clamp — tap the card to read the full text in the modal.
              */}
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">
                {announcement.content[language]}
              </p>

              {/* "Read more" hint */}
              <p className="text-xs text-sky-600 mt-2 font-medium">
                {t("readMore") ?? "Tap to read more →"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Dot indicators ──────────────────────────────────────────────────── */}
      <div className="flex justify-center gap-1.5 mt-3">
        {announcements.map((_, index) => (
          <button
            key={index}
            onClick={() => go(index)}
            aria-label={`Go to announcement ${index + 1}`}
            className={`rounded-full transition-all duration-200 h-2 ${
              index === currentIndex
                ? "w-5 bg-sky-600"
                : "w-2 bg-gray-300 hover:bg-sky-400"
            }`}
          />
        ))}
      </div>

      {/* ── Detail modal ────────────────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={() => { setSelected(null); setIsPaused(false); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{ animation: "fadeIn 0.2s ease-out" }}
        >
          {/*
            On mobile: modal slides up from the bottom (sheet pattern) — more
            natural than a centred popup on a small screen.
            On sm+: standard centred modal.
            
            max-h-[85vh] + overflow-y-auto handles long Marathi/Hindi text.
            pb-safe adds padding for iOS home bar.
          */}
          <div
            className="bg-white w-full sm:max-w-lg sm:w-full rounded-t-2xl sm:rounded-2xl p-5 sm:p-6 relative max-h-[85vh] overflow-y-auto"
            style={{ animation: "slideUp 0.3s ease-out", paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => { setSelected(null); setIsPaused(false); }}
              aria-label="Close"
              className="absolute right-4 top-4 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>

            {/* Modal badge + date */}
            <div className="flex items-center gap-2 mb-3">
              <Badge
                variant={selected.urgent ? "destructive" : "secondary"}
                className="text-xs"
              >
                {selected.urgent ? "URGENT" : "INFO"}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar className="h-3 w-3" />
                {formatDate(selected.date)}
              </div>
            </div>

            {/*
              Modal title: text-base (16px) on mobile, text-xl on sm+.
              pr-10 ensures text doesn't slide under the close button.
            */}
            <h2
              id="modal-title"
              className="text-base sm:text-xl font-bold text-gray-900 leading-snug mb-3 pr-10"
            >
              {selected.title[language]}
            </h2>

            {/* Modal body: text-sm (14px) on mobile, text-base (16px) on sm+ */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {selected.content[language]}
            </p>

            <div className="mt-5 flex justify-end">
              <Button
                onClick={() => { setSelected(null); setIsPaused(false); }}
                className="text-sm"
              >
                {t("close") ?? "Close"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Keyframe animations ─────────────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AnnouncementCarousel;