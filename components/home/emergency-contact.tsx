"use client";

import { memo, FC } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Phone, Shield, Truck, LucideIcon } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmergencyContactItem {
  nameKey: string;
  number: string;
  icon: LucideIcon;
  color: string; // per-contact accent for quick visual scanning
}

// ─── Data (module-level constant — no useMemo needed) ─────────────────────────

const EMERGENCY_CONTACTS: EmergencyContactItem[] = [
  {
    nameKey: "police",
    number: "100",
    icon: Shield,
    color: "text-blue-600 bg-blue-50",
  },
  {
    nameKey: "fireBrigade",
    number: "101",
    icon: AlertTriangle,
    color: "text-orange-600 bg-orange-50",
  },
  {
    nameKey: "ambulance",
    number: "108",
    icon: Truck,
    color: "text-primary bg-green-50",
  },
];

// ─── Contact Row ──────────────────────────────────────────────────────────────
// Each row is a large tap target (min 52px) — comfortable for thumbs on
// low-end Android devices with smaller screens.

interface ContactItemProps {
  contact: EmergencyContactItem;
  translate: (key: string) => string;
}

const ContactItem: FC<ContactItemProps> = memo(({ contact, translate }) => {
  const { icon: Icon, number, nameKey, color } = contact;
  const [iconColor, iconBg] = color.split(" ");

  return (
    <a
      href={`tel:${number}`}
      // The entire row is tappable — better UX on mobile than a small link
      className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-100 px-3 py-3 sm:px-4 sm:py-3.5 active:bg-gray-100 transition-colors duration-150 gap-3 min-h-[52px]"
    >
      {/* Icon + Label */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span
          className={`flex-shrink-0 flex items-center justify-center rounded-lg w-9 h-9 ${iconBg}`}
        >
          <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconColor}`} />
        </span>
        {/* 
          text-sm (14px) on mobile — readable without squinting.
          Upgrades to text-base (16px) on sm+ screens.
        */}
        <span className="font-medium text-sm sm:text-base text-gray-800 truncate leading-snug">
          {translate(nameKey)}
        </span>
      </div>

      {/* Phone number — monospaced for digit alignment, never wraps */}
      <span className="font-mono text-sm sm:text-base font-semibold text-sky-700 whitespace-nowrap flex-shrink-0">
        {number}
      </span>
    </a>
  );
});
ContactItem.displayName = "ContactItem";

// ─── Main Component ───────────────────────────────────────────────────────────

const EmergencyContact: FC = () => {
  const { t } = useLanguage();

  return (
    /*
      On mobile: normal block card (no sticky — it stacks below EventCarousel).
      On lg+: sticky so it stays visible while scrolling the event list.
      
      Removed backdrop-blur — it can cause jank on low-end Android devices.
    */
    <Card className="lg:sticky lg:top-24 border-2 border-sky-600 bg-white shadow-md rounded-2xl">
      <CardHeader className="px-4 pt-4 pb-2 sm:px-5 sm:pt-5">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold text-gray-900">
          {/* 
            Pulsing alert icon — kept, but only on mobile where emergency
            visibility matters most. Reduced to h-5 w-5 to not overpower text.
          */}
          <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse flex-shrink-0" />
          <span className="leading-tight">{t("emergencyContacts")}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2">
        {/* 
          space-y-2 on mobile (tight but not cramped).
          Grows to space-y-3 on sm+ screens.
        */}
        <div className="space-y-2 sm:space-y-3">
          {EMERGENCY_CONTACTS.map((contact) => (
            <ContactItem key={contact.number} contact={contact} translate={t} />
          ))}
        </div>

        {/* Helper text — reassures users the numbers are correct */}
        <p className="mt-3 text-xs text-gray-400 text-center leading-snug">
          {t("tapToCall") ?? "Tap any row to call directly"}
        </p>
      </CardContent>
    </Card>
  );
};

export default EmergencyContact;
