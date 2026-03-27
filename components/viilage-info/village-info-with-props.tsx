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
} from "lucide-react";
import { OfficialBadge } from "@/components/viilage-info/official-badge";
import { useLanguage } from "@/components/providers/language-provider";
import type { VillageInfoProps, VillageData } from "@/types/village-data";

// ─── Default Data ─────────────────────────────────────────────────────────────

const defaultVillageData: VillageData = {
  population: { total: 2847, growth: "+2.3%" },
  voters: { total: 1923, male: 1024, female: 899, malePercentage: 53.2, femalePercentage: 46.8 },
  infrastructure: { landArea: 1250, temples: 8, govtOffices: 3, schools: 5 },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCard {
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  badgeKey: string;
  value: string | number;
  labelKey: string;
  subValue: string;
  subColor?: string;
}

interface InfraCard {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  value: string | number;
  labelKey: string;
  tagKey: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCardItem({ card, t }: { card: StatCard; t: (k: string) => string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${card.bgColor} rounded-xl flex items-center justify-center`}>
          <card.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${card.iconColor}`} />
        </div>
        <span className={`text-[10px] sm:text-xs ${card.badgeBg} ${card.badgeText} px-2 py-1 rounded-full font-semibold`}>
          {t(card.badgeKey)}
        </span>
      </div>
      <p className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-0.5 tracking-tight">
        {typeof card.value === "number" ? card.value.toLocaleString() : card.value}
      </p>
      <p className="text-xs sm:text-sm text-gray-500 leading-snug">{t(card.labelKey)}</p>
      <p className={`mt-2 text-[10px] sm:text-xs font-medium ${card.subColor ?? "text-gray-400"}`}>
        {card.subValue}
      </p>
    </div>
  );
}

function InfraCardItem({ card, t }: { card: InfraCard; t: (k: string) => string }) {
  return (
    <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all duration-200">
      <div className={`w-12 h-12 sm:w-14 sm:h-14 ${card.iconBg} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
        <card.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${card.iconColor}`} />
      </div>
      <p className="text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight">
        {typeof card.value === "number" ? card.value.toLocaleString() : card.value}
      </p>
      <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-snug">{t(card.labelKey)}</p>
      <span className={`mt-2 text-[10px] sm:text-xs ${card.badgeBg} ${card.badgeText} px-2 py-1 rounded-full inline-block font-semibold`}>
        {t(card.tagKey)}
      </span>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function VillageInfoWithProps({ data = defaultVillageData }: VillageInfoProps) {
  const { t } = useLanguage();

  const statCards: StatCard[] = [
    {
      icon: Users,
      bgColor: "bg-primary/5",
      iconColor: "text-primary",
      badgeBg: "bg-primary/5",
      badgeText: "text-primary",
      badgeKey: "census",
      value: data.population.total,
      labelKey: "totalPopulation",
      subValue: `↗ ${t("updatedCensus")} (${data.population.growth})`,
      subColor: "text-primary",
    },
    {
      icon: UserCheck,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-700",
      badgeKey: "electoral",
      value: data.voters.total,
      labelKey: "registeredVoters",
      subValue: `↗ ${t("electoralRoll")}`,
      subColor: "text-blue-500",
    },
    {
      icon: User,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      badgeBg: "bg-indigo-50",
      badgeText: "text-indigo-700",
      badgeKey: "male",
      value: data.voters.male,
      labelKey: "maleVoters",
      subValue: `${data.voters.malePercentage}% ${t("ofTotalVoters")}`,
    },
    {
      icon: User,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      badgeBg: "bg-pink-50",
      badgeText: "text-pink-700",
      badgeKey: "female",
      value: data.voters.female,
      labelKey: "femaleVoters",
      subValue: `${data.voters.femalePercentage}% ${t("ofTotalVoters")}`,
    },
  ];

  const infraCards: InfraCard[] = [
    {
      icon: MapPin,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      badgeBg: "bg-primary/10",
      badgeText: "text-primary",
      value: `${data.infrastructure.landArea.toLocaleString()} ac`,
      labelKey: "totalLandArea",
      tagKey: "surveyed",
    },
    {
      icon: Church,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-700",
      badgeBg: "bg-orange-100",
      badgeText: "text-orange-700",
      value: data.infrastructure.temples,
      labelKey: "religiousPlaces",
      tagKey: "temples",
    },
    {
      icon: Building2,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700",
      badgeBg: "bg-purple-100",
      badgeText: "text-purple-700",
      value: data.infrastructure.govtOffices,
      labelKey: "govtOffices",
      tagKey: "official",
    },
    {
      icon: GraduationCap,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-700",
      value: data.infrastructure.schools,
      labelKey: "educationalInst",
      tagKey: "education",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-primary/5 via-white to-primary/5 py-5 sm:py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4 sm:p-5 md:p-6 mb-5 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 leading-tight tracking-tight">
                {t("villageDashboard")}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                {t("villageSubtitle")}
              </p>
            </div>
            <div className="text-left sm:text-right space-y-1 flex-shrink-0">
              <div className="flex items-center sm:justify-end gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{t("lastUpdated")}: {new Date().toLocaleDateString("en-IN")}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5 text-xs text-gray-400">
                <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{t("dataSource")}</span>
              </div>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>

        <OfficialBadge />

        {/* ── Stats Grid ──────────────────────────────────────────────── */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4 mb-5 sm:mb-6 md:mb-8">
          {statCards.map((card) => (
            <StatCardItem key={card.badgeKey} card={card} t={t} />
          ))}
        </div>

        {/* ── Infrastructure ──────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-primary/10 shadow-sm p-4 sm:p-5 md:p-6">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-4 sm:mb-5 flex items-center gap-2">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            {t("infrastructureFacilities")}
          </h2>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            {infraCards.map((card) => (
              <InfraCardItem key={card.tagKey} card={card} t={t} />
            ))}
          </div>
        </div>

        {/* ── Footer Note ─────────────────────────────────────────────── */}
        <div className="mt-4 sm:mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>{t("dataVerified")}</span>
            </div>
            <span>{t("forQueries")}</span>
          </div>
        </div>

      </div>
    </section>
  );
}