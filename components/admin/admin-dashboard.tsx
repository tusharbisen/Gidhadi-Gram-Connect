// "use client"

// import { useLanguage } from "@/components/providers/language-provider"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Users, FileText, MessageSquare, Calendar, Edit, Trash2, Plus } from "lucide-react"

// const AdminDashboard = () => {
//   const { t } = useLanguage()

//   const stats = [
//     {
//       title: "Total Complaints",
//       value: "24",
//       icon: MessageSquare,
//       color: "text-blue-600",
//     },
//     {
//       title: "Pending Reviews",
//       value: "8",
//       icon: FileText,
//       color: "text-orange-600",
//     },
//     {
//       title: "Upcoming Events",
//       value: "3",
//       icon: Calendar,
//       color: "text-green-600",
//     },
//     {
//       title: "Active Users",
//       value: "156",
//       icon: Users,
//       color: "text-purple-600",
//     },
//   ]

//   const recentComplaints = [
//     {
//       id: "GP001234",
//       name: "Rajesh Kumar",
//       type: "Water Supply",
//       status: "pending",
//       date: "2023-06-20",
//     },
//     {
//       id: "GP001235",
//       name: "Sunita Devi",
//       type: "Road Maintenance",
//       status: "inProgress",
//       date: "2023-06-19",
//     },
//     {
//       id: "GP001236",
//       name: "Mohan Singh",
//       type: "Street Lights",
//       status: "resolved",
//       date: "2023-06-18",
//     },
//   ]

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "inProgress":
//         return "bg-blue-100 text-blue-800"
//       case "resolved":
//         return "bg-green-100 text-green-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <Card key={index}>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">{stat.title}</p>
//                   <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
//                 </div>
//                 <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
//                   <stat.icon className="h-6 w-6" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Recent Complaints */}
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle>Recent Complaints</CardTitle>
//           <Button size="sm">
//             <Plus className="mr-2 h-4 w-4" />
//             Add New
//           </Button>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {recentComplaints.map((complaint) => (
//               <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg">
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-4">
//                     <div>
//                       <p className="font-medium">{complaint.name}</p>
//                       <p className="text-sm text-gray-600">ID: {complaint.id}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium">{complaint.type}</p>
//                       <p className="text-xs text-gray-500">{new Date(complaint.date).toLocaleDateString()}</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Badge className={getStatusColor(complaint.status)}>{t(complaint.status)}</Badge>
//                   <Button variant="ghost" size="icon">
//                     <Edit className="h-4 w-4" />
//                   </Button>
//                   <Button variant="ghost" size="icon">
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Manage Content</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <Button variant="outline" className="w-full justify-start">
//               <FileText className="mr-2 h-4 w-4" />
//               Update Announcements
//             </Button>
//             <Button variant="outline" className="w-full justify-start">
//               <Calendar className="mr-2 h-4 w-4" />
//               Manage Events
//             </Button>
//             <Button variant="outline" className="w-full justify-start">
//               <Users className="mr-2 h-4 w-4" />
//               Update Member Info
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Reports</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <Button variant="outline" className="w-full justify-start">
//               Generate Monthly Report
//             </Button>
//             <Button variant="outline" className="w-full justify-start">
//               Complaint Analytics
//             </Button>
//             <Button variant="outline" className="w-full justify-start">
//               User Activity Report
//             </Button>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Settings</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <Button variant="outline" className="w-full justify-start">
//               System Settings
//             </Button>
//             <Button variant="outline" className="w-full justify-start">
//               User Management
//             </Button>
//             <Button variant="outline" className="w-full justify-start">
//               Backup Data
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard



"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  MessageSquare,
  Calendar,
  Edit,
  Trash2,
  Plus,
  Settings,
  BarChart2,
  DatabaseBackup,
  UserCog,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat {
  title: string;
  value: string;
  icon: React.ElementType;
  bgColor: string;
  textColor: string;
  trend?: string;
}

interface Complaint {
  id: string;
  name: string;
  type: string;
  status: "pending" | "inProgress" | "resolved";
  date: string;
}

interface QuickAction {
  label: string;
  icon: React.ElementType;
}

interface QuickActionGroup {
  title: string;
  icon: React.ElementType;
  actions: QuickAction[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  inProgress: "bg-blue-100 text-blue-800 border-blue-200",
  resolved: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const STATUS_DOT: Record<string, string> = {
  pending: "bg-amber-400",
  inProgress: "bg-blue-400",
  resolved: "bg-emerald-400",
};

const stats: Stat[] = [
  {
    title: "Total Complaints",
    value: "24",
    icon: MessageSquare,
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    trend: "+3 this week",
  },
  {
    title: "Pending Reviews",
    value: "8",
    icon: FileText,
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    trend: "2 urgent",
  },
  {
    title: "Upcoming Events",
    value: "3",
    icon: Calendar,
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600",
    trend: "Next: Tomorrow",
  },
  {
    title: "Active Users",
    value: "156",
    icon: Users,
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    trend: "+12 this month",
  },
];

const recentComplaints: Complaint[] = [
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
];

const quickActionGroups: QuickActionGroup[] = [
  {
    title: "Manage Content",
    icon: FileText,
    actions: [
      { label: "Update Announcements", icon: FileText },
      { label: "Manage Events", icon: Calendar },
      { label: "Update Member Info", icon: Users },
    ],
  },
  {
    title: "Reports",
    icon: BarChart2,
    actions: [
      { label: "Generate Monthly Report", icon: TrendingUp },
      { label: "Complaint Analytics", icon: BarChart2 },
      { label: "User Activity Report", icon: UserCog },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    actions: [
      { label: "System Settings", icon: SlidersHorizontal },
      { label: "User Management", icon: UserCog },
      { label: "Backup Data", icon: DatabaseBackup },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ stat }: { stat: Stat }) {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4 sm:p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">
              {stat.title}
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {stat.value}
            </p>
            {stat.trend && (
              <p className="text-[11px] text-gray-400 font-medium">{stat.trend}</p>
            )}
          </div>
          <div
            className={`p-2.5 sm:p-3 rounded-xl ${stat.bgColor} ${stat.textColor} flex-shrink-0`}
          >
            <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ComplaintRow({
  complaint,
  t,
}: {
  complaint: Complaint;
  t: (key: string) => string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm transition-all duration-200">
      {/* Info */}
      <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-4 flex-1 min-w-0">
        {/* Name + ID */}
        <div className="min-w-0">
          <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
            {complaint.name}
          </p>
          <p className="text-xs text-gray-400 font-mono">#{complaint.id}</p>
        </div>

        {/* Type + Date */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">
            {complaint.type}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(complaint.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Badge
          className={`${STATUS_STYLES[complaint.status]} border text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 px-2 py-0.5`}
        >
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full ${STATUS_DOT[complaint.status]}`}
          />
          {t(complaint.status)}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
          aria-label="Edit complaint"
        >
          <Edit className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
          aria-label="Delete complaint"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

function QuickActionCard({ group }: { group: QuickActionGroup }) {
  return (
    <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="p-4 sm:p-5 pb-3">
        <CardTitle className="text-sm sm:text-base font-bold text-gray-700 flex items-center gap-2">
          <group.icon className="h-4 w-4 text-emerald-500" />
          {group.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 pt-0 space-y-2">
        {group.actions.map(({ label, icon: Icon }) => (
          <Button
            key={label}
            variant="outline"
            className="w-full justify-start text-xs sm:text-sm text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-colors h-9"
          >
            <Icon className="mr-2 h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-5 sm:space-y-6 p-3 sm:p-4 md:p-6">

      {/* ── Page Title ──────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
          Gidhadi Gram Connect — Overview
        </p>
      </div>

      {/* ── Stats Grid ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* ── Recent Complaints ───────────────────────────────────────────── */}
      <Card className="border border-gray-100 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between gap-3 p-4 sm:p-5 md:p-6 pb-3">
          <CardTitle className="text-base sm:text-lg font-bold text-gray-800">
            Recent Complaints
          </CardTitle>
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4 flex-shrink-0"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add New
          </Button>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 md:p-6 pt-2 space-y-3">
          {recentComplaints.map((complaint) => (
            <ComplaintRow key={complaint.id} complaint={complaint} t={t} />
          ))}
        </CardContent>
      </Card>

      {/* ── Quick Actions ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {quickActionGroups.map((group) => (
          <QuickActionCard key={group.title} group={group} />
        ))}
      </div>

    </div>
  );
};

export default AdminDashboard;