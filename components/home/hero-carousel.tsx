"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

const carouselSlides = [
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698582/5_suenga.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698587/7_cxaf4l.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698585/6_povksq.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698590/19_m3oigc.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698591/21_qyqu4e.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698591/20_mr6lso.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698593/24_ocdul9.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698595/25_jg64wd.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698594/22_vezvrt.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698595/23_lumt3p.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698594/26_iodef3.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698581/10_gabdwn.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698582/11_xdpwj1.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698585/12_rej1ib.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698585/13_b9klll.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698586/14_af5zsm.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698586/15_tgq3fi.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698582/2_jbqcsz.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698580/3_tdhtxe.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698582/4_vfewzi.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698599/33_bjusis.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698599/31_h2npr3.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698600/30_n6rhba.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698601/32_mf7syu.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698579/1_urbeuz.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698579/8_yqnete.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698580/9_nsjexw.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698596/27_itvtcm.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698596/28_zqwrgz.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698588/16_oxqdgx.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698589/18_uda9cn.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698590/17_baddps.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698597/29_jb2ehw.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698600/34_gtt5tg.png"] },
  { images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750698602/35_oknzox.png"] },
];

// Helper function to optimize Cloudinary URLs - FIXED VERSION
const optimizeImageUrl = (url: string, width: number = 1920, quality: string = "auto"): string => {
  // Check if it's a Cloudinary URL
  if (!url.includes('cloudinary.com')) {
    return url;
  }
  
  // Add Cloudinary transformations for optimization
  const transformedUrl = url.replace(
    '/upload/',
    `/upload/f_auto,q_${quality},w_${width},c_limit/`
  );
  
  return transformedUrl;
};

const HeroCarousel = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentSlideData = carouselSlides[currentSlide];
  
  // Calculate which slides to render (current, previous, next)
  const slidesToRender = useMemo(() => {
    const prev = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    const next = (currentSlide + 1) % carouselSlides.length;
    return [prev, currentSlide, next];
  }, [currentSlide]);

  // Single unified effect for auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      setCurrentImageIndex(0);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Separate effect for image cycling within a slide
  useEffect(() => {
    if (currentSlideData.images.length <= 1) return;
    
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentSlideData.images.length);
    }, 3000);
    
    return () => clearInterval(imageInterval);
  }, [currentSlide, currentSlideData.images.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    setCurrentImageIndex(0);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
    setCurrentImageIndex(0);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  return (
    <div className="relative mb-8 md:mb-12 overflow-hidden rounded-lg shadow-xl border-2">
      {/* Only render current, previous, and next slides */}
      {carouselSlides.map((slide, slideIndex) => {
        // Skip rendering slides that aren't nearby
        if (!slidesToRender.includes(slideIndex)) return null;
        
        return (
          <div
            key={slideIndex}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              slideIndex === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {slide.images.map((image, imageIndex) => (
              <div
                key={imageIndex}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  slideIndex === currentSlide && imageIndex === currentImageIndex
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                <Image
                  src={optimizeImageUrl(image)}
                  alt={`Slide ${slideIndex + 1}`}
                  fill
                  className="object-contain"
                  priority={slideIndex === 0 && imageIndex === 0}
                  loading={slideIndex === 0 && imageIndex === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  quality={85}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        );
      })}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-blue-400 text-white border-white/20 h-8 w-8 md:h-10 md:w-10"
        onClick={prevSlide}
        aria-label={t("previousSlide")}
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-blue-400 text-white border-white/20 h-8 w-8 md:h-10 md:w-10"
        onClick={nextSlide}
        aria-label={t("nextSlide")}
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
      </Button>

      {/* Slide indicators */}
      {currentSlideData.images.length > 1 && (
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex space-x-1">
          {currentSlideData.images.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-white transition-all duration-100"
          style={{
            width: isAutoPlaying
              ? `${((currentSlide + 1) / carouselSlides.length) * 100}%`
              : "0%",
          }}
        />
      </div>

      <div className="w-full aspect-[16/9]" />
    </div>
  );
};

export default HeroCarousel;
