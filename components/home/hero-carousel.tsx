"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const carouselSlides = [
  {
    id: 1,
    images: [
      "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348443/5_m374vi.png",
    ],
  },
  {
    id: 2,
    images: [
      "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348456/6_wshx3y.png",
    ],
  },
  {
    id: 3,
    images: [
      "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348434/7_q3bwtl.png",
    ],
  },
  {
    id: 4,
    images: [
      "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348525/24_r5sxia.png",
    ],
  },
  {
    id: 5,
    images: [
      "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348542/25_u6uob0.png",
    ],
  },
  {
    id: 6,
    images: [
      " https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348530/26_vwyjto.png",
    ],
  },
  {
    id: 7,
    images: [
      "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348505/19_d2gvsn.png",
    ],
  },
  {
    id: 8,
    images: [
      "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348519/21_stmgbg.png",
    ],
  },
  {
    id: 9,
    images: [
      "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348509/20_yqpsmj.png",
    ],
  },
  {
    id: 10,
    images: [
      "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348512/22_lhmmpw.png",
    ],
  },
  {
    id: 11,
    images: [
      "https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348518/23_xxi3pz.png",
    ],
  },
  {
    id: 12,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348442/2_x48kn6.png"],
  },
  {
    id: 13,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348431/3_t0avvj.png"],
  },
  {
    id: 14,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348432/4_v2gx3x.png"],
  },
  {
    id: 15,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348733/33_kbnvii.png"],
  },
  {
    id: 16,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348423/8_rkay1o.png"],
  },
  {
    id: 17,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348729/30_uvxonr.png"],
  },
  {
    id: 18,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348729/32_fqm8am.png"],
  },
   {
    id: 19,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348729/31_gkfx0s.png"],
  }, {
    id: 20,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348430/1_oeheaa.png"],
  }, {
    id: 21,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348457/9_ijcwrh.png"],
  }, {
    id: 22,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348463/10_apzyop.png"],
  }, {
    id: 23,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348460/11_o5o8zw.png"],
  }, {
    id: 24,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348462/12_lzqm4e.png"],
  }, {
    id: 25,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348479/14_o0bdvm.png"],
  }, {
    id: 26,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348481/13_hejnci.png"],
  }, {
    id: 27,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348490/15_iouxna.png"],
  }, {
    id: 28,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348480/17_wz9hjt.png"],
  }, {
    id: 29,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348507/18_lon1fk.png"],
  }, {
    id: 30,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348483/16_ulnsxo.png"],
  }, {
    id: 31,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348542/27_caex1u.png"],
  }, {
    id: 32,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348729/28_diusho.png"],
  }, {
    id: 33,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348534/29_y5ovmf.png"],
  }, {
    id: 34,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348735/34_jspgwz.png"],
  }, {
    id: 35,
    images: ["https://res.cloudinary.com/dy1w6zqom/image/upload/v1750348736/35_rhacsp.png"],
  },  
];

const HeroCarousel = () => {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentSlideData = carouselSlides[currentSlide];

  // Auto-play functionality
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

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  return (
    <div className="relative mb-8 md:mb-12 overflow-hidden rounded-lg shadow-xl border-2">
      {carouselSlides.map((slide, slideIndex) => (
        <div
          key={slide.id}
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
                alt={`Slide ${slideIndex + 1} - Image ${imageIndex + 1}`}
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

      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-1 md:space-x-2">
        {carouselSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-4 md:w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
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

      <div className="absolute top-2 md:top-4 right-2 md:right-4 z-20 flex items-center space-x-1 md:space-x-2 bg-black/30 rounded-full px-2 md:px-3 py-1">
        <div
          className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
            isAutoPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400"
          }`}
          title={isAutoPlaying ? "Auto-playing" : "Paused"}
        />
        <span className="text-white text-xs">
          {currentSlide + 1}/{carouselSlides.length}
        </span>
      </div>

      {/* ✅ Aspect Ratio Box (Maintains 16:9) */}
      <div className="w-full aspect-[16/9]" />
    </div>
  );
};

export default HeroCarousel;
