"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"
import Image from "next/image"

const members = [
  {
    id: 1,
    name: {
      en: "Rajesh Kumar",
      hi: "राजेश कुमार",
      mr: "राजेश कुमार",
    },
    post: {
      en: "Sarpanch",
      hi: "सरपंच",
      mr: "सरपंच",
    },
    phone: "+91 98765 43210",
    email: "sarpanch.gidhadi@example.com",
    image: "/pnk.jpg",
  },
  {
    id: 2,
    name: {
      en: "Sunita Devi",
      hi: "सुनीता देवी",
      mr: "सुनीता देवी",
    },
    post: {
      en: "Up-Sarpanch",
      hi: "उप-सरपंच",
      mr: "उप-सरपंच",
    },
    phone: "+91 98765 43211",
    email: "upsarpanch.gidhadi@example.com",
    image: "/tejas.jpg",
  },
  {
    id: 3,
    name: {
      en: "Mohan Singh",
      hi: "मोहन सिंह",
      mr: "मोहन सिंह",
    },
    post: {
      en: "Ward Member",
      hi: "वार्ड सदस्य",
      mr: "वार्ड सदस्य",
    },
    phone: "+91 98765 43212",
    email: "ward1.gidhadi@example.com",
    image: "/tushar.jpg",
  },
  {
    id: 4,
    name: {
      en: "Priya Sharma",
      hi: "प्रिया शर्मा",
      mr: "प्रिया शर्मा",
    },
    post: {
      en: "Ward Member",
      hi: "वार्ड सदस्य",
      mr: "वार्ड सदस्य",
    },
    phone: "+91 98765 43213",
    email: "ward2.gidhadi@example.com",
    image: "/pnk.jpg",
  },
]

const MemberGrid = () => {
  const { t, language } = useLanguage()

  return (
    <div className="mt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Elected Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-gov-blue">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name[language]}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-1">{member.name[language]}</h3>
              <p className="text-gov-blue font-medium mb-3">{member.post[language]}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <a href={`tel:${member.phone}`} className="hover:text-gov-blue">
                    {member.phone}
                  </a>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <a href={`mailto:${member.email}`} className="hover:text-gov-blue text-xs">
                    {member.email}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MemberGrid
