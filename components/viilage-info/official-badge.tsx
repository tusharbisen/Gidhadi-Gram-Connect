"use client"

import { Shield, CheckCircle } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

export function OfficialBadge() {
  const { t } = useLanguage()

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Shield className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-green-800">{t("officialData")}</h3>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-sm text-green-700">{t("verifiedBy")}</p>
        </div>
      </div>
    </div>
  )
}
