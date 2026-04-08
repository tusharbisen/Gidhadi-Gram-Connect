"use client";

import {
  Users,
  UserCheck,
  User,
  MapPin,
  Church,
  Building2,
  GraduationCap,
  Calendar,
  FileText,
  Shield,
  TrendingUp,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { OfficialBadge } from "@/components/viilage-info/official-badge";
import { GoogleMap } from "@/components/viilage-info/google-map";
import { useLanguage } from "@/components/providers/language-provider";
import type { VillageData } from "@/types/village-data";

// ─── Village Data ──────────────────────────────────────────────────────────────

const villageData: VillageData = {
  population: { total: 2143, growth: "+2.3%" },
  voters: {
    total: 1811,
    male: 915,
    female: 896,
    malePercentage: 50.52,
    femalePercentage: 49.48,
  },
  infrastructure: { landArea: 1250, temples: 8, govtOffices: 3, schools: 5 },
  location: {
    latitude: 21.297306,
    longitude: 80.284306,
    name: "Gidhadi",
  },
};

// ─── Stat Cards ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  labelKey: string;
  badgeKey: string;
  sub: (t: (k: string) => string) => string;
  accent: {
    icon: string; // icon bg + text classes
    badge: string; // badge bg + text classes
    bar: string; // gradient bar color
    glow: string; // subtle card glow on hover
  };
  t: (k: string) => string;
}

const statCards = (t: (k: string) => string) => [
  {
    icon: Users,
    value: villageData.population.total,
    labelKey: "totalPopulation",
    badgeKey: "census",
    sub: (t: (k: string) => string) =>
      `↗ ${t("updatedCensus")} (${villageData.population.growth})`,
    accent: {
      icon: "bg-[#e8f3ff] text-[#1565c0]",
      badge: "bg-[#dbeafe] text-[#1d4ed8]",
      bar: "from-[#1565c0] to-[#42a5f5]",
      glow: "hover:shadow-blue-100",
    },
  },
  {
    icon: UserCheck,
    value: villageData.voters.total,
    labelKey: "registeredVoters",
    badgeKey: "electoral",
    sub: (t: (k: string) => string) => `↗ ${t("electoralRoll")}`,
    accent: {
      icon: "bg-[#ecfdf5] text-[#059669]",
      badge: "bg-[#d1fae5] text-[#065f46]",
      bar: "from-[#059669] to-[#34d399]",
      glow: "hover:shadow-emerald-100",
    },
  },
  {
    icon: User,
    value: villageData.voters.male,
    labelKey: "maleVoters",
    badgeKey: "male",
    sub: (t: (k: string) => string) =>
      `${villageData.voters.malePercentage}% ${t("ofTotalVoters")}`,
    accent: {
      icon: "bg-[#eef2ff] text-[#4f46e5]",
      badge: "bg-[#e0e7ff] text-[#3730a3]",
      bar: "from-[#4f46e5] to-[#818cf8]",
      glow: "hover:shadow-indigo-100",
    },
  },
  {
    icon: User,
    value: villageData.voters.female,
    labelKey: "femaleVoters",
    badgeKey: "female",
    sub: (t: (k: string) => string) =>
      `${villageData.voters.femalePercentage}% ${t("ofTotalVoters")}`,
    accent: {
      icon: "bg-[#fdf2f8] text-[#db2777]",
      badge: "bg-[#fce7f3] text-[#9d174d]",
      bar: "from-[#db2777] to-[#f472b6]",
      glow: "hover:shadow-pink-100",
    },
  },
];

const infraCards = [
  {
    icon: MapPin,
    value: `${villageData.infrastructure.landArea.toLocaleString()} ac`,
    labelKey: "totalLandArea",
    tagKey: "surveyed",
    accent: {
      icon: "bg-[#e8f3ff] text-[#1565c0]",
      tag: "bg-[#dbeafe] text-[#1d4ed8]",
    },
  },
  {
    icon: Church,
    value: villageData.infrastructure.temples,
    labelKey: "religiousPlaces",
    tagKey: "temples",
    accent: {
      icon: "bg-orange-50 text-orange-600",
      tag: "bg-orange-100 text-orange-700",
    },
  },
  {
    icon: Building2,
    value: villageData.infrastructure.govtOffices,
    labelKey: "govtOffices",
    tagKey: "official",
    accent: {
      icon: "bg-purple-50 text-purple-600",
      tag: "bg-purple-100 text-purple-700",
    },
  },
  {
    icon: GraduationCap,
    value: villageData.infrastructure.schools,
    labelKey: "educationalInst",
    tagKey: "education",
    accent: {
      icon: "bg-teal-50 text-teal-600",
      tag: "bg-teal-100 text-teal-700",
    },
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  value,
  labelKey,
  badgeKey,
  sub,
  accent,
  t,
}: StatCardProps) {
  return (
    <div
      className={`group relative bg-white rounded-2xl border border-gray-100 shadow-sm
        hover:shadow-lg ${accent.glow} transition-all duration-300 overflow-hidden flex flex-col`}
    >
      {/* Accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${accent.bar}`} />

      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center ${accent.icon}`}
          >
            <Icon className="w-5 h-5 sm:w-5 sm:h-5" strokeWidth={2} />
          </div>
          <span
            className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full ${accent.badge}`}
          >
            {t(badgeKey)}
          </span>
        </div>

        {/* Value */}
        <div>
          <p className="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight leading-none">
            {value.toLocaleString()}
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium leading-snug">
            {t(labelKey)}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-1 mt-auto pt-2 border-t border-gray-50">
          <TrendingUp className="w-3 h-3 text-gray-400 flex-shrink-0" />
          <p className="text-[10px] sm:text-xs text-gray-400 font-medium leading-tight">
            {sub(t)}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfraCard({
  icon: Icon,
  value,
  labelKey,
  tagKey,
  accent,
  t,
}: {
  icon: React.ElementType;
  value: string | number;
  labelKey: string;
  tagKey: string;
  accent: { icon: string; tag: string };
  t: (k: string) => string;
}) {
  return (
    <div className="group flex flex-col items-center text-center p-4 sm:p-5 bg-gray-50/80 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-default">
      <div
        className={`w-13 h-13 sm:w-14 sm:h-14 w-12 h-12 rounded-2xl flex items-center justify-center mb-3 ${accent.icon} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.8} />
      </div>
      <p className="text-2xl sm:text-2xl font-extrabold text-gray-800 tracking-tight">
        {value}
      </p>
      <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium leading-snug">
        {t(labelKey)}
      </p>
      <span
        className={`mt-2.5 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full ${accent.tag}`}
      >
        {t(tagKey)}
      </span>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function VillageInfo() {
  const { t } = useLanguage();
  const cards = statCards(t);

  return (
    <section
      className="py-6 sm:py-10 md:py-14"
      style={{
        background:
          "linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f0f7ff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-7">
        {/* ── Page Header ──────────────────────────────────────────────────── */}
        <div className="relative bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
          {/* Decorative bg strip */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#1565c0] via-[#42a5f5] to-[#1565c0]" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-60" />

          <div className="relative px-5 sm:px-7 py-5 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Left */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#e8f3ff] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#1565c0]" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight leading-tight">
                    {t("villageDashboard")}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed max-w-md">
                    {t("villageSubtitle")}
                  </p>
                </div>
              </div>

              {/* Right — meta */}
              <div className="flex flex-row sm:flex-col gap-2 sm:gap-1.5 sm:text-right flex-shrink-0">
                <div className="flex items-center sm:justify-end gap-1.5 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-[#1565c0] flex-shrink-0" />
                  <span>
                    {t("lastUpdated")}: {new Date().toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5 text-xs text-gray-400">
                  <FileText className="w-3.5 h-3.5 text-[#1565c0] flex-shrink-0" />
                  <span>{t("dataSource")}</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-4 h-px bg-gradient-to-r from-[#1565c0]/30 via-[#42a5f5]/20 to-transparent" />

            {/* Quick info chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: "Gidhadi Village", icon: MapPin },
                { label: "Gondia District", icon: Building2 },
                { label: "Maharashtra", icon: Shield },
              ].map(({ label, icon: ChipIcon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1"
                >
                  <ChipIcon className="w-3 h-3 text-[#1565c0]" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Official Badge ────────────────────────────────────────────────── */}
        <OfficialBadge />

        {/* ── Stats Grid ───────────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-sm sm:text-base font-bold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#1565c0] to-[#42a5f5] inline-block" />
              {t("populationStats") ?? "Population & Voter Statistics"}
            </h2>
          </div>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <StatCard key={card.badgeKey} {...card} t={t} />
            ))}
          </div>
        </div>

        {/* ── Infrastructure ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-blue-100/60 shadow-sm overflow-hidden">
          {/* Section header */}
          <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#e8f3ff] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 text-[#1565c0]" />
              </div>
              {t("infrastructureFacilities")}
            </h2>
            <span className="hidden sm:flex items-center gap-1 text-xs text-gray-400 font-medium">
              <Shield className="w-3.5 h-3.5 text-[#1565c0]" />
              {t("dataVerified") ?? "Verified Data"}
            </span>
          </div>
          <div className="p-4 sm:p-5 md:p-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
              {infraCards.map((card) => (
                <InfraCard key={card.tagKey} {...card} t={t} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Map Section ───────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-blue-100/60 shadow-sm overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#e8f3ff] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#1565c0]" />
              </div>
              {t("villageLocation") ?? "Village Location"}
            </h2>
            <a
              href={`https://www.google.com/maps?q=${villageData.location?.latitude},${villageData.location?.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#1565c0] hover:text-[#0d47a1] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open in Google Maps
            </a>
          </div>

          <div className="p-4 sm:p-5">
            {villageData.location ? (
              <>
                <GoogleMap
                  latitude={villageData.location.latitude}
                  longitude={villageData.location.longitude}
                  villageName={villageData.location.name}
                  zoom={15}
                />
                {/* Coordinate chips */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    {
                      label: `${villageData.location.latitude}°N`,
                      icon: MapPin,
                    },
                    {
                      label: `${villageData.location.longitude}°E`,
                      icon: MapPin,
                    },
                    { label: "Gondia", icon: Building2 },
                    { label: "Maharashtra", icon: Shield },
                  ].map(({ label, icon: ChipIcon }, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1"
                    >
                      <ChipIcon className="w-3 h-3 text-[#1565c0]" />
                      {label}
                    </span>
                  ))}
                  <a
                    href={`https://www.google.com/maps?q=${villageData.location.latitude},${villageData.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm:hidden inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1565c0] bg-[#e8f3ff] border border-[#bfdbfe] rounded-full px-3 py-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Google Maps
                  </a>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-56 sm:h-72 bg-gray-50 rounded-xl">
                <div className="text-center px-4">
                  <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    Map data not available
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer Note ───────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3.5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#1565c0] flex-shrink-0" />
              <span className="font-medium">{t("dataVerified")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-gray-300" />
              <span>{t("forQueries")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
