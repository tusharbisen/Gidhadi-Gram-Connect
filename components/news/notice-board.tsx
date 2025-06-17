"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, AlertTriangle, FileText, Eye } from "lucide-react"

const notices = [
  {
    id: 1,
    title: {
      en: "Gram Sabha Meeting Notice - July 2023",
      hi: "ग्राम सभा बैठक सूचना - जुलाई 2023",
      mr: "ग्रामसभा बैठक सूचना - जुलै 2023",
    },
    description: {
      en: "Monthly Gram Sabha meeting scheduled for discussion on village development projects and budget allocation.",
      hi: "गांव विकास परियोजनाओं और बजट आवंटन पर चर्चा के लिए मासिक ग्राम सभा बैठक निर्धारित।",
      mr: "गाव विकास प्रकल्प आणि अर्थसंकल्प वाटपावर चर्चेसाठी मासिक ग्रामसभा बैठक नियोजित.",
    },
    date: "2023-06-25",
    urgent: false,
    type: "meeting",
    downloadUrl: "#",
    fileSize: "1.2 MB",
  },
  {
    id: 2,
    title: {
      en: "Water Supply Maintenance Notice - URGENT",
      hi: "पानी आपूर्ति रखरखाव सूचना - तत्काल",
      mr: "पाणी पुरवठा देखभाल सूचना - तातडीचे",
    },
    description: {
      en: "Emergency maintenance work on main water pipeline. Water supply will be interrupted from 10 AM to 2 PM.",
      hi: "मुख्य पानी पाइपलाइन पर आपातकालीन रखरखाव कार्य। सुबह 10 बजे से दोपहर 2 बजे तक पानी की आपूर्ति बाधित रहेगी।",
      mr: "मुख्य पाणी पाइपलाइनवर आपत्कालीन देखभाल कार्य. सकाळी 10 ते दुपारी 2 पर्यंत पाणी पुरवठा खंडित राहील.",
    },
    date: "2023-06-12",
    urgent: true,
    type: "maintenance",
    downloadUrl: "#",
    fileSize: "0.8 MB",
  },
  {
    id: 3,
    title: {
      en: "Annual Budget Approval Notice 2023-24",
      hi: "वार्षिक बजट अनुमोदन सूचना 2023-24",
      mr: "वार्षिक अर्थसंकल्प मंजुरी सूचना 2023-24",
    },
    description: {
      en: "Annual budget for financial year 2023-24 has been approved by the Gram Sabha. Details available for public review.",
      hi: "वित्तीय वर्ष 2023-24 के लिए वार्षिक बजट ग्राम सभा द्वारा अनुमोदित किया गया है। विवरण सार्वजनिक समीक्षा के लिए उपलब्ध।",
      mr: "आर्थिक वर्ष 2023-24 साठी वार्षिक अर्थसंकल्प ग्रामसभेने मंजूर केला आहे. तपशील सार्वजनिक पुनरावलोकनासाठी उपलब्ध.",
    },
    date: "2023-06-01",
    urgent: false,
    type: "budget",
    downloadUrl: "#",
    fileSize: "2.5 MB",
  },
  {
    id: 4,
    title: {
      en: "COVID-19 Vaccination Drive Notice",
      hi: "कोविड-19 टीकाकरण अभियान सूचना",
      mr: "कोविड-19 लसीकरण मोहीम सूचना",
    },
    description: {
      en: "Free COVID-19 vaccination drive for all eligible residents. Bring Aadhaar card and previous vaccination certificate.",
      hi: "सभी पात्र निवासियों के लिए मुफ्त कोविड-19 टीकाकरण अभियान। आधार कार्ड और पिछला टीकाकरण प्रमाणपत्र लाएं।",
      mr: "सर्व पात्र रहिवाशांसाठी मोफत कोविड-19 लसीकरण मोहीम. आधार कार्ड आणि मागील लसीकरण प्रमाणपत्र आणा.",
    },
    date: "2023-05-20",
    urgent: false,
    type: "health",
    downloadUrl: "#",
    fileSize: "1.1 MB",
  },
]

const NoticeBoard = () => {
  const { t, language } = useLanguage()

  const getNoticeTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-red-100 text-red-800"
      case "budget":
        return "bg-green-100 text-green-800"
      case "health":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getNoticeTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return "🏛️"
      case "maintenance":
        return "🔧"
      case "budget":
        return "💰"
      case "health":
        return "🏥"
      default:
        return "📄"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-gov-orange" />
          Official Notice Board
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                notice.urgent ? "border-red-200 bg-red-50 shadow-sm" : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="text-xl mt-1">{getNoticeTypeIcon(notice.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{notice.title[language]}</h3>
                      {notice.urgent && <Badge variant="destructive">URGENT</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{notice.description[language]}</p>
                  </div>
                </div>
                <Badge className={getNoticeTypeColor(notice.type)}>{notice.type}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(notice.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FileText className="mr-1 h-4 w-4" />
                    {notice.fileSize}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-1 h-4 w-4" />
                    {t("download")}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">
            View All Notices
            <FileText className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default NoticeBoard
