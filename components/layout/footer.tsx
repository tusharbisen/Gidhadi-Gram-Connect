"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  ArrowUpRight,
  Leaf,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { href: "/about", key: "about" },
  { href: "/schemes", key: "schemes" },
  { href: "/brave-soldiers", key: "braveSoldiers" },
  { href: "/grievance", key: "grievance" },
  { href: "/documents", key: "documents" },
] as const;

const IMPORTANT_LINKS = [
  { href: "https://rural.nic.in", key: "ministryRuralDevelopment" },
  { href: "https://panchayat.gov.in", key: "ministryPanchayatiRaj" },
  { href: "https://india.gov.in", key: "nationalPortal" },
] as const;

const CONTACT_ITEMS = [
  { icon: MapPin, value: "gramPanchayatAddress", isTranslation: true },
  { icon: Phone, value: "+91 9168383674", isTranslation: false },
  { icon: Mail, value: "gidhadigramconnect@gmail.com", isTranslation: false },
] as const;

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

const Footer = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* ── Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .footer-heading { font-family: 'Playfair Display', Georgia, serif; }
        .footer-body    { font-family: 'DM Sans', sans-serif; }

        /* Animated underline on quick-links */
        .footer-link-hover {
          background-image: linear-gradient(90deg, #6ee7b7, #2dd4bf);
          background-repeat: no-repeat;
          background-position: left bottom;
          background-size: 0% 1px;
          transition: background-size 0.3s ease, color 0.2s ease;
        }
        .footer-link-hover:hover {
          background-size: 100% 1px;
          color: #a7f3d0;
        }

        /* Social icon lift + gradient fill */
        .social-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .social-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #059669, #0d9488);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .social-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(16,185,129,0.35);
        }
        .social-btn:hover::before { opacity: 1; }
        .social-btn svg            { position: relative; z-index: 1; }

        /* Subtle dot-grid texture */
        .footer-dots {
          background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 22px 22px;
        }
      `}</style>

      <footer className="footer-body relative bg-gradient-to-br from-gray-900 via-primary to-gray-900 overflow-hidden">
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 footer-dots pointer-events-none"
          aria-hidden="true"
        />

        {/* Ambient glow orbs */}
        <div
          className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-1/4 w-56 h-56 bg-teal-500/10  rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-primary via-teal-300 to-primary" />

        {/* ── Main content ─────────────────────────────────────────────── */}
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-6">
          {/* ── Four-column grid ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10 sm:mb-12">
            {/* ── Brand ── */}
            <div className="sm:col-span-2 lg:col-span-1">
              {/* Logo + name */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/40 flex-shrink-0">
                  <Leaf className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <h2 className="footer-heading text-xl text-white leading-tight">
                  Gidhadi
                  <span
                    className="block text-xs font-normal text-primary tracking-widest uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Gram Connect
                  </span>
                </h2>
              </div>

              {/* Tagline */}
              <p className="text-sm text-white leading-relaxed mb-5 max-w-xs">
                {t("footerDescription")}
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="social-btn w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* ── Quick Links ── */}
            <nav aria-label={t("quickLinks")}>
              <h3 className="footer-heading text-base text-white mb-4 sm:mb-5 flex items-center gap-2">
                {t("quickLinks")}
                <span
                  className="flex-1 h-px bg-gradient-to-r from-primary/60 to-transparent"
                  aria-hidden="true"
                />
              </h3>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map(({ href, key }) => (
                  <li key={key}>
                    <Link
                      href={href}
                      className="footer-link-hover text-sm text-white hover:text-primary/40 flex items-center gap-2 group transition-colors"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-white transition-colors flex-shrink-0"
                        aria-hidden="true"
                      />
                      {t(key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Important Links ── */}
            <nav aria-label={t("importantLinks")}>
              <h3 className="footer-heading text-base text-white mb-4 sm:mb-5 flex items-center gap-2">
                {t("importantLinks")}
                <span
                  className="flex-1 h-px bg-gradient-to-r from-primary/60 to-transparent"
                  aria-hidden="true"
                />
              </h3>
              <ul className="space-y-2.5">
                {IMPORTANT_LINKS.map(({ href, key }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white  group-hover:text-green-400  flex items-center gap-1.5 group transition-colors"
                    >
                      <ArrowUpRight
                        className="h-3.5 w-3.5 text-white group-hover:text-green-400 transition-colors flex-shrink-0"
                        aria-hidden="true"
                      />
                      {t(key)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Contact ── */}
            <address className="not-italic">
              <h3 className="footer-heading text-base text-white mb-4 sm:mb-5 flex items-center gap-2">
                {t("contactUs")}
                <span
                  className="flex-1 h-px bg-gradient-to-r from-primary/60 to-transparent"
                  aria-hidden="true"
                />
              </h3>
              <ul className="space-y-3">
                {CONTACT_ITEMS.map(({ icon: Icon, value, isTranslation }) => (
                  <li key={value} className="flex items-start gap-3 group">
                    <div className="w-7 h-7 rounded-lg bg-primary/60 border border-primary/60 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-primary transition-colors">
                      <Icon
                        size={13}
                        className="text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-sm text-white leading-snug group-hover:text-green-400 transition-colors break-all sm:break-normal">
                      {isTranslation ? t(value) : value}
                    </span>
                  </li>
                ))}
              </ul>
            </address>
          </div>

          {/* ── Divider ───────────────────────────────────────────────── */}
          <div
            className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-5 sm:mb-6"
            aria-hidden="true"
          />

          {/* ── Bottom bar ────────────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <p className="text-xs text-white text-center sm:text-left">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-white font-medium">
                {t("GidhadiGramConnect")}   
              </span>
              . {t("allRightsReserved")}
            </p>
            <p className="text-xs text-white flex items-center gap-1 flex-wrap justify-center sm:justify-end">
              {t("Built With Team")}
              <span className="text-primary mx-0.5" aria-hidden="true">
                ♥
              </span>
              {t("GidhadiGramConnect")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
