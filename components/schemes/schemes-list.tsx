// "use client"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   FileText,
//   Wheat,
//   Heart,
//   Users,
//   GraduationCap,
//   Briefcase,
//   Building2,
//   Calendar,
//   IndianRupee,
//   Languages,
//   X,
// } from "lucide-react"

// interface Scheme {
//   id: number
//   name: string
//   category: string
//   type: string
//   description: string
//   benefits: string
//   deadline: string
//   eligibility: string
//   eligibilityCriteria: string[]
//   applyLink: string
// }

// // Sample scheme data with eligibility criteria
// const schemes: Scheme[] = [
//   {
//     id: 1,
//     name: "PM-KISAN Samman Nidhi",
//     category: "Agriculture",
//     type: "Central",
//     description: "Direct income support to small and marginal farmers",
//     benefits: "₹6,000/year",
//     deadline: "Ongoing",
//     eligibility: "Small & marginal farmers",
//     eligibilityCriteria: [
//       "Applicable to small & marginal farmers",
//       "Farmer should own less than 2 hectares of land",
//       "Must be a citizen of India",
//       "Government employees and taxpayers are not eligible",
//       "Aadhaar and bank account linking is mandatory",
//     ],
//     applyLink: "https://pmkisan.gov.in",
//   },
//   {
//     id: 2,
//     name: "Mahatma Jyotiba Phule Jan Arogya Yojana",
//     category: "Health & Insurance",
//     type: "Maharashtra",
//     description: "Health insurance coverage for families",
//     benefits: "₹1.5 lakh/year",
//     deadline: "31st March 2024",
//     eligibility: "BPL families",
//     eligibilityCriteria: [
//       "Family must be Below Poverty Line (BPL)",
//       "Annual family income should be less than ₹1 lakh",
//       "Must be a resident of Maharashtra",
//       "Aadhaar card is mandatory for all family members",
//       "Valid ration card required",
//     ],
//     applyLink: "https://www.jeevandayee.gov.in",
//   },
//   {
//     id: 3,
//     name: "Pradhan Mantri Matru Vandana Yojana",
//     category: "Women & Children",
//     type: "Central",
//     description: "Maternity benefit for pregnant and lactating mothers",
//     benefits: "₹5,000",
//     deadline: "Ongoing",
//     eligibility: "Pregnant women",
//     eligibilityCriteria: [
//       "Pregnant and lactating mothers",
//       "Age should be 19 years or above",
//       "First living child only",
//       "Must register pregnancy at Anganwadi/Health facility",
//       "Bank account and Aadhaar linking required",
//     ],
//     applyLink: "https://pmmvy.wcd.gov.in",
//   },
//   {
//     id: 4,
//     name: "Lek Ladki Yojana",
//     category: "Women & Children",
//     type: "Maharashtra",
//     description: "Financial assistance for girl child education",
//     benefits: "₹75,000 total",
//     deadline: "Ongoing",
//     eligibility: "Girl children",
//     eligibilityCriteria: [
//       "Applicable for girl children born after 1st April 2023",
//       "Family income should be less than ₹1 lakh per annum",
//       "Must be a resident of Maharashtra",
//       "Yellow or Orange ration card holders eligible",
//       "Bank account in girl child's name required",
//     ],
//     applyLink: "https://womenchild.maharashtra.gov.in",
//   },
//   {
//     id: 5,
//     name: "PM Scholarship Scheme",
//     category: "Education & Youth",
//     type: "Central",
//     description: "Scholarships for higher education",
//     benefits: "₹2,500/month",
//     deadline: "15th October 2024",
//     eligibility: "Merit students",
//     eligibilityCriteria: [
//       "Students pursuing professional courses",
//       "Minimum 60% marks in 12th standard",
//       "Family income less than ₹6 lakh per annum",
//       "Age limit: 18-25 years",
//       "Valid Aadhaar and bank account required",
//     ],
//     applyLink: "https://scholarships.gov.in",
//   },
//   {
//     id: 6,
//     name: "MGNREGA",
//     category: "Employment",
//     type: "Central",
//     description: "Guaranteed employment for rural households",
//     benefits: "₹309/day",
//     deadline: "Ongoing",
//     eligibility: "Rural households",
//     eligibilityCriteria: [
//       "Adult members of rural households",
//       "Must be willing to do unskilled manual work",
//       "Job card registration required",
//       "Minimum age: 18 years",
//       "Valid address proof and bank account needed",
//     ],
//     applyLink: "https://nrega.nic.in",
//   },
//   {
//     id: 7,
//     name: "Pradhan Mantri Awas Yojana - Gramin",
//     category: "Rural Development",
//     type: "Central",
//     description: "Housing assistance for rural poor",
//     benefits: "₹1.2 lakh",
//     deadline: "31st March 2024",
//     eligibility: "Homeless families",
//     eligibilityCriteria: [
//       "Families without pucca house",
//       "Rural area residents only",
//       "Not availed housing scheme benefits before",
//       "Annual income less than ₹1 lakh",
//       "Valid documents and bank account required",
//     ],
//     applyLink: "https://pmayg.nic.in",
//   },
//   {
//     id: 8,
//     name: "Krishi Sinchan Yojana",
//     category: "Agriculture",
//     type: "Maharashtra",
//     description: "Irrigation support for farmers",
//     benefits: "50% subsidy",
//     deadline: "30th November 2024",
//     eligibility: "All farmers",
//     eligibilityCriteria: [
//       "Registered farmers in Maharashtra",
//       "Valid land ownership documents",
//       "Minimum 0.5 hectare land holding",
//       "No previous subsidy for same purpose",
//       "Bank account and Aadhaar linking mandatory",
//     ],
//     applyLink: "https://krishi.maharashtra.gov.in",
//   },
//   {
//     id: 9,
//     name: "e-Shram Card",
//     category: "Employment",
//     type: "Central",
//     description: "Registration portal for unorganized sector workers",
//     benefits: "Insurance + job mapping + social welfare",
//     deadline: "Ongoing",
//     eligibility: "Unorganized sector workers",
//     eligibilityCriteria: [
//       "Unorganized sector workers aged 16-59 years",
//       "Should not be a member of EPFO/ESIC/NPS",
//       "Must have Aadhaar card and mobile number",
//       "Bank account with Aadhaar linking required",
//       "Valid address proof needed",
//     ],
//     applyLink: "https://eshram.gov.in",
//   },
//   {
//     id: 10,
//     name: "Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY)",
//     category: "Rural Development",
//     type: "Central",
//     description: "Free food grains distribution scheme",
//     benefits: "Free food grains",
//     deadline: "Ongoing",
//     eligibility: "Ration card holders",
//     eligibilityCriteria: [
//       "Valid ration card holders",
//       "Beneficiaries under National Food Security Act",
//       "Automatic coverage through Public Distribution System",
//       "No separate application required",
//       "Available at designated fair price shops",
//     ],
//     applyLink: "Automatically via PDS",
//   },
//   {
//     id: 11,
//     name: "Sukanya Samriddhi Yojana",
//     category: "Women & Children",
//     type: "Central",
//     description: "Savings scheme for girl child education and marriage",
//     benefits: "High interest savings + tax benefit",
//     deadline: "Ongoing",
//     eligibility: "Parents of girl child below 10 years",
//     eligibilityCriteria: [
//       "Girl child should be below 10 years of age",
//       "Maximum 2 accounts per family allowed",
//       "Minimum deposit ₹250 per year",
//       "Account can be opened by parents/legal guardian",
//       "Valid birth certificate and address proof required",
//     ],
//     applyLink: "At post offices and banks",
//   },
//   {
//     id: 12,
//     name: "Ayushman Bharat – PMJAY",
//     category: "Health & Insurance",
//     type: "Central",
//     description: "World's largest health insurance scheme",
//     benefits: "Free health insurance up to ₹5 lakh/year",
//     deadline: "Ongoing",
//     eligibility: "Low-income families listed in SECC 2011",
//     eligibilityCriteria: [
//       "Families listed in Socio-Economic Caste Census (SECC) 2011",
//       "Rural families with specific deprivation criteria",
//       "Urban families in occupational categories",
//       "No premium payment required",
//       "Cashless treatment at empaneled hospitals",
//     ],
//     applyLink: "https://pmjay.gov.in",
//   },
//   {
//     id: 13,
//     name: "Pandit Deendayal Upadhyay Grameen Kaushalya Yojana",
//     category: "Education & Youth",
//     type: "Central",
//     description: "Skill development program for rural youth",
//     benefits: "Skill training and placement",
//     deadline: "Ongoing",
//     eligibility: "Rural youth (15–35 yrs) below poverty line",
//     eligibilityCriteria: [
//       "Rural youth aged between 15-35 years",
//       "Family should be below poverty line",
//       "Minimum educational qualification: Class 5th pass",
//       "Should be willing to migrate for employment",
//       "Valid Aadhaar and bank account required",
//     ],
//     applyLink: "https://ddugky.gov.in",
//   },
// ]

// const categories = [
//   { id: "All", name: "All", icon: FileText },
//   { id: "Agriculture", name: "Agriculture", icon: Wheat },
//   { id: "Health & Insurance", name: "Health & Insurance", icon: Heart },
//   { id: "Women & Children", name: "Women & Children", icon: Users },
//   { id: "Education & Youth", name: "Education & Youth", icon: GraduationCap },
//   { id: "Employment", name: "Employment", icon: Briefcase },
//   { id: "Rural Development", name: "Rural Development", icon: Building2 },
// ]

// export default function GidhadiGramConnect() {
//   const [activeCategory, setActiveCategory] = useState("All")
//   const [language, setLanguage] = useState("English")
//   const [showModal, setShowModal] = useState(false)
//   const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null)

//   const filteredSchemes =
//     activeCategory === "All" ? schemes : schemes.filter((scheme) => scheme.category === activeCategory)

//   const handleCheckEligibility = (scheme: Scheme) => {
//     setSelectedScheme(scheme)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedScheme(null)
//   }

//   const handleApplyNow = (applyLink: string) => {
//     if (applyLink && applyLink !== "Automatically via PDS" && applyLink !== "At post offices and banks") {
//       window.open(applyLink, "_blank", "noopener,noreferrer")
//     } else if (applyLink === "At post offices and banks") {
//       alert("Please visit your nearest post office or bank to apply for this scheme.")
//     } else if (applyLink === "Automatically via PDS") {
//       alert(
//         "This scheme is automatically available through the Public Distribution System. No separate application required.",
//       )
//     } else {
//       alert("Application link will be available soon. Please check back later.")
//     }
//   }

//   return (
//     <div className="bg-gradient-to-br from-sky-50 to-blue-50">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-sky-500 to-sky-700 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore Government Schemes for You</h1>
//           <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
//             Central and Maharashtra-specific schemes to support farmers, women, students, and rural families
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100">
//               Browse All Schemes
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-white text-white hover:bg-white hover:text-sky-600 bg-transparent"
//               onClick={() => handleCheckEligibility(schemes[0])}
//             >
//               Check Eligibility
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Eligibility Modal */}
//       {showModal && selectedScheme && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto">
//             <button
//               className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
//               onClick={closeModal}
//             >
//               <X className="w-5 h-5" />
//             </button>
//             <div className="pr-8">
//               <h2 className="text-xl font-bold text-sky-700 mb-2">{selectedScheme.name}</h2>
//               <Badge
//                 variant={selectedScheme.type === "Central" ? "default" : "secondary"}
//                 className={
//                   selectedScheme.type === "Central"
//                     ? "bg-blue-100 text-blue-800 mb-4"
//                     : "bg-orange-100 text-orange-800 mb-4"
//                 }
//               >
//                 {selectedScheme.type} Scheme
//               </Badge>
//               <h3 className="font-semibold text-gray-800 mb-3">Eligibility Criteria:</h3>
//               <ul className="list-disc list-inside text-gray-700 space-y-2">
//                 {selectedScheme.eligibilityCriteria.map((criteria, index) => (
//                   <li key={index} className="text-sm leading-relaxed">
//                     {criteria}
//                   </li>
//                 ))}
//               </ul>
//               <div className="mt-6 p-3 bg-sky-50 rounded-lg">
//                 <p className="text-sm text-sky-800">
//                   <strong>Benefits:</strong> {selectedScheme.benefits}
//                 </p>
//                 <p className="text-sm text-sky-800 mt-1">
//                   <strong>Deadline:</strong> {selectedScheme.deadline}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Category Tabs */}
//         <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
//           <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 mb-8 bg-white shadow-md">
//             {categories.map((category) => {
//               const IconComponent = category.icon
//               return (
//                 <TabsTrigger
//                   key={category.id}
//                   value={category.id}
//                   className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-sky-100 data-[state=active]:text-sky-700"
//                 >
//                   <IconComponent className="w-4 h-4" />
//                   <span className="text-xs hidden sm:block">{category.name}</span>
//                 </TabsTrigger>
//               )
//             })}
//           </TabsList>

//           <TabsContent value={activeCategory} className="mt-0">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredSchemes.map((scheme) => (
//                 <Card key={scheme.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
//                   <CardHeader className="pb-3">
//                     <div className="flex justify-between items-start mb-2">
//                       <Badge
//                         variant={scheme.type === "Central" ? "default" : "secondary"}
//                         className={
//                           scheme.type === "Central" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"
//                         }
//                       >
//                         {scheme.type}
//                       </Badge>
//                     </div>
//                     <CardTitle className="text-lg leading-tight">{scheme.name}</CardTitle>
//                     <CardDescription className="text-sm">{scheme.description}</CardDescription>
//                   </CardHeader>
//                   <CardContent className="pb-3">
//                     <div className="space-y-2">
//                       <div className="flex items-center text-sky-600 font-semibold">
//                         <IndianRupee className="w-4 h-4 mr-1" />
//                         <span>{scheme.benefits}</span>
//                       </div>
//                       <div className="flex items-center text-gray-600 text-sm">
//                         <Calendar className="w-4 h-4 mr-1" />
//                         <span>Deadline: {scheme.deadline}</span>
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         <strong>Eligibility:</strong> {scheme.eligibility}
//                       </div>
//                     </div>
//                   </CardContent>
//                   <CardFooter className="flex gap-2 pt-0">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="flex-1 bg-transparent"
//                       onClick={() => handleCheckEligibility(scheme)}
//                     >
//                       Check Eligibility
//                     </Button>
//                     <Button
//                       size="sm"
//                       className="flex-1 bg-sky-600 hover:bg-sky-700"
//                       onClick={() => handleApplyNow(scheme.applyLink)}
//                     >
//                       Apply Now
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>

//         {filteredSchemes.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No schemes found in this category.</p>
//           </div>
//         )}
//       </main>

//       {/* Language Toggle Button */}
//       <Button
//         className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-sky-600 hover:bg-sky-700"
//         onClick={() => setLanguage(language === "English" ? "Marathi" : "English")}
//       >
//         <Languages className="w-6 h-6" />
//       </Button>
//     </div>
//   )
// }
"use client";

import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Wheat,
  Heart,
  Users,
  GraduationCap,
  Briefcase,
  Building2,
  Calendar,
  IndianRupee,
  X,
  CheckCircle2,
  ExternalLink,
  MapPin,
  ChevronDown,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Scheme {
  id: number;
  name: string;
  category: string;
  type: "Central" | "Maharashtra";
  description: string;
  benefits: string;
  deadline: string;
  eligibility: string;
  eligibilityCriteria: string[];
  applyLink: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const schemes: Scheme[] = [
  {
    id: 1,
    name: "PM-KISAN Samman Nidhi",
    category: "Agriculture",
    type: "Central",
    description: "Direct income support to small and marginal farmers",
    benefits: "₹6,000/year",
    deadline: "Ongoing",
    eligibility: "Small & marginal farmers",
    eligibilityCriteria: [
      "Applicable to small & marginal farmers",
      "Farmer should own less than 2 hectares of land",
      "Must be a citizen of India",
      "Government employees and taxpayers are not eligible",
      "Aadhaar and bank account linking is mandatory",
    ],
    applyLink: "https://pmkisan.gov.in",
  },
  {
    id: 2,
    name: "Mahatma Jyotiba Phule Jan Arogya Yojana",
    category: "Health & Insurance",
    type: "Maharashtra",
    description: "Health insurance coverage for families",
    benefits: "₹1.5 lakh/year",
    deadline: "31st March 2024",
    eligibility: "BPL families",
    eligibilityCriteria: [
      "Family must be Below Poverty Line (BPL)",
      "Annual family income should be less than ₹1 lakh",
      "Must be a resident of Maharashtra",
      "Aadhaar card is mandatory for all family members",
      "Valid ration card required",
    ],
    applyLink: "https://www.jeevandayee.gov.in",
  },
  {
    id: 3,
    name: "Pradhan Mantri Matru Vandana Yojana",
    category: "Women & Children",
    type: "Central",
    description: "Maternity benefit for pregnant and lactating mothers",
    benefits: "₹5,000",
    deadline: "Ongoing",
    eligibility: "Pregnant women",
    eligibilityCriteria: [
      "Pregnant and lactating mothers",
      "Age should be 19 years or above",
      "First living child only",
      "Must register pregnancy at Anganwadi/Health facility",
      "Bank account and Aadhaar linking required",
    ],
    applyLink: "https://pmmvy.wcd.gov.in",
  },
  {
    id: 4,
    name: "Lek Ladki Yojana",
    category: "Women & Children",
    type: "Maharashtra",
    description: "Financial assistance for girl child education",
    benefits: "₹75,000 total",
    deadline: "Ongoing",
    eligibility: "Girl children",
    eligibilityCriteria: [
      "Applicable for girl children born after 1st April 2023",
      "Family income should be less than ₹1 lakh per annum",
      "Must be a resident of Maharashtra",
      "Yellow or Orange ration card holders eligible",
      "Bank account in girl child's name required",
    ],
    applyLink: "https://womenchild.maharashtra.gov.in",
  },
  {
    id: 5,
    name: "PM Scholarship Scheme",
    category: "Education & Youth",
    type: "Central",
    description: "Scholarships for higher education",
    benefits: "₹2,500/month",
    deadline: "15th October 2024",
    eligibility: "Merit students",
    eligibilityCriteria: [
      "Students pursuing professional courses",
      "Minimum 60% marks in 12th standard",
      "Family income less than ₹6 lakh per annum",
      "Age limit: 18–25 years",
      "Valid Aadhaar and bank account required",
    ],
    applyLink: "https://scholarships.gov.in",
  },
  {
    id: 6,
    name: "MGNREGA",
    category: "Employment",
    type: "Central",
    description: "Guaranteed employment for rural households",
    benefits: "₹309/day",
    deadline: "Ongoing",
    eligibility: "Rural households",
    eligibilityCriteria: [
      "Adult members of rural households",
      "Must be willing to do unskilled manual work",
      "Job card registration required",
      "Minimum age: 18 years",
      "Valid address proof and bank account needed",
    ],
    applyLink: "https://nrega.nic.in",
  },
  {
    id: 7,
    name: "Pradhan Mantri Awas Yojana – Gramin",
    category: "Rural Development",
    type: "Central",
    description: "Housing assistance for rural poor",
    benefits: "₹1.2 lakh",
    deadline: "31st March 2024",
    eligibility: "Homeless families",
    eligibilityCriteria: [
      "Families without pucca house",
      "Rural area residents only",
      "Not availed housing scheme benefits before",
      "Annual income less than ₹1 lakh",
      "Valid documents and bank account required",
    ],
    applyLink: "https://pmayg.nic.in",
  },
  {
    id: 8,
    name: "Krishi Sinchan Yojana",
    category: "Agriculture",
    type: "Maharashtra",
    description: "Irrigation support for farmers",
    benefits: "50% subsidy",
    deadline: "30th November 2024",
    eligibility: "All farmers",
    eligibilityCriteria: [
      "Registered farmers in Maharashtra",
      "Valid land ownership documents",
      "Minimum 0.5 hectare land holding",
      "No previous subsidy for same purpose",
      "Bank account and Aadhaar linking mandatory",
    ],
    applyLink: "https://krishi.maharashtra.gov.in",
  },
  {
    id: 9,
    name: "e-Shram Card",
    category: "Employment",
    type: "Central",
    description: "Registration portal for unorganized sector workers",
    benefits: "Insurance + job mapping + social welfare",
    deadline: "Ongoing",
    eligibility: "Unorganized sector workers",
    eligibilityCriteria: [
      "Unorganized sector workers aged 16–59 years",
      "Should not be a member of EPFO/ESIC/NPS",
      "Must have Aadhaar card and mobile number",
      "Bank account with Aadhaar linking required",
      "Valid address proof needed",
    ],
    applyLink: "https://eshram.gov.in",
  },
  {
    id: 10,
    name: "Pradhan Mantri Garib Kalyan Anna Yojana",
    category: "Rural Development",
    type: "Central",
    description: "Free food grains distribution scheme",
    benefits: "Free food grains",
    deadline: "Ongoing",
    eligibility: "Ration card holders",
    eligibilityCriteria: [
      "Valid ration card holders",
      "Beneficiaries under National Food Security Act",
      "Automatic coverage through Public Distribution System",
      "No separate application required",
      "Available at designated fair price shops",
    ],
    applyLink: "Automatically via PDS",
  },
  {
    id: 11,
    name: "Sukanya Samriddhi Yojana",
    category: "Women & Children",
    type: "Central",
    description: "Savings scheme for girl child education and marriage",
    benefits: "High interest savings + tax benefit",
    deadline: "Ongoing",
    eligibility: "Parents of girl child below 10 years",
    eligibilityCriteria: [
      "Girl child should be below 10 years of age",
      "Maximum 2 accounts per family allowed",
      "Minimum deposit ₹250 per year",
      "Account can be opened by parents/legal guardian",
      "Valid birth certificate and address proof required",
    ],
    applyLink: "At post offices and banks",
  },
  {
    id: 12,
    name: "Ayushman Bharat – PMJAY",
    category: "Health & Insurance",
    type: "Central",
    description: "World's largest health insurance scheme",
    benefits: "Free health insurance up to ₹5 lakh/year",
    deadline: "Ongoing",
    eligibility: "Low-income families listed in SECC 2011",
    eligibilityCriteria: [
      "Families listed in Socio-Economic Caste Census (SECC) 2011",
      "Rural families with specific deprivation criteria",
      "Urban families in occupational categories",
      "No premium payment required",
      "Cashless treatment at empaneled hospitals",
    ],
    applyLink: "https://pmjay.gov.in",
  },
  {
    id: 13,
    name: "Pandit Deendayal Upadhyay Grameen Kaushalya Yojana",
    category: "Education & Youth",
    type: "Central",
    description: "Skill development program for rural youth",
    benefits: "Skill training and placement",
    deadline: "Ongoing",
    eligibility: "Rural youth (15–35 yrs) below poverty line",
    eligibilityCriteria: [
      "Rural youth aged between 15–35 years",
      "Family should be below poverty line",
      "Minimum educational qualification: Class 5th pass",
      "Should be willing to migrate for employment",
      "Valid Aadhaar and bank account required",
    ],
    applyLink: "https://ddugky.gov.in",
  },
];

const categories: Category[] = [
  { id: "All", name: "All", icon: FileText },
  { id: "Agriculture", name: "Agriculture", icon: Wheat },
  { id: "Health & Insurance", name: "Health", icon: Heart },
  { id: "Women & Children", name: "Women", icon: Users },
  { id: "Education & Youth", name: "Education", icon: GraduationCap },
  { id: "Employment", name: "Employment", icon: Briefcase },
  { id: "Rural Development", name: "Rural Dev", icon: Building2 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const APPLY_LINK_SPECIAL: Record<string, string> = {
  "Automatically via PDS":
    "This scheme is automatically available through the Public Distribution System. No separate application required.",
  "At post offices and banks":
    "Please visit your nearest post office or bank to apply for this scheme.",
};

function handleApplyNow(applyLink: string) {
  const message = APPLY_LINK_SPECIAL[applyLink];
  if (message) {
    alert(message);
  } else if (applyLink) {
    window.open(applyLink, "_blank", "noopener,noreferrer");
  }
}

const TYPE_STYLES: Record<string, string> = {
  Central: "bg-blue-50 text-blue-700 border-blue-200",
  Maharashtra: "bg-orange-50 text-orange-700 border-orange-200",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function EligibilityModal({
  scheme,
  onClose,
  t,
}: {
  scheme: Scheme;
  onClose: () => void;
  t: (key: string) => string;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={`${t("eligibility")} - ${scheme.name}`}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 flex items-start justify-between gap-3 flex-shrink-0">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {scheme.name}
            </h2>
            <Badge className={`mt-1.5 text-[11px] border ${TYPE_STYLES[scheme.type]}`}>
              {scheme.type} Scheme
            </Badge>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            aria-label={t("closeModal")}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-2.5 uppercase tracking-wide">
              {t("eligibilityCriteria")}
            </h3>
            <ul className="space-y-2">
              {scheme.eligibilityCriteria.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 space-y-1.5">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-emerald-700">{t("benefits")}:</span>{" "}
              {scheme.benefits}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-emerald-700">{t("deadline")}:</span>{" "}
              {scheme.deadline}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-5 py-3.5 flex gap-2.5 flex-shrink-0">
          <Button
            variant="outline"
            className="flex-1 text-sm border-gray-200"
            onClick={onClose}
          >
            {t("closeModal")}
          </Button>
          <Button
            className="flex-1 text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => handleApplyNow(scheme.applyLink)}
          >
            {t("applyNow")}
            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function SchemeCard({
  scheme,
  onCheckEligibility,
  t,
}: {
  scheme: Scheme;
  onCheckEligibility: (s: Scheme) => void;
  t: (key: string) => string;
}) {
  return (
    <Card className="flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 bg-white">
      <CardHeader className="pb-3 pt-4 px-4 sm:px-5">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <Badge
            className={`text-[11px] border font-semibold ${TYPE_STYLES[scheme.type]}`}
          >
            {scheme.type}
          </Badge>
          <span className="text-xs text-gray-400 whitespace-nowrap">{scheme.category}</span>
        </div>
        <CardTitle className="text-sm sm:text-base font-bold leading-snug text-gray-800">
          {scheme.name}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
          {scheme.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3 px-4 sm:px-5 flex-1">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
            <IndianRupee className="h-3.5 w-3.5 flex-shrink-0" />
            {scheme.benefits}
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
            {t("deadline")}: {scheme.deadline}
          </div>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Users className="h-3.5 w-3.5 flex-shrink-0" />
            {scheme.eligibility}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 px-4 sm:px-5 pt-0 pb-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs sm:text-sm border-gray-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
          onClick={() => onCheckEligibility(scheme)}
        >
          <ChevronDown className="mr-1 h-3.5 w-3.5" />
          {t("eligibility")}
        </Button>
        <Button
          size="sm"
          className="flex-1 text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => handleApplyNow(scheme.applyLink)}
        >
          {t("applyNow")}
          <ExternalLink className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function GovSchemes() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const filteredSchemes =
    activeCategory === "All"
      ? schemes
      : schemes.filter((s) => s.category === activeCategory);

  const handleCheckEligibility = useCallback((scheme: Scheme) => {
    setSelectedScheme(scheme);
  }, []);

  const closeModal = useCallback(() => setSelectedScheme(null), []);

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium mb-4">
            <MapPin className="h-3.5 w-3.5" />
            {t("gidhadiVillageMaharashtra")}
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight tracking-tight">
            {t("governmentSchemesForYou")}
          </h1>
          <p className="text-sm sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("schemesHeroSubtitle")}
          </p>
          <div className="flex flex-col xs:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold text-sm sm:text-base h-10 sm:h-12 px-6"
              onClick={() => setActiveCategory("All")}
            >
              {t("browseAllSchemes")} ({schemes.length})
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/60 text-white hover:bg-white/15 bg-transparent font-semibold text-sm sm:text-base h-10 sm:h-12 px-6"
              onClick={() => handleCheckEligibility(schemes[0])}
            >
              {t("checkEligibility")}
            </Button>
          </div>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { label: t("totalSchemes"), value: schemes.length },
            { label: "Central", value: schemes.filter((s) => s.type === "Central").length },
            { label: "Maharashtra", value: schemes.filter((s) => s.type === "Maharashtra").length },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="text-center bg-white rounded-xl border border-gray-100 shadow-sm py-3 sm:py-4 px-2"
            >
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-600">{value}</p>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide mt-0.5">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="w-full grid grid-cols-4 sm:grid-cols-7 mb-6 sm:mb-8 bg-white border border-gray-100 shadow-sm rounded-xl p-1 h-auto gap-1">
            {categories.map(({ id, name, icon: Icon }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="flex flex-col items-center gap-1 py-2 sm:py-2.5 px-1 rounded-lg text-gray-500 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all text-[10px] sm:text-xs font-medium"
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="hidden sm:block leading-tight">{name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            {filteredSchemes.length > 0 ? (
              <>
                <p className="text-xs sm:text-sm text-gray-400 mb-4">
                  Showing {filteredSchemes.length} scheme
                  {filteredSchemes.length !== 1 ? "s" : ""}
                  {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredSchemes.map((scheme) => (
                    <SchemeCard
                      key={scheme.id}
                      scheme={scheme}
                      onCheckEligibility={handleCheckEligibility}
                      t={t}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <FileText className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 text-base font-medium">
                  {t("noSchemesFound")}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* ── Eligibility Modal ─────────────────────────────────────────────── */}
      {selectedScheme && (
        <EligibilityModal scheme={selectedScheme} onClose={closeModal} t={t} />
      )}
    </div>
  );
}
