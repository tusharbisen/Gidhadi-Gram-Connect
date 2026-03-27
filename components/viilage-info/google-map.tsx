"use client";

import { useState, useCallback, useEffect } from "react";
import { MapPin, Navigation, Maximize2, Minimize2, Share2, X } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GoogleMapProps {
  latitude?: number;
  longitude?: number;
  villageName?: string;
  zoom?: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_LAT = 21.297306;  // 21°17'50.3"N
const DEFAULT_LNG = 80.284306;  // 80°17'03.5"E

const INFO_ITEMS = [
  { labelKey: "district", fallback: "District", value: "Gondia" },
  { labelKey: "state",    fallback: "State",    value: "Maharashtra" },
  { labelKey: "country",  fallback: "Country",  value: "India" },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildMapUrl(lat: number, lng: number, zoom: number) {
  return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GoogleMap({
  latitude  = DEFAULT_LAT,
  longitude = DEFAULT_LNG,
  villageName = "Gidhadi",
  zoom = 15,
}: GoogleMapProps) {
  const { t } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const mapUrl = buildMapUrl(latitude, longitude, zoom);
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  // Close fullscreen on Escape
  useEffect(() => {
    if (!isFullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFullscreen]);

  // Lock body scroll in fullscreen
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isFullscreen]);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: `${villageName} – ${t("villageLocation") || "Village Location"}`,
      text: `${villageName} – ${latitude.toFixed(6)}°N, ${longitude.toFixed(6)}°E`,
      url: mapsSearchUrl,
    };
    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(mapsSearchUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      // User cancelled share — no action needed
    }
  }, [villageName, latitude, longitude, mapsSearchUrl, t]);

  // ── Map iframe (reused in normal + fullscreen) ────────────────────────────
  const MapIframe = ({ title }: { title: string }) => (
    <iframe
      src={mapUrl}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={title}
      className="w-full h-full"
    />
  );

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-primary/10 p-4 sm:p-5 md:p-6">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            {t("villageLocation") || "Village Location"}
          </h2>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => openExternal(mapsDirectionsUrl)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm bg-primary/5 text-primary border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors flex-1 sm:flex-initial font-medium"
              aria-label="Get directions to village"
            >
              <Navigation className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{t("getDirections") || "Directions"}</span>
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors flex-1 sm:flex-initial font-medium"
              aria-label="View map fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden sm:inline">{t("fullscreen") || "Fullscreen"}</span>
              <span className="sm:hidden">Expand</span>
            </button>
          </div>
        </div>

        {/* ── Map ─────────────────────────────────────────────────────── */}
        <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden border border-primary/10 bg-gray-100 shadow-inner">
          <MapIframe title={`${villageName} Location Map`} />
        </div>

        {/* ── Coordinates + Info ──────────────────────────────────────── */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {/* Coordinates spans 2 cols on mobile, 1 on sm+ */}
          <div className="col-span-2 sm:col-span-1 text-center p-2.5 sm:p-3 bg-primary/5 border border-primary/10 rounded-xl">
            <p className="text-[10px] sm:text-xs text-primary font-semibold uppercase tracking-wide mb-1">
              {t("coordinates") || "Coordinates"}
            </p>
            <p className="font-bold text-gray-800 text-xs sm:text-sm font-mono">
              {latitude.toFixed(4)}°N
            </p>
            <p className="font-bold text-gray-800 text-xs sm:text-sm font-mono">
              {longitude.toFixed(4)}°E
            </p>
          </div>

          {INFO_ITEMS.map(({ labelKey, fallback, value }) => (
            <div
              key={labelKey}
              className="text-center p-2.5 sm:p-3 bg-gray-50 border border-gray-100 rounded-xl"
            >
              <p className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
                {t(labelKey) || fallback}
              </p>
              <p className="font-bold text-gray-800 text-xs sm:text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* ── Action Buttons ──────────────────────────────────────────── */}
        <div className="mt-4 flex flex-col xs:flex-row gap-2">
          <button
            onClick={() => openExternal(mapsSearchUrl)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold bg-primary text-white rounded-xl hover:bg-primary active:bg-primary transition-colors flex-1"
          >
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {t("openInGoogleMaps") || "Open in Google Maps"}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors flex-1"
          >
            <Share2 className="w-3.5 h-3.5 flex-shrink-0" />
            {copied
              ? t("linkCopied") || "Link copied!"
              : t("shareLocation") || "Share Location"}
          </button>
        </div>
      </div>

      {/* ── Fullscreen Modal ────────────────────────────────────────────── */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          onClick={(e) => e.target === e.currentTarget && setIsFullscreen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${villageName} fullscreen map`}
        >
          <div className="bg-white rounded-2xl w-full h-full sm:max-w-5xl sm:max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <h3 className="text-sm sm:text-base font-bold text-gray-800 truncate">
                  {villageName} — {t("villageLocation") || "Village Location"}
                </h3>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0 ml-3 font-medium"
                aria-label="Close fullscreen map"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t("close") || "Close"}</span>
              </button>
            </div>

            {/* Map */}
            <div className="flex-1 min-h-0">
              <MapIframe title={`${villageName} Location Map – Fullscreen`} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}