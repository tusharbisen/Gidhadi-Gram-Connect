"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section 
      className="relative mb-8 md:mb-12 overflow-hidden rounded-lg shadow-xl"
      aria-label="Hero section"
    >
      {/* Background Image with Next.js Image optimization */}
      <div className="absolute inset-0">
        <Image
          src="https://res.cloudinary.com/dy1w6zqom/image/upload/f_auto,q_auto,w_1920/v1750698579/hero-background.jpg"
          alt="Gidhadi village background"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gov-blue/90 to-gov-blue/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-12 md:px-12 md:py-20 text-white">
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="mb-4 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {t("welcomeToGidhadi")}
          </h1>
          <p className="mb-8 text-lg md:text-xl max-w-2xl leading-relaxed opacity-95">
            {t("welcomeMessage")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/grievance" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-white text-gov-blue hover:bg-gray-100 hover:scale-105 font-semibold px-8 py-3 text-base transition-all duration-300 shadow-lg"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                {t("submitGrievance")}
              </Button>
            </Link>
            <Link href="/schemes" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-white text-white hover:bg-white/20 hover:scale-105 font-semibold px-8 py-3 text-base transition-all duration-300"
              >
                <FileText className="mr-2 h-5 w-5" />
                {t("viewGovernmentSchemes")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Add animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default memo(HeroSection);