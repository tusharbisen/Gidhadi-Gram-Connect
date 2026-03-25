// app/education/page.tsx  (or pages/education.tsx)
// Replace your documents page with this file.
// No header/footer — your existing layout wraps it automatically.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education | Gidhadi Gram Connect",
  description:
    "Education section for Gidhadi Gram Connect – coming soon with school info, scholarships, and government schemes.",
};

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Page Hero ── */}
      <section className="bg-gradient-to-br from-[#1a6b3a] via-[#2a8c4e] to-[#3aaa64] text-white px-4 py-14 text-center relative overflow-hidden">
        {/* subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block bg-white/20 border border-white/30 text-white text-xs font-semibold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4">
            🎓 New Section
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-2">
            Education <span className="text-[#f58220]">Hub</span>
          </h1>
          <p className="text-white/75 text-base font-medium" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
            शिक्षण विभाग · गिधाडी ग्राम कनेक्ट
          </p>
        </div>
      </section>

      {/* ── Breadcrumb ── */}
      <div className="bg-green-50 border-b border-green-200 px-4 py-2.5 text-sm text-green-800">
        <a href="/" className="font-semibold text-[#1a6b3a] hover:underline">Home</a>
        <span className="mx-1.5 text-green-400">›</span>
        <span className="font-semibold">Education</span>
      </div>

      {/* ── Coming Soon Body ── */}
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">

        {/* Icon */}
        <div className="w-24 h-24 bg-green-50 border-2 border-[#2a8c4e] rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-11 h-11" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26 6L4 17l22 11 22-11L26 6z" fill="#2a8c4e" stroke="#1a6b3a" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M4 17v16M48 17v16" stroke="#1a6b3a" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 21.5V34a14 14 0 0028 0V21.5" stroke="#1a6b3a" strokeWidth="2" strokeLinecap="round" />
            <circle cx="4" cy="33" r="3" fill="#f58220" />
            <line x1="4" y1="17" x2="4" y2="33" stroke="#f58220" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Badge */}
        <span className="inline-block bg-orange-50 border border-orange-400 text-orange-500 text-xs font-bold tracking-[2px] uppercase px-5 py-1.5 rounded-full mb-6">
          🚧 Coming Soon
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a6b3a] mb-3 leading-snug">
          Our Team is <span className="text-[#f58220]">Working</span> on It!
        </h2>

        <p
          className="text-lg text-[#3a5544] mb-3"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          आमची टीम यावर काम करत आहे…
        </p>

        <p className="text-sm text-[#7a9a84] max-w-lg mx-auto mb-14 leading-relaxed">
          The Education section is under development. We are building a dedicated space for school
          information, scholarships, government education schemes, and learning resources for the
          students and families of Gidhadi village.
        </p>

        {/* ── Feature Preview Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14 text-left">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-green-200 rounded-2xl p-5 hover:border-[#2a8c4e] hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-3">
                {f.icon}
              </div>
              <h3 className="text-sm font-bold text-[#1a6b3a] mb-1">{f.title}</h3>
              <p className="text-xs text-[#7a9a84] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Team Working ── */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-left mb-10">
          {/* Avatars */}
          <div className="flex flex-shrink-0">
            {["GG", "IT", "CS", "BE"].map((initials, i) => (
              <div
                key={initials}
                className={`w-11 h-11 rounded-full border-[3px] border-white flex items-center justify-center text-white text-sm font-bold ${avatarColors[i]} ${i !== 0 ? "-ml-3" : ""}`}
              >
                {initials}
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1a6b3a] mb-1.5">
              Our Intern Team is Building This Page
            </h3>
            <p className="text-sm text-[#3a5544] leading-relaxed">
              Gidhadi Gram Connect interns from B.E. / Diploma in IT &amp; CS are actively
              developing this Education section. It will be live very soon with full information
              for the village community.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-[#2a8c4e]">
                Active Development in Progress
              </span>
            </div>
          </div>
        </div>

        {/* ── Contact nudge ── */}
        <p className="text-xs text-[#7a9a84]">
          For queries, contact us at{" "}
          <a href="mailto:gidhadigramconnect@gmail.com" className="text-[#1a6b3a] font-semibold hover:underline">
            gidhadigramconnect@gmail.com
          </a>{" "}
          or call{" "}
          <a href="tel:+919168383674" className="text-[#1a6b3a] font-semibold hover:underline">
            +91 9168383674
          </a>
        </p>
      </div>
    </main>
  );
}

/* ── Static data ── */

const features = [
  {
    title: "School Information",
    desc: "Details about local schools, teachers, and academic calendar.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2a8c4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    title: "Scholarships",
    desc: "Government & private scholarships available for village students.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2a8c4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M12 14v8M9 19h6" />
      </svg>
    ),
  },
  {
    title: "Govt. Schemes",
    desc: "Education schemes by state & central government for rural areas.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2a8c4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    title: "Learning Resources",
    desc: "Study materials, notes, and helpful links for all students.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#2a8c4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

const avatarColors = [
  "bg-[#2a8c4e]",
  "bg-[#f58220]",
  "bg-[#1a6b5a]",
  "bg-[#8a4b00]",
];