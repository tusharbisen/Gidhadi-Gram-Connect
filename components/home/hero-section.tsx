"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare } from "lucide-react"
import Link from "next/link"

const HeroSection = () => {
  const { t } = useLanguage()

  return (
    <div className="relative mb-8 md:mb-12 overflow-hidden rounded-lg shadow-xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/placeholder.svg?height=600&width=1200')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gov-blue/90 to-gov-blue/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-12 md:px-12 md:py-20 text-white">
        <div className="max-w-4xl">
          <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">{t("welcomeToGidhadi")}</h1>
          <p className="mb-8 text-lg md:text-xl max-w-2xl leading-relaxed opacity-95">{t("welcomeMessage")}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/grievance">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-gov-blue hover:bg-gray-100 font-semibold px-8 py-3 text-base"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Submit Grievance
              </Button>
            </Link>
            <Link href="/schemes">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10 font-semibold px-8 py-3 text-base"
              >
                <FileText className="mr-2 h-5 w-5" />
                View Government Schemes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
