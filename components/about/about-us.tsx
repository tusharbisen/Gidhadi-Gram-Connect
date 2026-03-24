"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Globe,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";

type TeamMember = {
  name: string;
  designation: string;
  contact: string;
  image: string;
  role: Record<"en" | "hi" | "mr", string>;
  responsibility: Record<"en" | "hi" | "mr", string>;
  skills: string[];
};

const teamMembers: TeamMember[] = [
  {
    name: "Tejas Bisen",
    designation: "Software Engineer",
    contact: "+91 98343 39517",
    image: "/tejas.jpg",
    role: {
      en: "Project Coordinator & Full Stack Developer",
      hi: "प्रोजेक्ट कोऑर्डिनेटर और फुल स्टैक डेवलपर",
      mr: "प्रकल्प समन्वयक आणि फुल स्टॅक डेव्हलपर",
    },
    responsibility: {
      en: "Leading project coordination, backend development, and community liaison.",
      hi: "प्रोजेक्ट समन्वय, बैकएंड विकास और समुदाय समन्वय का नेतृत्व।",
      mr: "प्रकल्प समन्वय, बॅकएंड विकास आणि समुदाय समन्वय यांचे नेतृत्व.",
    },
    skills: ["Leadership", "Project Management", "React.js", "Java", "Spring Boot"],
  },
  {
    name: "Tushar Bisen",
    designation: "Frontend Developer",
    contact: "+91 91683 83674",
    image: "/tushar.jpg",
    role: {
      en: "Team Lead & Frontend Developer",
      hi: "टीम लीड और फ्रंटेंड डेवलपर",
      mr: "टीम लीड आणि फ्रंटेंड डेव्हलपर",
    },
    responsibility: {
      en: "Leading UI development and managing village news, events, and content updates.",
      hi: "यूआई विकास और गांव के समाचार, कार्यक्रम तथा सामग्री अपडेट का प्रबंधन।",
      mr: "यूआय विकास तसेच गावाच्या बातम्या, कार्यक्रम आणि सामग्री अद्यतनांचे व्यवस्थापन.",
    },
    skills: ["HTML", "CSS", "JavaScript", "Next.js", "Tailwind CSS"],
  },
  {
    name: "Pankaj Meshram",
    designation: "UI/UX Designer",
    contact: "+91 8805920106",
    image: "/pnk.jpg",
    role: {
      en: "Platform UI Designer",
      hi: "प्लेटफ़ॉर्म यूआई डिज़ाइनर",
      mr: "प्लॅटफॉर्म यूआय डिझायनर",
    },
    responsibility: {
      en: "Designing user-friendly interfaces and improving the platform experience.",
      hi: "उपयोगकर्ता-अनुकूल इंटरफेस बनाना और प्लेटफ़ॉर्म अनुभव बेहतर करना।",
      mr: "वापरकर्ता-अनुकूल इंटरफेस डिझाइन करणे आणि प्लॅटफॉर्म अनुभव सुधारणे.",
    },
    skills: ["UI/UX", "Figma", "Responsive Design", "User Research"],
  },
];

function SectionDivider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-emerald-200" />
      <Sparkles className="h-3 w-3 text-emerald-400" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-emerald-200" />
    </div>
  );
}

export default function AboutUs() {
  const { language, t } = useLanguage();

  const missionPoints = useMemo(
    () => [
      t("aboutMission1"),
      t("aboutMission2"),
      t("aboutMission3"),
      t("aboutMission4"),
      t("aboutMission5"),
    ],
    [t]
  );

  const stats = [
    { value: teamMembers.length, label: t("teamMembersLabel") },
    { value: "24/7", label: t("supportLabel") },
    { value: "100%", label: t("dedicatedLabel") },
    { value: "∞", label: t("communityLoveLabel") },
  ];

  const contactCards = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: t("visitUs"),
      lines: ["Village Gidhadi", "Maharashtra, India"],
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: t("callUs"),
      lines: ["+91 9168383674", t("monSatHours")],
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: t("emailUs"),
      lines: ["gidhadigramconnect@gmail.com", t("replyWithin24Hours")],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-10 text-center sm:mb-14">
          <div className="mb-5 flex justify-center sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-full bg-emerald-200 opacity-60 blur-xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-200 bg-white shadow-xl sm:h-24 sm:w-24 md:h-28 md:w-28">
                <Image
                  src="/logo.png"
                  alt="Gidhadi Gram Connect Logo"
                  width={220}
                  height={220}
                  className="h-4/5 w-4/5 object-contain"
                />
              </div>
            </div>
          </div>

          <h1 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-gray-800 sm:text-3xl md:text-4xl lg:text-5xl">
            {t("aboutHeroTitle")}
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
            {t("aboutHeroSubtitle")}
          </p>
        </div>

        <Card className="mb-6 overflow-hidden border border-emerald-100 shadow-lg sm:mb-8">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white sm:p-6">
            <CardTitle className="flex items-center gap-2.5 text-base sm:text-lg md:text-xl">
              <Globe className="h-5 w-5 flex-shrink-0" />
              {t("aboutWelcomeTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 bg-white p-4 sm:p-6">
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              {t("aboutIntro1")}
            </p>
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              {t("aboutIntro2")}
            </p>
          </CardContent>
        </Card>

        <div className="mb-8 grid grid-cols-1 gap-5 sm:mb-10 sm:gap-6 lg:grid-cols-2">
          <Card className="overflow-hidden border border-emerald-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-white sm:p-5">
              <CardTitle className="flex items-center gap-2.5 text-base sm:text-lg">
                <Target className="h-5 w-5 flex-shrink-0" />
                {t("aboutVisionTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-4 sm:p-6">
              <div className="border-l-4 border-emerald-400 pl-4">
                <p className="text-sm italic leading-relaxed text-gray-600 sm:text-base">
                  {t("aboutVisionText")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-teal-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white sm:p-5">
              <CardTitle className="flex items-center gap-2.5 text-base sm:text-lg">
                <Heart className="h-5 w-5 flex-shrink-0" />
                {t("aboutMissionTitle")}
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-4 sm:p-6">
              <ul className="space-y-3">
                {missionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-500" />
                    <span className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 overflow-hidden border border-emerald-100 shadow-lg sm:mb-8">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white sm:p-6">
            <CardTitle className="flex items-center gap-2.5 text-base sm:text-lg md:text-xl">
              <Users className="h-5 w-5 flex-shrink-0" />
              {t("aboutTeamTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white p-4 sm:p-6">
            <p className="mb-6 text-center text-xs leading-relaxed text-gray-500 sm:text-sm">
              {t("aboutTeamSubtitle")}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {teamMembers.map((member) => (
                <Card
                  key={member.contact}
                  className="group border border-emerald-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardContent className="p-4 sm:p-5 md:p-6">
                    <div className="space-y-4">
                      <div className="flex flex-col items-center gap-3 text-center">
                        <div className="relative">
                          <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-emerald-100 bg-emerald-50 shadow-md ring-2 ring-emerald-300 ring-offset-2 sm:h-24 sm:w-24">
                            <Image
                              src={member.image}
                              alt={`${member.name} profile picture`}
                              width={96}
                              height={96}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow">
                            <Star className="h-3 w-3 fill-white text-white" />
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="text-sm font-bold leading-snug text-gray-800 sm:text-base">
                            {member.name}
                          </h3>
                          <Badge className="border border-emerald-200 bg-emerald-50 text-[11px] font-medium text-emerald-700">
                            {member.designation}
                          </Badge>
                        </div>
                      </div>

                      <SectionDivider />

                      <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-center">
                        <p className="text-xs font-medium leading-snug text-emerald-700">
                          {member.role[language]}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 sm:text-xs">
                          <Target className="h-3 w-3 text-emerald-500" />
                          {t("responsibility")}
                        </span>
                        <p className="rounded-lg border border-gray-100 bg-gray-50 p-2.5 text-xs leading-relaxed text-gray-600 sm:text-sm">
                          {member.responsibility[language]}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 sm:text-xs">
                          <Star className="h-3 w-3 text-emerald-500" />
                          {t("skills")}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {member.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="border-emerald-200 bg-white text-[10px] text-emerald-700 sm:text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-emerald-100 pt-3">
                        <a
                          href={`tel:${member.contact.replace(/\s/g, "")}`}
                          className="flex items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 p-2.5 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100 sm:text-sm"
                        >
                          <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                          {member.contact}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 text-center shadow-sm"
                >
                  <div className="text-2xl font-extrabold tracking-tight text-emerald-600 sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-widest text-gray-500 sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 overflow-hidden border border-emerald-100 shadow-lg sm:mb-8">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white sm:p-6">
            <CardTitle className="flex items-center gap-2.5 text-base sm:text-lg md:text-xl">
              <Mail className="h-5 w-5 flex-shrink-0" />
              {t("getInTouch")}
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {contactCards.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3 rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 text-center shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-500 sm:text-sm">
                    {item.lines.map((line, index) => (
                      <span key={`${item.title}-${index}`}>
                        {line}
                        {index < item.lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 overflow-hidden border border-amber-200 shadow-lg sm:mb-8">
          <CardHeader className="bg-gradient-to-r from-amber-400 to-orange-400 p-4 text-white sm:p-6">
            <CardTitle className="flex items-center gap-2.5 text-base sm:text-lg md:text-xl">
              <Shield className="h-5 w-5 flex-shrink-0" />
              {t("importantDisclaimer")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 bg-amber-50 p-4 sm:p-6">
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm md:text-base">
              <strong>{t("pleaseNote")}</strong> {t("aboutDisclaimer1")}
            </p>
            <p className="text-xs leading-relaxed text-gray-700 sm:text-sm md:text-base">
              {t("aboutDisclaimer2")}
            </p>
          </CardContent>
        </Card>

        <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-center shadow-lg sm:p-8">
          <h3 className="mb-2 text-lg font-bold text-white sm:text-xl md:text-2xl">
            {t("togetherWeGrow")}
          </h3>
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-emerald-100 sm:text-sm md:text-base">
            {t("aboutFooterMessage")}
          </p>
        </div>
    </div>
  );
}
