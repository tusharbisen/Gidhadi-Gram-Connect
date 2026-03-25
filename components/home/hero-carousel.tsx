"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

// ─── Data ─────────────────────────────────────────────────────────────────────

const carouselSlides = [
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698582/5_suenga.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698587/7_cxaf4l.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698585/6_povksq.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698590/19_m3oigc.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698591/21_qyqu4e.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698591/20_mr6lso.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698593/24_ocdul9.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698595/25_jg64wd.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698594/22_vezvrt.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698595/23_lumt3p.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698594/26_iodef3.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698581/10_gabdwn.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698582/11_xdpwj1.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698585/12_rej1ib.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698585/13_b9klll.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698586/14_af5zsm.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698586/15_tgq3fi.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698582/2_jbqcsz.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698580/3_tdhtxe.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698582/4_vfewzi.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698599/33_bjusis.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698599/31_h2npr3.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698600/30_n6rhba.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698601/32_mf7syu.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698579/1_urbeuz.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698579/8_yqnete.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698580/9_nsjexw.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698596/27_itvtcm.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698596/28_zqwrgz.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698588/16_oxqdgx.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698589/18_uda9cn.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698590/17_baddps.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698597/29_jb2ehw.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698600/34_gtt5tg.png" },
  { image: "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698602/35_oknzox.png" },
];

const TOTAL = carouselSlides.length;
// Auto-advance interval in ms
const INTERVAL_MS = 6000;

// ─── Cloudinary URL optimizer ──────────────────────────────────────────────────
// Serves a correctly-sized image per device instead of always fetching 1920px.
// w_800 for mobile, w_1200 for tablet/desktop — significant data saving.
const optimizeUrl = (url: string, width: 800 | 1200 = 800): string => {
  if (!url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto:good,q_auto,w_${width},c_limit/`);
};

// ─── Component ────────────────────────────────────────────────────────────────

const HeroCarousel = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);       // 0–100, drives progress bar
  const [isPaused, setIsPaused] = useState(false);

  // Touch tracking for swipe
  const touchStartX = useRef<number | null>(null);
  // Ref to track progress without stale closure issues
  const progressRef = useRef(0);
  const pausedRef = useRef(false);

  // Keep refs in sync
  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

  // ── Navigation helpers ──────────────────────────────────────────────────────
  const goTo = useCallback((index: number) => {
    setCurrent((index + TOTAL) % TOTAL);
    setProgress(0);
    progressRef.current = 0;
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // ── Auto-advance + progress bar ────────────────────────────────────────────
  // Single rAF loop drives both auto-advance and progress bar smoothly.
  // Pauses when the Page Visibility API says the tab/app is hidden —
  // important for mobile where users switch apps frequently.
  useEffect(() => {
    let lastTime: number | null = null;
    let accumulated = 0;
    let rafId: number;

    const tick = (now: number) => {
      if (!pausedRef.current) {
        const delta = lastTime !== null ? now - lastTime : 0;
        accumulated += delta;

        const pct = Math.min((accumulated / INTERVAL_MS) * 100, 100);
        setProgress(pct);
        progressRef.current = pct;

        if (accumulated >= INTERVAL_MS) {
          accumulated = 0;
          setCurrent((prev) => (prev + 1) % TOTAL);
          setProgress(0);
          progressRef.current = 0;
        }
      }
      lastTime = now;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    // Pause when tab is hidden (e.g. user switches app on Android)
    const onVisibility = () => {
      if (document.hidden) {
        lastTime = null; // reset delta so no jump when returning
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []); // runs once — stable because we use refs for mutable state

  // ── Touch / swipe ──────────────────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) >= 40) {
      delta > 0 ? next() : prev();
    }
    touchStartX.current = null;
    // Short pause after swipe before auto-play resumes
    setTimeout(() => setIsPaused(false), 3000);
  };

  return (
    /*
      aspect-[3/2] on mobile  → 360px wide = 240px tall. Tall enough to feel
                                 like a real hero, short enough to show content
                                 below the fold.
      aspect-[16/9] on sm+    → standard cinematic ratio for larger screens.
      
      No mb- here — spacing is handled by the parent <section> in page.tsx.
    */
    <div
      className="relative w-full aspect-[3/2] sm:aspect-[16/9] overflow-hidden rounded-b-xl sm:rounded-xl shadow-xl border border-gray-200"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* ── Slides ─────────────────────────────────────────────────────────── */}
      {carouselSlides.map((slide, i) => {
        // Only mount prev, current, next — skip the rest to save memory
        const isPrev = i === (current - 1 + TOTAL) % TOTAL;
        const isNext = i === (current + 1) % TOTAL;
        const isCurrent = i === current;
        if (!isCurrent && !isPrev && !isNext) return null;

        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isCurrent ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              /*
                Mobile: serve 800px wide image (saves ~60% data vs 1920px).
                sm+: serve 1200px.
                Next.js `sizes` tells the browser which source to pick.
              */
              src={optimizeUrl(slide.image, 800)}
              alt={`${t("villagePhoto") ?? "Village photo"} ${i + 1}`}
              fill
              /*
                object-cover instead of object-contain:
                - No black bars on non-16:9 images
                - Fills the frame on all screen sizes
                - Looks intentional, not broken
              */
              className="object-cover"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 100vw, 1200px"
              quality={90}
            />
            {/* Subtle dark overlay so nav buttons stay visible over bright images */}
            <div className="absolute inset-0 bg-black/15" />
          </div>
        );  
      })}

      {/* ── Slide counter — top right ───────────────────────────────────────── */}
      <div className="absolute top-3 right-3 z-20 bg-black/45 text-white text-xs font-medium px-2.5 py-1 rounded-full">
        {current + 1} / {TOTAL}
      </div>

      {/* ── Prev / Next buttons ─────────────────────────────────────────────── */}
      {/*
        h-10 w-10 (40px) on mobile — comfortable thumb target.
        h-12 w-12 (48px) on sm+ — more generous on larger screens.
      */}
      <button
        onClick={() => { prev(); setIsPaused(false); }}
        aria-label={t("previousSlide") ?? "Previous slide"}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20
                   h-10 w-10 sm:h-12 sm:w-12 rounded-full
                   bg-black/35 hover:bg-black/55 active:bg-black/70
                   text-white flex items-center justify-center
                   transition-colors duration-150"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      <button
        onClick={() => { next(); setIsPaused(false); }}
        aria-label={t("nextSlide") ?? "Next slide"}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20
                   h-10 w-10 sm:h-12 sm:w-12 rounded-full
                   bg-black/35 hover:bg-black/55 active:bg-black/70
                   text-white flex items-center justify-center
                   transition-colors duration-150"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* ── Dot indicators — sliding window of 5 ───────────────────────────── */}
      {/*
        35 dots would be unusable. Show 5 at most with … hints,
        same strategy as EventCarousel for consistency.
      */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {(() => {
          const MAX = 5;
          const half = Math.floor(MAX / 2);
          let start = Math.max(0, current - half);
          const end = Math.min(TOTAL, start + MAX);
          if (end - start < MAX) start = Math.max(0, end - MAX);
          const indices = Array.from({ length: end - start }, (_, i) => start + i);

          return (
            <>
              {start > 0 && <span className="text-white/50 text-xs">…</span>}
              {indices.map((i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-200 ${
                    i === current
                      ? "w-5 h-2 bg-white"
                      : "w-2 h-2 bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
              {end < TOTAL && <span className="text-white/50 text-xs">…</span>}
            </>
          );
        })()}
      </div>

      {/* ── Progress bar — bottom edge ──────────────────────────────────────── */}
      {/*
        Correctly shows time elapsed within the CURRENT slide (0→100%).
        Pauses visually when isPaused, resumes smoothly from the same point.
      */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 z-20">
        <div
          className="h-full bg-white/80 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

    </div>
  );
};

export default HeroCarousel;