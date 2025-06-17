"use client"

import { useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, Filter } from "lucide-react"

const documents = [
  {
    id: 1,
    titleKey: "budgetReport2023",
    title: {
      en: "Annual Budget Report 2023-24",
      hi: "वार्षिक बजट रिपोर्ट 2023-24",
      mr: "वार्षिक अर्थसंकल्प अहवाल 2023-24",
    },
    type: "Budget",
    date: "2023-04-01",
    size: "2.5 MB",
    format: "PDF",
  },
  {
    id: 2,
    titleKey: "gramSabhaMinutes",
    title: {
      en: "Gram Sabha Meeting Minutes - June 2023",
      hi: "ग्राम सभा बैठक कार्यवृत्त - जून 2023",
      mr: "ग्रामसभा बैठक कार्यवृत्त - जून 2023",
    },
    type: "Minutes",
    date: "2023-06-25",
    size: "1.2 MB",
    format: "PDF",
  },
  {
    id: 3,
    titleKey: "birthCertificateForm",
    title: {
      en: "Birth Certificate Application Form",
      hi: "जन्म प्रमाणपत्र आवेदन फॉर्म",
      mr: "जन्म प्रमाणपत्र अर्जाचा नमुना",
    },
    type: "Forms",
    date: "2023-01-15",
    size: "0.8 MB",
    format: "PDF",
  },
  {
    id: 4,
    titleKey: "incomeCertificateForm",
    title: {
      en: "Income Certificate Application Form",
      hi: "आय प्रमाणपत्र आवेदन फॉर्म",
      mr: "उत्पन्न प्रमाणपत्र अर्जाचा नमुना",
    },
    type: "Forms",
    date: "2023-01-15",
    size: "0.9 MB",
    format: "PDF",
  },
  {
    id: 5,
    titleKey: "developmentPlan",
    title: {
      en: "Village Development Plan 2023-25",
      hi: "गांव विकास योजना 2023-25",
      mr: "गाव विकास योजना 2023-25",
    },
    type: "Plans",
    date: "2023-03-10",
    size: "3.2 MB",
    format: "PDF",
  },
  {
    id: 6,
    titleKey: "auditReport",
    title: {
      en: "Social Audit Report 2022-23",
      hi: "सामाजिक ऑडिट रिपोर्ट 2022-23",
      mr: "सामाजिक ऑडिट अहवाल 2022-23",
    },
    type: "Audit",
    date: "2023-05-20",
    size: "1.8 MB",
    format: "PDF",
  },
]

const DocumentsList = () => {
  const { t, language } = useLanguage()
  const [filter, setFilter] = useState("All")

  const filteredDocuments = filter === "All" ? documents : documents.filter((doc) => doc.type === filter)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Budget":
        return "bg-blue-100 text-blue-800"
      case "Minutes":
        return "bg-green-100 text-green-800"
      case "Forms":
        return "bg-orange-100 text-orange-800"
      case "Plans":
        return "bg-purple-100 text-purple-800"
      case "Audit":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownload = (document: any) => {
    // In a real application, this would trigger the actual download
    console.log(`Downloading: ${document.title[language]}`)
    // You could implement actual file download logic here
  }

  return (
    <div>
      {/* Filter Section */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-gov-blue" />
          <h2 className="text-2xl font-bold text-gray-900">{t("documentsDownloads")}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Documents</SelectItem>
              <SelectItem value="Budget">{t("budgetReports")}</SelectItem>
              <SelectItem value="Minutes">{t("meetingMinutes")}</SelectItem>
              <SelectItem value="Forms">{t("certificates")}</SelectItem>
              <SelectItem value="Plans">Development Plans</SelectItem>
              <SelectItem value="Audit">Audit Reports</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gov-blue/10 rounded-lg">
                    <FileText className="h-6 w-6 text-gov-blue" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{document.title[language]}</CardTitle>
                  </div>
                </div>
                <Badge className={getTypeColor(document.type)}>{document.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(document.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{document.format}</span>
                    <span>•</span>
                    <span>{document.size}</span>
                  </div>
                </div>
                <Button className="w-full" onClick={() => handleDownload(document)} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  {t("download")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600">Try adjusting your filter to see more documents.</p>
        </div>
      )}
    </div>
  )
}

export default DocumentsList
