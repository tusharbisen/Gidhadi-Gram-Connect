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

// Sample data - replace with your actual data source
const villageData = {
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

export default function VillageInfo() {
  const { t } = useLanguage()

  return (
    <section className="bg-gray-50 py-8 mt-5 rounded-lg border-2 border-sky-700">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("Village Information")}</h1>
              <p className="text-gray-600">{t("Gidhadi Pincode- 441801")}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {t("lastUpdated")}: {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FileText className="w-4 h-4" />
                <span>{t("dataSource")}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-1 bg-gradient-to-r from-sky-700 to-blue-600 rounded-full"></div>
        </div>

        <OfficialBadge />

        {/* Statistics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Total Population */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-sky-700" />
              </div>
              <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full font-medium">{t("census")}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{villageData.population.total.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{t("totalPopulation")}</p>
              <div className="mt-2 text-xs text-green-600">
                ↗ {t("updatedCensus")} ({villageData.population.growth})
              </div>
            </div>
          </div>

          {/* Total Voters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-blue-700" />
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                {t("electoral")}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{villageData.voters.total.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{t("registeredVoters")}</p>
              <div className="mt-2 text-xs text-green-600">↗ {t("electoralRoll")}</div>
            </div>
          </div>

          {/* Men Voters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-indigo-700" />
              </div>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                {t("male")}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{villageData.voters.male.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{t("maleVoters")}</p>
              <div className="mt-2 text-xs text-gray-500">
                {villageData.voters.malePercentage}% {t("ofTotalVoters")}
              </div>
            </div>
          </div>

          {/* Women Voters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-pink-700" />
              </div>
              <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full font-medium">
                {t("female")}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{villageData.voters.female.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{t("femaleVoters")}</p>
              <div className="mt-2 text-xs text-gray-500">
                {villageData.voters.femalePercentage}% {t("ofTotalVoters")}
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-700" />
            {t("infrastructureFacilities")}
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Land Area */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-green-700" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{villageData.infrastructure.landArea.toLocaleString()}</p>
              <p className="text-sm text-gray-600 mt-1">{t("totalLandArea")} (acres)</p>
              <div className="mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full inline-block">
                {t("surveyed")}
              </div>
            </div>

            {/* Temples */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Church className="w-8 h-8 text-orange-700" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{villageData.infrastructure.temples}</p>
              <p className="text-sm text-gray-600 mt-1">{t("religiousPlaces")}</p>
              <div className="mt-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full inline-block">
                {t("temples")}
              </div>
            </div>

            {/* Government Offices */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-8 h-8 text-purple-700" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{villageData.infrastructure.govtOffices}</p>
              <p className="text-sm text-gray-600 mt-1">{t("govtOffices")}</p>
              <div className="mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full inline-block">
                {t("official")}
              </div>
            </div>

            {/* Schools */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-8 h-8 text-blue-700" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{villageData.infrastructure.schools}</p>
              <p className="text-sm text-gray-600 mt-1">{t("educationalInst")}</p>
              <div className="mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-block">
                {t("education")}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
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
