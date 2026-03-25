"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Shield, Award } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

// ─── Data ─────────────────────────────────────────────────────────────────────

const soldiersData = [
  {
    name: "Nikhil Rupchand Thakare",
    photo: "/brave/nikhilthakre.jpg",
    rank: "Corporal (Special Force)",
    branch: "Indian Air Force",
    yearsOfService: "7 Years",
    status: "Currently Serving",
    story: "Nothing is Impossible... Just do it.",
  },
  {
    name: "Jayandra Kumar Tekchand Chawhan",
    photo: "/brave/jaykumar.jpg",
    rank: "Ex Havildar",
    branch: "Indian Army",
    yearsOfService: "20 Years",
    status: "Retired",
    story: "Bahot Badiya upkram hai sabhi ko Jai Hind",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BraveSoldiersSection() {
  const { t } = useLanguage();

  return (
    /*
      py-8 on mobile (32px) → py-12 on sm+ → py-16 on lg+.
      The old py-16 (64px) on mobile was eating ~30% of viewport height
      before any content appeared.
      
      px-4 removed — parent page.tsx already handles horizontal padding.
    */
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-slate-50 to-white rounded-2xl border-2 border-sky-700">
      <div className="max-w-6xl mx-auto">

        {/* ── Section Header ──────────────────────────────────────────────── */}
        {/*
          mb-8 on mobile (32px) → mb-12 on lg+.
          Old mb-12 (48px) was too large before any cards appeared.
          
          Added position:relative so the decorative absolute div
          (military pattern) stays scoped inside this block, not the whole page.
        */}
        <div className="relative text-center mb-8 lg:mb-12 overflow-hidden">

          {/* Decorative background — scoped correctly with relative parent */}
          <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-slate-200 to-transparent pointer-events-none rounded-xl" />

          {/* Title row */}
          <div className="relative flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-1.5 sm:p-2 rounded-full shadow-lg flex-shrink-0">
              {/* h-5 w-5 on mobile, h-8 w-8 on sm+ — icon was oversized on small screens */}
              <Shield className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
            </div>

            {/*
              text-xl (20px) on mobile → text-3xl on sm+ → text-4xl on md+.
              Old text-3xl on mobile was 30px — too dominant on a small screen
              for a section heading (page title level).
            */}
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent leading-tight">
              {t("brave_soldiers_title")}
            </h2>

            <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-1.5 sm:p-2 rounded-full shadow-lg flex-shrink-0">
              <Shield className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>

          {/*
            text-sm (14px) on mobile → text-base (16px) on sm+ → text-lg on md+.
            Old text-lg (18px) on all screens was too large on mobile for a subtitle.
          */}
          <p className="relative text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed px-2">
            {t("brave_soldiers_subtitle")}
          </p>

          {/* Decorative underline bar */}
          <div className="w-24 sm:w-32 h-1.5 sm:h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto mt-4 rounded-full shadow-md" />
        </div>

        {/* ── Soldier Cards Grid ──────────────────────────────────────────── */}
        {/*
          gap-4 on mobile → gap-6 on sm+ → gap-8 on lg+.
          Old gap-8 (32px) between stacked cards on mobile was wasteful.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {soldiersData.map((soldier, index) => (
            <Card
              key={index}
              /*
                Removed: hover:bg-gradient-to-r from-green-600 via-yellow-500 to-red-500
                The Indian flag gradient was making card text (dark on dark) 
                completely unreadable. Replaced with a subtle warm hover state.
                
                Removed: transform hover:scale-[1.02] hover:-translate-y-1
                Scale on cards inside a grid can cause layout shift on mobile.
                Shadow elevation is sufficient to show interactivity.
              */
              className="group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-2 border-slate-200 hover:border-amber-400 bg-white cursor-pointer"
            >
              {/* ── Photo area ─────────────────────────────────────────── */}
              <div className="relative">
                {/*
                  aspect-[4/3] — consistent image frame.
                  overflow-hidden clips the image correctly.
                */}
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                  <Image
                    src={soldier.photo || "/placeholder.svg"}
                    alt={`Photo of ${soldier.name}`}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/*
                  OLD: absolute top-[290px] right-2
                  This was a hardcoded pixel value that broke on any screen
                  where the image height differed from the developer's monitor.
                  
                  FIX: Position badge at bottom of the image area using
                  bottom-3 right-3 — always attached to the image bottom edge
                  regardless of screen size or image height.
                */}
                <div className="absolute bottom-3 right-3">
                  <Badge
                    className={`${
                      soldier.status === "Currently Serving"
                        ? "bg-emerald-700 hover:bg-emerald-800"
                        : "bg-slate-700 hover:bg-slate-800"
                    } text-white font-semibold px-2.5 py-1 text-xs uppercase tracking-wide shadow-md`}
                  >
                    {soldier.status === "Currently Serving"
                      ? t("currently_serving")
                      : t("retired")}
                  </Badge>
                </div>

                {/* Rank insignia — visible on hover (desktop) */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-amber-600 text-white p-1.5 rounded-full shadow-lg">
                    <Shield className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* ── Card Content ────────────────────────────────────────── */}
              {/*
                p-4 on mobile → p-5 on sm+ → p-6 on lg+.
                Old p-6 (24px) on all screens was eating too much width on mobile.
              */}
              <CardContent className="p-4 sm:p-5 lg:p-6">

                {/* Name + Rank */}
                <div className="mb-3 sm:mb-4">
                  {/*
                    text-base (16px) on mobile → text-xl on sm+.
                    Old text-xl (20px) on mobile was too large — long names
                    like "Jayandra Kumar Tekchand Chawhan" wrapped badly.
                  */}
                  <h3 className="text-base sm:text-xl font-bold text-slate-800 group-hover:text-amber-800 mb-1.5 leading-snug transition-colors duration-300">
                    {soldier.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-100 group-hover:bg-amber-200 p-1 rounded-full transition-colors duration-300 flex-shrink-0">
                      <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
                    </div>
                    {/* text-sm on mobile, text-base on sm+ */}
                    <span className="text-sm sm:text-base font-semibold text-slate-700 leading-tight">
                      {soldier.rank}
                    </span>
                  </div>
                </div>

                {/* Service details */}
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  {[
                    { label: "Branch", value: soldier.branch },
                    { label: "Service", value: soldier.yearsOfService },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between px-2 py-1.5 rounded-lg group-hover:bg-slate-50 transition-colors duration-300"
                    >
                      {/*
                        Removed uppercase from label text — uppercase Tailwind
                        class can look odd with Devanagari script when language
                        switches to Marathi or Hindi.
                      */}
                      <span className="text-xs sm:text-sm font-semibold text-slate-500">
                        {label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors duration-300 text-right max-w-[60%]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quote / Story */}
                <div className="bg-slate-50 group-hover:bg-amber-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 border-l-4 border-amber-500 transition-all duration-300">
                  <div className="flex items-start gap-2">
                    <div className="bg-amber-100 group-hover:bg-amber-200 p-1 rounded-full transition-colors duration-300 flex-shrink-0 mt-0.5">
                      <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
                    </div>
                    {/* text-xs on mobile, text-sm on sm+ — quotes don't need large text */}
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-medium">
                      "{soldier.story}"
                    </p>
                  </div>
                </div>

                {/* Honour badge */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-100 to-orange-100 group-hover:from-amber-200 group-hover:to-orange-200 rounded-full border-2 border-amber-200 group-hover:border-amber-400 transition-all duration-300 shadow-sm group-hover:shadow-md">
                    <div className="bg-amber-600 group-hover:bg-amber-700 p-1 rounded-full transition-colors duration-300 flex-shrink-0">
                      <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
                    </div>
                    {/* text-xs on mobile, text-sm on sm+ */}
                    <span className="text-xs sm:text-sm font-bold text-amber-800 group-hover:text-amber-900 uppercase tracking-wide transition-colors duration-300">
                      {t("proud_son")}
                    </span>
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Call to Action ──────────────────────────────────────────────── */}
        {/*
          mt-8 on mobile → mt-12 on lg+. Old mt-12 was too large on mobile.
          p-5 on mobile → p-8 on sm+. Old p-8 left very little content width
          inside the box on a 360px screen.
        */}
        <div className="text-center mt-8 lg:mt-12">
          <div className="bg-slate-50 rounded-2xl p-5 sm:p-8 max-w-2xl mx-auto border border-slate-200">

            {/* text-base on mobile → text-xl on sm+ */}
            <h3 className="text-base sm:text-xl font-semibold text-slate-800 mb-2 sm:mb-3 leading-snug">
              {t("know_a_soldier")}
            </h3>

            {/* text-sm on mobile → text-base on sm+ */}
            <p className="text-sm sm:text-base text-slate-600 mb-5 sm:mb-6 leading-relaxed">
              {t("know_a_soldier_desc")}
            </p>

            <a
              href="https://docs.google.com/forms/d/1K2xP06egTSRr2BLvb86nmP20vs_z_jTreOHxbUrwk3A/edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/*
                Full width on mobile so it's easy to tap.
                Auto width on sm+ (inline button).
                min-h-[48px] — 48px is Google's recommended minimum touch target.
              */}
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-h-[48px] text-sm sm:text-base"
              >
                {t("share_your_story")}
              </Button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}