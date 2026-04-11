"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-blue-900 text-white">
      {/* Top Border */}
      <div className="h-[2px] bg-gradient-to-r from-primary via-teal-400 to-primary" />

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-primary transition">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-12 h-12 object-contain brightness-110 transition-all duration-300 hover:scale-110 hover:brightness-125 hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                />
              </div>

              <h2 className="text-lg font-semibold text-gray-100">
                Gidhadi
                <span className="block text-xs text-primary uppercase tracking-widest">
                  Gram Connect
                </span>
              </h2>
            </div>

            <p className="text-sm text-white mb-4">
              {t("footerDescription")}
            </p>

          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/about", key: "about" },
                { href: "/schemes", key: "schemes" },
                { href: "/brave-soldiers", key: "braveSoldiers" },
                { href: "/grievance", key: "grievance" },
                { href: "/education", key: "education" },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-primary transition text-sm"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* IMPORTANT LINKS */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-4">
              {t("importantLinks")}
            </h3>
            <ul className="space-y-2">
              {[
                {
                  href: "https://rural.gov.in",
                  key: "ministryRuralDevelopment",
                },
                {
                  href: "https://panchayat.gov.in",
                  key: "ministryPanchayatiRaj",
                },
                { href: "https://india.gov.in", key: "nationalPortal" },
                { href: "https://egramswaraj.gov.in", key: "egramSwaraj" },
                { href: "https://rdd.maharashtra.gov.in", key: "maharashtraRDD" },
              ].map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    target="_blank"
                    className="flex items-center gap-2 text-white hover:text-primary transition text-sm"
                  >
                    <ArrowUpRight size={14} />
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-4">
              {t("contactUs")}
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-white mt-1" />
                <span className="text-white">
                  {t("Near Mata Mandir Gidhadi.")}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-white" />
                <span className="text-white">+91 9168383674</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-white" />
                <span className="text-white">
                  gidhadigramconnect@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">
              {t("GidhadiGramConnect")}
            </span>
          </p>

          <p className="flex items-center gap-1">
            {t("Built With Team")}
            <span className="text-white">♥</span>
            {t("GidhadiGramConnect")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
