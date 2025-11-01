"use client"

import { useMemo, memo, FC } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Phone, Shield, Truck, LucideIcon } from "lucide-react"

// --- TypeScript Definition for Clarity and Safety ---
interface EmergencyContactItem {
  nameKey: string
  number: string
  icon: LucideIcon
}

// --- Memoized Constant Data (Defined Outside the Component) ---
const EMERGENCY_CONTACTS: EmergencyContactItem[] = [
  {
    nameKey: "police",
    number: "100",
    icon: Shield,
  },
  {
    nameKey: "fireBrigade",
    number: "101",
    icon: AlertTriangle,
  },
  {
    nameKey: "ambulance",
    number: "108",
    icon: Truck,
  },
  {
    nameKey: "Admin",
    number: "+91 9168383674",
    icon: Phone,
  },
]

// --- Performance Optimization: Separate and Memoized List Item ---
interface ContactItemProps {
    contact: EmergencyContactItem;
    // Passing the translator function (t) as a prop for memoization dependency
    translate: (key: string) => string; 
}

const ContactItem: FC<ContactItemProps> = memo(({ contact, translate }) => {
    const { icon: Icon, number, nameKey } = contact;

    return (
        <div 
            // Using a unique ID (the number) as the key instead of array index
            key={number} 
            className="flex items-center justify-between rounded-md bg-gray-50 p-2.5 sm:p-3 md:p-3.5 border-2 shadow-md transition-shadow duration-300 hover:shadow-sky-400 gap-2"
        >
            <div className="flex items-center min-w-0 flex-1">
                <Icon className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-sky-700 flex-shrink-0" />
                <span className="font-medium text-xs sm:text-sm md:text-base truncate">
                    {translate(nameKey)}
                </span>
            </div>
            <a
                href={`tel:${number}`}
                className="font-mono text-xs sm:text-sm md:text-base font-semibold text-sky-700 hover:underline active:opacity-75 whitespace-nowrap flex-shrink-0"
            >
                {number}
            </a>
        </div>
    );
});
ContactItem.displayName = "ContactItem";

// --- Main Component ---
const EmergencyContact: FC = () => {
  const { t } = useLanguage()

  // Use useMemo for the contacts array just in case you ever filter/sort it
  const displayContacts = useMemo(() => EMERGENCY_CONTACTS, [])

  return (
    // Responsive sticky positioning and sizing
    <Card className="sticky top-20 sm:top-24 border-sky-700 border-2 bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader className="p-3 sm:p-4 md:p-6">
        <CardTitle className="flex items-center text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800">
          {/* UX Enhancement: Add subtle animation to draw attention - Responsive icon */}
          <AlertTriangle className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-red-600 animate-pulse flex-shrink-0" />
          <span className="leading-tight">{t("emergencyContacts")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 md:p-6 pt-0">
        <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
          {displayContacts.map((contact) => (
            <ContactItem 
                key={contact.number} 
                contact={contact} 
                translate={t} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EmergencyContact