"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";

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
  emoji: string;
  shortTitle: string;
  cards: ResourceCard[];
};

const CATEGORIES: ResourceCategory[] = [
  {
    id: "primary",
    emoji: "🎨",
    shortTitle: "Primary",
    title: "CATEGORY 1: KG to Class 5 — Primary",
    cards: [
      {
        channel: "Magnet Brains",
        description:
          "Hindi & English. Covers KG to Class 12. Free playlists by subject & class.",
        link: "https://www.youtube.com/@MagnetBrainsEducation",
        badgeLevel: "KG – Class 5",
        badgeColorClass: "bg-blue-100 text-blue-800 border-blue-200",
      },
      {
        channel: "Peekaboo Kidz",
        description:
          "Fun animated videos for young kids. Science, GK, stories in Hindi & English.",
        link: "https://www.youtube.com/@Peekaboo_Kidz",
        badgeLevel: "KG – Class 5",
        badgeColorClass: "bg-blue-100 text-blue-800 border-blue-200",
      },
      {
        channel: "Bodhaguru",
        description:
          "Animated lessons for primary kids. Math, Science, English in simple Hindi.",
        link: "https://www.youtube.com/@Bodhaguru",
        badgeLevel: "KG – Class 5",
        badgeColorClass: "bg-blue-100 text-blue-800 border-blue-200",
      },
      {
        channel: "Alina Rais Live",
        description:
          "Best for spoken English and grammar. Highly engaging lessons for beginners.",
        link: "https://www.youtube.com/@AleenaRaisLive",
        badgeLevel: "Spoken English",
        badgeColorClass: "bg-blue-100 text-blue-800 border-blue-200",
      },
    ],
  },
  {
    id: "secondary",
    emoji: "📚",
    shortTitle: "Secondary",
    title: "CATEGORY 2: Class 6 to 10 — Secondary",
    cards: [
      {
        channel: "Dear Sir",
        description:
          "English, Math, Reasoning. 20M+ subscribers. Fun & interactive lessons.",
        link: "https://www.youtube.com/@DearSir",
        badgeLevel: "Class 6 – 10",
        badgeColorClass: "bg-green-100 text-green-800 border-green-200",
      },
      {
        channel: "Edumantra",
        description:
          "Best for Class 10. Hindi, English, Math, Science, Social Science.",
        link: "https://www.youtube.com/@EduMantra007",
        badgeLevel: "Class 6 – 10",
        badgeColorClass: "bg-green-100 text-green-800 border-green-200",
      },
      {
        channel: "Magnet Brains",
        description:
          "Class 6–10 full syllabus coverage. CBSE & State board both covered.",
        link: "https://www.youtube.com/@MagnetBrainsEducation",
        badgeLevel: "Class 6 – 10",
        badgeColorClass: "bg-green-100 text-green-800 border-green-200",
      },
    ],
  },
  {
    id: "higher-secondary",
    emoji: "🔬",
    shortTitle: "Higher Sec",
    title: "CATEGORY 3: Class 11 & 12 — Higher Secondary",
    cards: [
      {
        channel: "Physics Wallah",
        description:
          "Best for NEET & JEE. Physics, Chemistry, Math & Biology. 13M+ subs.",
        link: "https://www.youtube.com/@PhysicsWallah",
        badgeLevel: "Science – 11 & 12",
        badgeColorClass: "bg-amber-100 text-amber-800 border-amber-200",
      },
      {
        channel: "Unacademy",
        description:
          "JEE, NEET & board prep. Expert teachers. Live classes & recorded lectures.",
        link: "https://www.youtube.com/@unacademy",
        badgeLevel: "Science – 11 & 12",
        badgeColorClass: "bg-amber-100 text-amber-800 border-amber-200",
      },
      {
        channel: "Commerce Wallah (PW)",
        description:
          "Accounts, Economics, Business Studies. By Physics Wallah for commerce students.",
        link: "https://www.youtube.com/@commercewallahpw",
        badgeLevel: "Commerce – 11 & 12",
        badgeColorClass: "bg-teal-100 text-teal-800 border-teal-200",
      },
      {
        channel: "Drishti IAS (Hindi)",
        description:
          "History, Geography, Polity. Great for Arts students & UPSC foundation.",
        link: "https://www.youtube.com/@DrishtiIASvideos",
        badgeLevel: "Arts – 11 & 12",
        badgeColorClass: "bg-purple-100 text-purple-800 border-purple-200",
      },
    ],
  },
  {
    id: "degree",
    emoji: "🏆",
    shortTitle: "Degree",
    title: "CATEGORY 4: Degree & Competitive Exams",
    cards: [
      {
        channel: "StudyIQ IAS",
        description:
          "19M+ subscribers. Daily current affairs, UPSC, State PCS. Hindi & English.",
        link: "https://www.youtube.com/@StudyIQEducationLtd",
        badgeLevel: "Competitive Exams",
        badgeColorClass: "bg-rose-100 text-rose-800 border-rose-200",
      },
      {
        channel: "NPTEL (IIT)",
        description:
          "Free degree-level lectures by IIT & IISc professors. Engineering & Science.",
        link: "https://www.youtube.com/@iit",
        badgeLevel: "Degree / Engineering",
        badgeColorClass: "bg-rose-100 text-rose-800 border-rose-200",
      },
      {
        channel: "Khan GS Research Centre",
        description:
          "Khan Sir's famous channel. GK, Current Affairs, SSC, Railway prep in Hindi.",
        link: "https://www.youtube.com/@khangsresearchcentre1685",
        badgeLevel: "Competitive Exams",
        badgeColorClass: "bg-rose-100 text-rose-800 border-rose-200",
      },
      {
        channel: "Think School",
        description:
          "Business, startups & geopolitics explained simply. Great for commerce/MBA students.",
        link: "https://www.youtube.com/@ThinkSchool",
        badgeLevel: "Degree / Business",
        badgeColorClass: "bg-rose-100 text-rose-800 border-rose-200",
      },
    ],
  },
  {
    id: "coding",
    emoji: "💻",
    shortTitle: "Coding",
    title: "CATEGORY 5: Programming & Tech",
    cards: [
      {
        channel: "Apna College",
        description:
          "Excellent for beginners. C++, Java, Web Development and college placement advice.",
        link: "https://www.youtube.com/@ApnaCollegeOfficial",
        badgeLevel: "Coding / Placement",
        badgeColorClass: "bg-indigo-100 text-indigo-800 border-indigo-200",
      },
      {
        channel: "Take U forward",
        description:
          "Best for Data Structures & Algorithms (DSA), competitive programming, and interview prep by Striver.",
        link: "https://www.youtube.com/@takeUforward",
        badgeLevel: "DSA / Interviews",
        badgeColorClass: "bg-indigo-100 text-indigo-800 border-indigo-200",
      },
      {
        channel: "Chai aur Code",
        description:
          "High-quality coding tutorials in Hindi. Master JavaScript, React, Backend & more with Hitesh.",
        link: "https://www.youtube.com/@chaiaurcode",
        badgeLevel: "Web Dev / Tech",
        badgeColorClass: "bg-indigo-100 text-indigo-800 border-indigo-200",
      },
    ],
  },
  {
    id: "podcasts",
    emoji: "🎙️",
    shortTitle: "Podcasts",
    title: "CATEGORY 6: Podcasts & Personal Growth",
    cards: [
      {
        channel: "Raj Shamani",
        description:
          "Figuring Out Podcast: Business, start-ups, and life lessons from successful entrepreneurs in India.",
        link: "https://www.youtube.com/@rajshamani",
        badgeLevel: "Podcasts",
        badgeColorClass: "bg-orange-100 text-orange-800 border-orange-200",
      },
      {
        channel: "Prakhar ke Pravachan",
        description:
          "Deep conversations on psychology, philosophy, culture, and personal growth by Prakhar Gupta.",
        link: "https://www.youtube.com/@ThePrakharGuptaXperience",
        badgeLevel: "Podcasts",
        badgeColorClass: "bg-orange-100 text-orange-800 border-orange-200",
      },
      {
        channel: "Ranveer Allahbadia (TRS)",
        description:
          "India's smartest podcast. Deep conversations on spirituality, history, geopolitics, and self-improvement.",
        link: "https://www.youtube.com/@RanveerAllahbadia",
        badgeLevel: "Podcasts",
        badgeColorClass: "bg-orange-100 text-orange-800 border-orange-200",
      },
    ],
  },
];

// Category accent colors for left border & icon bg
const CATEGORY_ACCENTS: Record<string, string> = {
  primary: "border-blue-400",
  secondary: "border-green-400",
  "higher-secondary": "border-amber-400",
  degree: "border-rose-400",
  coding: "border-indigo-400",
  podcasts: "border-orange-400",
};

const CATEGORY_ICON_BG: Record<string, string> = {
  primary: "bg-blue-50 text-blue-600",
  secondary: "bg-green-50 text-green-700",
  "higher-secondary": "bg-amber-50 text-amber-700",
  degree: "bg-rose-50 text-rose-600",
  coding: "bg-indigo-50 text-indigo-700",
  podcasts: "bg-orange-50 text-orange-600",
};

// Scroll-reveal hook
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function CategorySection({
  category,
  index,
}: {
  category: ResourceCategory;
  index: number;
}) {
  const { ref, visible } = useReveal();
  const accentBorder = CATEGORY_ACCENTS[category.id] ?? "border-primary";
  const iconBg = CATEGORY_ICON_BG[category.id] ?? "bg-primary/10 text-primary";

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${index * 80}ms, transform 0.55s ease ${index * 80}ms`,
      }}
      className="space-y-5"
    >
      {/* Category header */}
      <div
        className={`flex items-center gap-3 border-l-4 ${accentBorder} pl-3`}
      >
        <span
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-lg ${iconBg}`}
        >
          {category.emoji}
        </span>
        <h2 className="text-base font-bold leading-tight text-gray-800 sm:text-lg">
          {category.title}
        </h2>
      </div>

      {/* Cards grid — 1 col mobile, 2 col sm, 3 col lg */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {category.cards.map((card, cardIndex) => (
          <ChannelCard
            key={cardIndex}
            card={card}
            delay={index * 80 + cardIndex * 60}
            visible={visible}
          />
        ))}
      </div>
    </div>
  );
}

function ChannelCard({
  card,
  delay,
  visible,
}: {
  card: ResourceCard;
  delay: number;
  visible: boolean;
}) {
  return (
    <a
      href={card.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-primary/10 bg-white shadow-sm
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-md active:scale-[0.98]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms, box-shadow 0.2s`,
      }}
    >
      <div className="flex flex-col gap-2 p-4">
        {/* Badge */}
        <div>
          <Badge
            className={`text-xs font-semibold px-2.5 py-0.5 border rounded-full ${card.badgeColorClass}`}
          >
            {card.badgeLevel}
          </Badge>
        </div>

        {/* Channel name */}
        <h3 className="text-base font-bold leading-snug text-gray-800 group-hover:text-primary transition-colors duration-200">
          {card.channel}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-500">
          {card.description}
        </p>
      </div>

      {/* CTA footer */}
      <div className="mt-auto border-t border-primary/8 px-4 py-3">
        <span
          className="flex items-center gap-1.5 text-sm font-semibold text-primary
                      group-hover:gap-2.5 transition-all duration-200"
        >
          Open on YouTube
          <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
        </span>
      </div>
    </a>
  );
}

export default function EducationResources() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.id === activeFilter);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/5 via-white to-primary/5">
      {/* ── Animated background blobs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Blob 1 */}
        <div
          className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl"
          style={{ animation: "blobDrift 12s ease-in-out infinite alternate" }}
        />
        {/* Blob 2 */}
        <div
          className="absolute top-1/3 -right-20 h-52 w-52 rounded-full bg-indigo-100/50 blur-3xl"
          style={{
            animation: "blobDrift 16s ease-in-out infinite alternate-reverse",
          }}
        />
        {/* Blob 3 */}
        <div
          className="absolute bottom-24 left-1/4 h-48 w-48 rounded-full bg-amber-100/50 blur-3xl"
          style={{ animation: "blobDrift 10s ease-in-out infinite alternate" }}
        />
        {/* Floating dots pattern */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="2"
                cy="2"
                r="1.5"
                fill="currentColor"
                className="text-primary"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <style>{`
        @keyframes blobDrift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(20px, 14px) scale(1.08); }
          100% { transform: translate(-10px, 20px) scale(0.95); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(var(--color-primary-rgb, 99,102,241), 0.18); }
          50%       { box-shadow: 0 0 0 8px rgba(var(--color-primary-rgb, 99,102,241), 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* ── Header ── */}
        <div
          className="mb-8 text-center sm:mb-12"
          style={{ animation: "fadeSlideDown 0.6s ease both" }}
        >
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-primary/60">
            Gidhadi Gram Connect
          </p>
          <h1 className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-gray-800 sm:text-3xl md:text-4xl">
            Educational Resources
          </h1>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
            Best free YouTube channels for every student — from KG to Degree
          </p>

          {/* Stats row */}
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            {[
              { label: "Channels", value: "20+" },
              { label: "Categories", value: "6" },
              { label: "100% Free", value: "✓" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl border border-primary/10 bg-white px-5 py-2.5 shadow-sm"
              >
                <span className="text-lg font-extrabold text-primary">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Horizontal filter pill bar (sticky on mobile) ── */}
        <div
          className="sticky top-0 z-20 -mx-4 mb-8 overflow-x-auto bg-white/80 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
        >
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
            {/* All button */}
            <button
              onClick={() => setActiveFilter("all")}
              className={`flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200
                ${
                  activeFilter === "all"
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary"
                }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setActiveFilter(cat.id === activeFilter ? "all" : cat.id)
                }
                className={`flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200
                  ${
                    activeFilter === cat.id
                      ? "border-primary bg-primary text-white shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:text-primary"
                  }`}
              >
                <span>{cat.emoji}</span>
                {cat.shortTitle}
              </button>
            ))}
          </div>
        </div>

        {/* ── Category sections ── */}
        <div className="space-y-10">
          {filtered.map((category, index) => (
            <CategorySection
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* ── Footer note ── */}
        <p className="mt-12 text-center text-xs text-gray-400">
          Curated by{" "}
          <span className="font-semibold text-gray-500">
            Gidhadi Gram Connect
          </span>{" "}
          · All channels are free on YouTube
        </p>
      </div>
    </div>
  );
}
