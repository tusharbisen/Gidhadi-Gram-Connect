"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

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

const HeroCarousel = () => {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentSlideData = carouselSlides[currentSlide];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  useEffect(() => {
    const slideData = carouselSlides[currentSlide];
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideData.images.length);
    }, 3000);
    return () => clearInterval(imageInterval);
  }, [currentSlide]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentSlide]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    setTimeout(() => setIsAutoPlaying(true), 25000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  return (
    <div className="relative mb-8 md:mb-12 overflow-hidden rounded-lg shadow-xl border-2">
      {carouselSlides.map((slide, slideIndex) => (
        <div
          key={slideIndex}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            slideIndex === currentSlide ? "opacity-100" : "opacity-0"
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
                src={image || "/placeholder.svg"}
                alt=""
                fill
                className="object-contain"
                priority={slideIndex === 0 && imageIndex === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-blue-400 text-white border-white/20 h-8 w-8 md:h-10 md:w-10"
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-blue-400 text-white border-white/20 h-8 w-8 md:h-10 md:w-10"
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

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

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
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
