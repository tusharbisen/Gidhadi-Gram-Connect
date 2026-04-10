"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ResourceCard = {
  channel: string;
  description: string;
  link: string;
  badgeLevel: string;
  badgeColorClass: string;
};

type ResourceCategory = {
  id: string;
  title: string;
  cards: ResourceCard[];
};

const CATEGORIES: ResourceCategory[] = [
  {
    id: "primary",
    title: "CATEGORY 1: KG to Class 5 — Primary",
    cards: [
      {
        channel: "Magnet Brains",
        description: "Hindi & English. Covers KG to Class 12. Free playlists by subject & class.",
        link: "https://www.youtube.com/@MagnetBrainsEducation",
        badgeLevel: "KG – Class 5",
        badgeColorClass: "bg-blue-100 text-blue-800 border-blue-200",
      },
      {
        channel: "Peekaboo Kidz",
        description: "Fun animated videos for young kids. Science, GK, stories in Hindi & English.",
        link: "https://www.youtube.com/@Peekaboo_Kidz",
        badgeLevel: "KG – Class 5",
        badgeColorClass: "bg-blue-100 text-blue-800 border-blue-200",
      },
      {
        channel: "Bodhaguru",
        description: "Animated lessons for primary kids. Math, Science, English in simple Hindi.",
        link: "https://www.youtube.com/@Bodhaguru",
        badgeLevel: "KG – Class 5",
        badgeColorClass: "bg-blue-100 text-blue-800 border-blue-200",
      },
      {
        channel: "Alina Rais Live",
        description: "Best for spoken English and grammar. Highly engaging lessons for beginners.",
        link: "https://www.youtube.com/@AlinaRaisLive",
        badgeLevel: "Spoken English",
        badgeColorClass: "bg-blue-100 text-blue-800 border-blue-200",
      },
    ],
  },
  {
    id: "secondary",
    title: "CATEGORY 2: Class 6 to 10 — Secondary",
    cards: [
      {
        channel: "Dear Sir",
        description: "English, Math, Reasoning. 20M+ subscribers. Fun & interactive lessons.",
        link: "https://www.youtube.com/@DearSir",
        badgeLevel: "Class 6 – 10",
        badgeColorClass: "bg-green-100 text-green-800 border-green-200",
      },
      {
        channel: "Edumantra",
        description: "Best for Class 10. Hindi, English, Math, Science, Social Science.",
        link: "https://www.youtube.com/@EduMantra007",
        badgeLevel: "Class 6 – 10",
        badgeColorClass: "bg-green-100 text-green-800 border-green-200",
      },
      {
        channel: "Magnet Brains",
        description: "Class 6–10 full syllabus coverage. CBSE & State board both covered.",
        link: "https://www.youtube.com/@MagnetBrainsEducation",
        badgeLevel: "Class 6 – 10",
        badgeColorClass: "bg-green-100 text-green-800 border-green-200",
      },
    ],
  },
  {
    id: "higher-secondary",
    title: "CATEGORY 3: Class 11 & 12 — Higher Secondary",
    cards: [
      {
        channel: "Physics Wallah",
        description: "Best for NEET & JEE. Physics, Chemistry, Math & Biology. 13M+ subs.",
        link: "https://www.youtube.com/@PhysicsWallah",
        badgeLevel: "Science – 11 & 12",
        badgeColorClass: "bg-amber-100 text-amber-800 border-amber-200",
      },
      {
        channel: "Unacademy",
        description: "JEE, NEET & board prep. Expert teachers. Live classes & recorded lectures.",
        link: "https://www.youtube.com/@unacademy",
        badgeLevel: "Science – 11 & 12",
        badgeColorClass: "bg-amber-100 text-amber-800 border-amber-200",
      },
      {
        channel: "Commerce Wallah (PW)",
        description: "Accounts, Economics, Business Studies. By Physics Wallah for commerce students.",
        link: "https://www.youtube.com/@CommerceWallah",
        badgeLevel: "Commerce – 11 & 12",
        badgeColorClass: "bg-teal-100 text-teal-800 border-teal-200",
      },
      {
        channel: "Drishti IAS (Hindi)",
        description: "History, Geography, Polity. Great for Arts students & UPSC foundation.",
        link: "https://www.youtube.com/@DrishtiIASHindi",
        badgeLevel: "Arts – 11 & 12",
        badgeColorClass: "bg-purple-100 text-purple-800 border-purple-200",
      },
    ],
  },
  {
    id: "degree",
    title: "CATEGORY 4: Degree & Competitive Exams",
    cards: [
      {
        channel: "StudyIQ IAS",
        description: "19M+ subscribers. Daily current affairs, UPSC, State PCS. Hindi & English.",
        link: "https://www.youtube.com/@StudyIQ",
        badgeLevel: "Competitive Exams",
        badgeColorClass: "bg-rose-100 text-rose-800 border-rose-200",
      },
      {
        channel: "NPTEL (IIT)",
        description: "Free degree-level lectures by IIT & IISc professors. Engineering & Science.",
        link: "https://www.youtube.com/@iit",
        badgeLevel: "Degree / Engineering",
        badgeColorClass: "bg-rose-100 text-rose-800 border-rose-200",
      },
      {
        channel: "Khan GS Research Centre",
        description: "Khan Sir's famous channel. GK, Current Affairs, SSC, Railway prep in Hindi.",
        link: "https://www.youtube.com/@KhanGSResearchCentre",
        badgeLevel: "Competitive Exams",
        badgeColorClass: "bg-rose-100 text-rose-800 border-rose-200",
      },
      {
        channel: "Think School",
        description: "Business, startups & geopolitics explained simply. Great for commerce/MBA students.",
        link: "https://www.youtube.com/@ThinkSchool",
        badgeLevel: "Degree / Business",
        badgeColorClass: "bg-rose-100 text-rose-800 border-rose-200",
      },
    ],
  },
  {
    id: "coding",
    title: "CATEGORY 5: Programming & Tech",
    cards: [
      {
        channel: "Apna College",
        description: "Excellent for beginners. C++, Java, Web Development and college placement advice.",
        link: "https://www.youtube.com/@ApnaCollegeOfficial",
        badgeLevel: "Coding / Placement",
        badgeColorClass: "bg-indigo-100 text-indigo-800 border-indigo-200",
      },
      {
        channel: "Take U forward",
        description: "Best for Data Structures & Algorithms (DSA), competitive programming, and interview prep by Striver.",
        link: "https://www.youtube.com/@takeUforward",
        badgeLevel: "DSA / Interviews",
        badgeColorClass: "bg-indigo-100 text-indigo-800 border-indigo-200",
      },
      {
        channel: "Chai aur Code",
        description: "High-quality coding tutorials in Hindi. Master JavaScript, React, Backend & more with Hitesh.",
        link: "https://www.youtube.com/@chaiaurcode",
        badgeLevel: "Web Dev / Tech",
        badgeColorClass: "bg-indigo-100 text-indigo-800 border-indigo-200",
      },
    ],
  },
  {
    id: "podcasts",
    title: "CATEGORY 6: Podcasts & Personal Growth",
    cards: [
      {
        channel: "Raj Shamani",
        description: "Figuring Out Podcast: Business, start-ups, and life lessons from successful entrepreneurs in India.",
        link: "https://www.youtube.com/@rajshamani",
        badgeLevel: "Podcasts",
        badgeColorClass: "bg-orange-100 text-orange-800 border-orange-200",
      },
      {
        channel: "Prakhar ke Pravachan",
        description: "Deep conversations on psychology, philosophy, culture, and personal growth by Prakhar Gupta.",
        link: "https://www.youtube.com/@PrakharKePravachan",
        badgeLevel: "Podcasts",
        badgeColorClass: "bg-orange-100 text-orange-800 border-orange-200",
      },
      {
        channel: "Ranveer Allahbadia (TRS)",
        description: "India's smartest podcast. Deep conversations on spirituality, history, geopolitics, and self-improvement.",
        link: "https://www.youtube.com/@RanveerAllahbadia",
        badgeLevel: "Podcasts",
        badgeColorClass: "bg-orange-100 text-orange-800 border-orange-200",
      },
    ],
  },
];

export default function EducationResources() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl bg-gradient-to-br from-primary/5 via-white to-primary/5 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 min-h-screen">
      {/* Header Section */}
      <div className="mb-10 text-center sm:mb-14">
        <h1 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-gray-800 sm:text-3xl md:text-4xl lg:text-4xl">
          Educational Resources
        </h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
          Best free YouTube channels for every student — from KG to Degree
        </p>
      </div>

      {/* Categories container */}
      <div className="space-y-12">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b border-primary/10 pb-2 sm:text-2xl">
              {category.title}
            </h2>

            {/* CSS Grid Auto-fill */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.cards.map((card, index) => (
                <Card 
                  key={index}
                  className="flex flex-col h-full overflow-hidden border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader className="p-4 sm:p-5 flex-none pb-0">
                    <div className="mb-3 flex">
                      <Badge className={`text-xs font-semibold px-2.5 py-0.5 border ${card.badgeColorClass} hover:opacity-90`}>
                        {card.badgeLevel}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-800">
                      {card.channel}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-5 flex flex-col flex-1">
                    <p className="text-sm leading-relaxed text-gray-500 flex-grow mb-6">
                      {card.description}
                    </p>
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary/20 hover:text-primary"
                    >
                      Open on YouTube <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
