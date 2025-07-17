"use client"

import { useState } from "react"
import { MapPin, Navigation, Maximize2, Minimize2 } from "lucide-react"
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

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sky-700" />
            {t("Village Location")}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={getDirections}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              {t("Get Directions")}
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
              {t("Fullscreen")}
            </button>
          </div>
        </div>

        <div className="relative w-full h-80 rounded-lg overflow-hidden border border-gray-200">
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

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">{t("coordinates")}</p>
            <p className="font-semibold text-gray-900">
              {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
            </p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">{t("district")}</p>
            <p className="font-semibold text-gray-900">Gondia</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">{t("state")}</p>
            <p className="font-semibold text-gray-900">Maharashtra</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={openInGoogleMaps}
            className="flex items-center gap-2 px-4 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            {t("openInGoogleMaps")}
          </button>
          <button
            onClick={() =>
              navigator.share?.({
                title: `${villageName} Location`,
                url: `https://www.google.com/maps/search/${latitude},${longitude}`,
              })
            }
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            {t("shareLocation")}
          </button>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {villageName} - {t("villageLocation")}
              </h3>
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
                {t("close")}
              </button>
            </div>
            <div className="flex-1">
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
