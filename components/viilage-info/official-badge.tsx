"use client";

import { Shield, CheckCircle } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

export function OfficialBadge() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 mb-6">
      {/* Icon */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-primary text-sm sm:text-base leading-tight">
            {t("officialData")}
          </h3>
          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
        </div>
        <p className="text-xs sm:text-sm text-primary mt-0.5 leading-snug">
          {t("verifiedBy")}
        </p>
      </div>
    </div>
  );
}