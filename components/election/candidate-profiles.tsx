"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Phone, Mail } from "lucide-react"
import Image from "next/image"

const candidates = [
  {
    id: 1,
    name: {
      en: "Rajesh Kumar",
      hi: "राजेश कुमार",
      mr: "राजेश कुमार",
    },
    position: {
      en: "Sarpanch",
      hi: "सरपंच",
      mr: "सरपंच",
    },
    party: "Independent",
    age: 45,
    education: {
      en: "Graduate",
      hi: "स्नातक",
      mr: "पदवीधर",
    },
    experience: {
      en: "10 years in local governance",
      hi: "स्थानीय शासन में 10 साल का अनुभव",
      mr: "स्थानिक शासनात 10 वर्षांचा अनुभव",
    },
    manifesto: {
      en: "Focus on water supply, road development, and digital literacy",
      hi: "पानी की आपूर्ति, सड़क विकास और डिजिटल साक्षरता पर ध्यान",
      mr: "पाणी पुरवठा, रस्ता विकास आणि डिजिटल साक्षरतेवर लक्ष",
    },
    phone: "+91 98765 43210",
    email: "rajesh.kumar@example.com",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: {
      en: "Sunita Devi",
      hi: "सुनीता देवी",
      mr: "सुनीता देवी",
    },
    position: {
      en: "Sarpanch",
      hi: "सरपंच",
      mr: "सरपंच",
    },
    party: "Independent",
    age: 42,
    education: {
      en: "Post Graduate",
      hi: "स्नातकोत्तर",
      mr: "पदव्युत्तर",
    },
    experience: {
      en: "8 years in women's self-help groups",
      hi: "महिला स्वयं सहायता समूहों में 8 साल का अनुभव",
      mr: "महिला स्वयंसहायता गटांमध्ये 8 वर्षांचा अनुभव",
    },
    manifesto: {
      en: "Women empowerment, healthcare, and education for all",
      hi: "महिला सशक्तिकरण, स्वास्थ्य सेवा और सभी के लिए शिक्षा",
      mr: "महिला सक्षमीकरण, आरोग्यसेवा आणि सर्वांसाठी शिक्षण",
    },
    phone: "+91 98765 43211",
    email: "sunita.devi@example.com",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const CandidateProfiles = () => {
  const { t, language } = useLanguage()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5 text-gov-blue" />
          Candidate Profiles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Candidate Photo */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0">
                    <Image
                      src={candidate.image || "/placeholder.svg"}
                      alt={candidate.name[language]}
                      fill
                      className="object-cover rounded-lg border-2 border-gov-blue"
                    />
                  </div>
                </div>

                {/* Candidate Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{candidate.name[language]}</h3>
                      <p className="text-gov-blue font-medium">{candidate.position[language]}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0">
                      <Badge variant="outline">{candidate.party}</Badge>
                      <Badge variant="secondary">Age: {candidate.age}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Education:</span>
                      <p>{candidate.education[language]}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Experience:</span>
                      <p>{candidate.experience[language]}</p>
                    </div>
                  </div>

                  <div>
                    <span className="font-medium text-gray-600">Key Manifesto Points:</span>
                    <p className="text-sm text-gray-700 mt-1">{candidate.manifesto[language]}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Phone className="mr-1 h-4 w-4" />
                        <a href={`tel:${candidate.phone}`} className="hover:text-gov-blue">
                          {candidate.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="mr-1 h-4 w-4" />
                        <a href={`mailto:${candidate.email}`} className="hover:text-gov-blue">
                          Contact
                        </a>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Full Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default CandidateProfiles
