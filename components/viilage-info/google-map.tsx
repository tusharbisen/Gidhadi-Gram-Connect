"use client"

import { useState } from "react"
import { MapPin, Navigation, Maximize2, Minimize2, Share2 } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

interface GoogleMapProps {
  latitude?: number
  longitude?: number
  villageName?: string
  zoom?: number
}

export function GoogleMap({
  latitude = 21.294949, 
  longitude = 80.273759,
  villageName = "Gidhadi",
  zoom = 15,
}: GoogleMapProps) {
  const { t } = useLanguage()
  const [isFullscreen, setIsFullscreen] = useState(false)

  const mapUrlFallback = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.234567890123!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodeURIComponent(villageName)}!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`

  const openInGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/${latitude},${longitude}`, "_blank")
  }

  const getDirections = () => {
    window.open(`https://www.google.com/maps/dir//${latitude},${longitude}`, "_blank")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${villageName} Location`,
        url: `https://www.google.com/maps/search/${latitude},${longitude}`,
      })
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 md:p-5 lg:p-6">
        {/* Header Section - Responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-sky-700 flex-shrink-0" />
            <span className="leading-tight">{t("Village Location")}</span>
          </h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={getDirections}
              className="flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors flex-1 sm:flex-initial"
            >
              <Navigation className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{t("Get Directions")}</span>
              <span className="sm:hidden">Directions</span>
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex-1 sm:flex-initial"
            >
              <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="hidden md:inline">{t("Fullscreen")}</span>
              <span className="md:hidden">Full</span>
            </button>
          </div>
        </div>

        {/* Map Container - Responsive Height */}
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-lg overflow-hidden border border-gray-200">
          <iframe
            src={mapUrlFallback}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${villageName} Location Map`}
          />
        </div>

        {/* Location Info Grid - Responsive */}
        <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          <div className="text-center p-2.5 sm:p-3 bg-gray-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">
              {t("coordinates")}
            </p>
            <p className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
              {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
            </p>
          </div>
          <div className="text-center p-2.5 sm:p-3 bg-gray-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">
              {t("district")}
            </p>
            <p className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
              Gondia
            </p>
          </div>
          <div className="text-center p-2.5 sm:p-3 bg-gray-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">
              {t("state")}
            </p>
            <p className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
              Maharashtra
            </p>
          </div>
        </div>

        {/* Action Buttons - Responsive */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={openInGoogleMaps}
            className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm md:text-base bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors w-full sm:w-auto"
          >
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>{t("openInGoogleMaps")}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm md:text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors w-full sm:w-auto"
          >
            <Share2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span>{t("shareLocation")}</span>
          </button>
        </div>
      </div>

      {/* Fullscreen Modal - Responsive */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full h-full sm:max-w-6xl sm:max-h-[90vh] flex flex-col">
            {/* Modal Header - Responsive */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold truncate pr-2">
                {villageName} - {t("villageLocation")}
              </h3>
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{t("close")}</span>
                <span className="sm:hidden">×</span>
              </button>
            </div>
            {/* Modal Map */}
            <div className="flex-1 min-h-0">
              <iframe
                src={mapUrlFallback}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${villageName} Location Map - Fullscreen`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}