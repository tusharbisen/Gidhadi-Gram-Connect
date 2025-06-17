"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-sky-600 pt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-white lg font-semibold primary">
              {t("gramPanchayat")} {t("gidhadi")}
            </h3>
            <p className="mb-4 text-white sm ">
              {t("footerDescription")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-white hover:text-whiteprimary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white primary">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white hover:text-primary">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="text-white hover:text-primary">
                  {t("schemes")}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-white hover:text-primary">
                  {t("news")}
                </Link>
              </li>
              <li>
                <Link
                  href="/grievance"
                  className="text-white hover:text-white primary"
                >
                  {t("grievance")}
                </Link>
              </li>
              <li>
                <Link
                  href="/documents"
                  className="text-white hover:text-primary"
                >
                  {t("documents")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white primary">
              {t("importantLinks")}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://rural.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary"
                >
                  {t("ministryRuralDevelopment")}
                </a>
              </li>
              <li>
                <a
                  href="https://panchayat.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary"
                >
                  {t("ministryPanchayatiRaj")}
                </a>
              </li>
              <li>
                <a
                  href="https://india.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-whiteprimary"
                >
                  {t("nationalPortal")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 lg font-semibold text-white primary">
              {t("contactUs")}
            </h3>
            <ul className="space-y-2 text-white sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-white primary" />
                <span className="text-white ">{t("gramPanchayatAddress")}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-white primary" />
                <span className="text-white gray-600">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-white primary" />
                <span className="text-whitegray-600">
                  gidhadi.panchayat@example.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 py-6 text-white center">
          <p className=" sm text-white gray-600">
            &copy; {new Date().getFullYear()} {t("gramPanchayat")}{" "}
            {t("gidhadi")}. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
