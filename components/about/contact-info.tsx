"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, Clock, Globe } from "lucide-react"

const ContactInfo = () => {
  const { t } = useLanguage()

  const contactDetails = [
    {
      icon: MapPin,
      label: "Address",
      value: ("gramPanchayatAddress"),
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 1234567890",
      href: "tel:+911234567890",
    },
    {
      icon: Mail,
      label: "Email",
      value: "gidhadi.panchayat@example.com",
      href: "mailto:gidhadi.panchayat@example.com",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Mon - Fri: 10:00 AM - 5:00 PM",
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.gpgidhadi.gov.in",
      href: "https://www.gpgidhadi.gov.in",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gov-blue">{t("contactUs")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contactDetails.map((contact, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="p-2 bg-gov-blue/10 rounded-lg">
                <contact.icon className="h-5 w-5 text-gov-blue" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{contact.label}</h4>
                {contact.href ? (
                  <a
                    href={contact.href}
                    className="text-gray-600 hover:text-gov-blue transition-colors"
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-gray-600">{contact.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactInfo
