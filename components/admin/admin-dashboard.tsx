"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, MessageSquare, Calendar, Edit, Trash2, Plus } from "lucide-react"

const AdminDashboard = () => {
  const { t } = useLanguage()

  const stats = [
    {
      title: "Total Complaints",
      value: "24",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "Pending Reviews",
      value: "8",
      icon: FileText,
      color: "text-orange-600",
    },
    {
      title: "Upcoming Events",
      value: "3",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Active Users",
      value: "156",
      icon: Users,
      color: "text-purple-600",
    },
  ]

  const recentComplaints = [
    {
      id: "GP001234",
      name: "Rajesh Kumar",
      type: "Water Supply",
      status: "pending",
      date: "2023-06-20",
    },
    {
      id: "GP001235",
      name: "Sunita Devi",
      type: "Road Maintenance",
      status: "inProgress",
      date: "2023-06-19",
    },
    {
      id: "GP001236",
      name: "Mohan Singh",
      type: "Street Lights",
      status: "resolved",
      date: "2023-06-18",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "inProgress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Complaints</CardTitle>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentComplaints.map((complaint) => (
              <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{complaint.name}</p>
                      <p className="text-sm text-gray-600">ID: {complaint.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{complaint.type}</p>
                      <p className="text-xs text-gray-500">{new Date(complaint.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(complaint.status)}>{t(complaint.status)}</Badge>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Manage Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="mr-2 h-4 w-4" />
              Update Announcements
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Manage Events
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Update Member Info
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Generate Monthly Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Complaint Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              User Activity Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              System Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              User Management
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Backup Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
