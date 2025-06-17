"use client"

import { useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

const StatusTracker = () => {
  const { t } = useLanguage()
  const [referenceId, setReferenceId] = useState("")
  const [complaint, setComplaint] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!referenceId.trim()) return

    setIsSearching(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock complaint data
    const mockComplaint = {
      id: referenceId,
      name: "John Doe",
      type: "Water Supply",
      description: "Water supply has been interrupted for 3 days in our area.",
      status: "inProgress",
      submittedDate: "2023-06-15",
      lastUpdated: "2023-06-18",
      assignedTo: "Water Department",
    }

    setComplaint(mockComplaint)
    setIsSearching(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "inProgress":
        return <AlertCircle className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "inProgress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gov-blue">{t("trackStatus")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="referenceId">Reference ID</Label>
            <div className="mt-1 flex space-x-2">
              <Input
                id="referenceId"
                type="text"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value)}
                placeholder="Enter your reference ID"
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isSearching || !referenceId.trim()}>
                {isSearching ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {complaint && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Complaint Details</h3>
                <Badge className={`${getStatusColor(complaint.status)} flex items-center space-x-1`}>
                  {getStatusIcon(complaint.status)}
                  <span>{t(complaint.status)}</span>
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Reference ID</Label>
                  <p className="font-mono text-sm">{complaint.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Complaint Type</Label>
                  <p>{complaint.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Description</Label>
                  <p className="text-sm text-gray-700">{complaint.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Submitted</Label>
                    <p className="text-sm">{new Date(complaint.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Last Updated</Label>
                    <p className="text-sm">{new Date(complaint.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Assigned To</Label>
                  <p className="text-sm">{complaint.assignedTo}</p>
                </div>
              </div>
            </div>
          )}

          {referenceId && !complaint && !isSearching && (
            <div className="text-center py-4">
              <p className="text-gray-600">No complaint found with this reference ID.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default StatusTracker
