"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Phone, Shield, Truck } from "lucide-react"

const emergencyContacts = [
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

const EmergencyContact = () => {
  const { t } = useLanguage()

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
          {t("emergencyContacts")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between rounded-md bg-gray-50 p-3">
              <div className="flex items-center">
                <contact.icon className="mr-3 h-5 w-5 text-primary" />
                <span className="font-medium">{t(contact.nameKey)}</span>
              </div>
              <a
                href={`tel:${contact.number}`}
                className="font-mono text-sm font-semibold text-primary hover:underline"
              >
                {contact.number}
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default EmergencyContact
