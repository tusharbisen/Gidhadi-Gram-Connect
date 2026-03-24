"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ChevronRight } from "lucide-react"

const upcomingEvents = [
  {
    id: 1,
    title: {
      en: "Monthly Gram Sabha Meeting",
      hi: "मासिक ग्राम सभा बैठक",
      mr: "मासिक ग्रामसभा बैठक",
    },
    date: "2023-07-25",
    time: "11:00 AM",
    location: {
      en: "Gram Panchayat Hall",
      hi: "ग्राम पंचायत हॉल",
      mr: "ग्रामपंचायत हॉल",
    },
    description: {
      en: "Monthly meeting to discuss village development and budget allocation",
      hi: "गांव के विकास और बजट आवंटन पर चर्चा के लिए मासिक बैठक",
      mr: "गावाच्या विकासावर आणि अर्थसंकल्प वाटपावर चर्चा करण्यासाठी मासिक बैठक",
    },
    type: "meeting",
    attendees: "All villagers",
  },
  {
    id: 2,
    title: {
      en: "Health Check-up Camp",
      hi: "स्वास्थ्य जांच शिविर",
      mr: "आरोग्य तपासणी शिबिर",
    },
    date: "2023-07-30",
    time: "9:00 AM - 4:00 PM",
    location: {
      en: "Primary Health Center",
      hi: "प्राथमिक स्वास्थ्य केंद्र",
      mr: "प्राथमिक आरोग्य केंद्र",
    },
    description: {
      en: "Free health check-up camp for all age groups with specialist doctors",
      hi: "विशेषज्ञ डॉक्टरों के साथ सभी आयु समूहों के लिए मुफ्त स्वास्थ्य जांच शिविर",
      mr: "तज्ञ डॉक्टरांसह सर्व वयोगटांसाठी मोफत आरोग्य तपासणी शिबिर",
    },
    type: "health",
    attendees: "Open to all",
  },
  {
    id: 3,
    title: {
      en: "Skill Development Workshop",
      hi: "कौशल विकास कार्यशाला",
      mr: "कौशल्य विकास कार्यशाळा",
    },
    date: "2023-08-05",
    time: "2:00 PM - 5:00 PM",
    location: {
      en: "Community Center",
      hi: "सामुदायिक केंद्र",
      mr: "सामुदायिक केंद्र",
    },
    description: {
      en: "Training workshop on digital literacy and entrepreneurship skills",
      hi: "डिजिटल साक्षरता और उद्यमिता कौशल पर प्रशिक्षण कार्यशाला",
      mr: "डिजिटल साक्षरता आणि उद्योजकता कौशल्यावर प्रशिक्षण कार्यशाळा",
    },
    type: "training",
    attendees: "Youth (18-35 years)",
  },
  {
    id: 4,
    title: {
      en: "Cleanliness Drive",
      hi: "स्वच्छता अभियान",
      mr: "स्वच्छता मोहीम",
    },
    date: "2023-08-12",
    time: "6:00 AM - 10:00 AM",
    location: {
      en: "Village Square",
      hi: "गांव चौक",
      mr: "गाव चौक",
    },
    description: {
      en: "Community cleanliness drive to maintain village hygiene and environment",
      hi: "गांव की स्वच्छता और पर्यावरण बनाए रखने के लिए सामुदायिक स्वच्छता अभियान",
      mr: "गावाची स्वच्छता आणि पर्यावरण राखण्यासाठी सामुदायिक स्वच्छता मोहीम",
    },
    type: "environment",
    attendees: "All volunteers",
  },
]

const pastEvents = [
  {
    id: 5,
    title: {
      en: "Independence Day Celebration",
      hi: "स्वतंत्रता दिवस समारोह",
      mr: "स्वातंत्र्य दिन समारंभ",
    },
    date: "2023-08-15",
    type: "celebration",
  },
  {
    id: 6,
    title: {
      en: "Tree Plantation Drive",
      hi: "वृक्षारोपण अभियान",
      mr: "वृक्षारोपण मोहीम",
    },
    date: "2023-07-05",
    type: "environment",
  },
]

const EventsList = () => {
  const { language, t } = useLanguage()

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800"
      case "health":
        return "bg-green-100 text-green-800"
      case "training":
        return "bg-purple-100 text-purple-800"
      case "environment":
        return "bg-emerald-100 text-emerald-800"
      case "celebration":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return "🏛️"
      case "health":
        return "🏥"
      case "training":
        return "📚"
      case "environment":
        return "🌱"
      case "celebration":
        return "🎉"
      default:
        return "📅"
    }
  }

  return (
    <div className="space-y-6">
      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-gov-blue" />
            {t("upcomingEvents")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getEventTypeIcon(event.type)}</div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{event.title[language]}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.description[language]}</p>
                    </div>
                  </div>
                  <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-gov-blue" />
                    <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-gov-blue" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-gov-blue" />
                    <span>{event.location[language]}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="mr-1 h-4 w-4" />
                    <span>{event.attendees}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    {t("viewDetails")}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-gray-600" />
            {t("pastEvents")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="text-lg opacity-60">{getEventTypeIcon(event.type)}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title[language]}</h4>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getEventTypeColor(event.type)}>
                  {event.type}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline">
              {t("viewAllPastEvents")}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EventsList
