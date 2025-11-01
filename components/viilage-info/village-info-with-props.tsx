"use client"

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
} from "lucide-react"
import { OfficialBadge } from "@/components/viilage-info/official-badge"
import { useLanguage } from "@/components/providers/language-provider"
import type { VillageInfoProps, VillageData } from "@/types/village-data"

// Default data if no props are provided
const defaultVillageData: VillageData = {
  population: {
    total: 2847,
    growth: "+2.3%",
  },
  voters: {
    total: 1923,
    male: 1024,
    female: 899,
    malePercentage: 53.2,
    femalePercentage: 46.8,
  },
  infrastructure: {
    landArea: 1250,
    temples: 8,
    govtOffices: 3,
    schools: 5,
  },
}

export default function VillageInfoWithProps({ data = defaultVillageData }: VillageInfoProps) {
  const { t } = useLanguage()

  return (
    <section className="bg-gray-50 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Page Header - Responsive */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3">
            <div className="w-full sm:w-auto">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
                {t("villageDashboard")}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                {t("villageSubtitle")}
              </p>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">
                  {t("lastUpdated")}: {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">{t("dataSource")}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-0.5 sm:h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-full"></div>
        </div>

        <OfficialBadge />

        {/* Statistics Grid - Fully Responsive */}
        <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4 sm:mb-6 md:mb-8">
          {/* Total Population */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-sky-700" />
              </div>
              <span className="text-[10px] sm:text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full font-medium">
                {t("census")}
              </span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {data.population.total.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-snug">
                {t("totalPopulation")}
              </p>
              <div className="mt-2 text-[10px] sm:text-xs text-green-600">
                ↗ {t("updatedCensus")} ({data.population.growth})
              </div>
            </div>
          </div>

          {/* Total Voters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700" />
              </div>
              <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                {t("electoral")}
              </span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {data.voters.total.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-snug">
                {t("registeredVoters")}
              </p>
              <div className="mt-2 text-[10px] sm:text-xs text-green-600">
                ↗ {t("electoralRoll")}
              </div>
            </div>
          </div>

          {/* Men Voters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-700" />
              </div>
              <span className="text-[10px] sm:text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                {t("male")}
              </span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {data.voters.male.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-snug">
                {t("maleVoters")}
              </p>
              <div className="mt-2 text-[10px] sm:text-xs text-gray-500">
                {data.voters.malePercentage}% {t("ofTotalVoters")}
              </div>
            </div>
          </div>

          {/* Women Voters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-pink-700" />
              </div>
              <span className="text-[10px] sm:text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full font-medium">
                {t("female")}
              </span>
            </div>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {data.voters.female.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-snug">
                {t("femaleVoters")}
              </p>
              <div className="mt-2 text-[10px] sm:text-xs text-gray-500">
                {data.voters.femalePercentage}% {t("ofTotalVoters")}
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Grid - Responsive */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-4 sm:mb-5 md:mb-6 flex items-center gap-2">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-sky-700 flex-shrink-0" />
            <span className="leading-tight">{t("infrastructureFacilities")}</span>
          </h2>

          <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
            {/* Land Area */}
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-700" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {data.infrastructure.landArea.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 leading-snug">
                {t("totalLandArea")} (acres)
              </p>
              <div className="mt-2 text-[10px] sm:text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full inline-block">
                {t("surveyed")}
              </div>
            </div>

            {/* Temples */}
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Church className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-700" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {data.infrastructure.temples}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 leading-snug">
                {t("religiousPlaces")}
              </p>
              <div className="mt-2 text-[10px] sm:text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full inline-block">
                {t("temples")}
              </div>
            </div>

            {/* Government Offices */}
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Building2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-700" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {data.infrastructure.govtOffices}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 leading-snug">
                {t("govtOffices")}
              </p>
              <div className="mt-2 text-[10px] sm:text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full inline-block">
                {t("official")}
              </div>
            </div>

            {/* Schools */}
            <div className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-700" />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                {data.infrastructure.schools}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 leading-snug">
                {t("educationalInst")}
              </p>
              <div className="mt-2 text-[10px] sm:text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-block">
                {t("education")}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note - Responsive */}
        <div className="mt-4 sm:mt-6 md:mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm text-gray-600 gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
              <span>{t("dataVerified")}</span>
            </div>
            <div>
              <span>{t("forQueries")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}