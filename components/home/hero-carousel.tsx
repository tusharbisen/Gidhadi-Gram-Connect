"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const carouselSlides = [
  {
    id: 1,
    images: ["/Croser/gavtara.jpg"],
  },
  {
    id: 2,
    images: ["/Croser/gavview.jpg"],
  },
  {
    id: 3,
    images: ["/Croser/matamandir"],
  },
  {
    id: 4,
    images: ["/Croser/rammandir.jpg"],
  },
  {
    id: 5,
    images: ["/Croser/grampanchayat.jpg"],
  },
  {
    id: 6,
    images: ["/Croser/grampanchayat2.jpg"],
  },
  {
    id: 7,
    images: ["/Croser/hanuman.jpg"],
  },
  {
    id: 8,
    images: ["/Croser/mandir4.jpg"],
  },
  {
    id: 9,
    images: ["/Croser/phc.jpg"],
  },
  {
    id: 10,
    images: ["/Croser/phc2.jpg"],
  },
   {
    id: 11,
    images: ["/Croser/phule.jpg"],
  },
   {
    id: 12,
    images: ["/Croser/ravidas.jpg"],
  },
   {
    id: 13,
    images: ["/Croser/school1.jpg"],
  },
   {
    id: 14,
    images: ["/Croser/school2.jpg"],
  },
   {
    id: 15,
    images: ["/Croser/school3.jpg"],
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
      }, 6000); // Change slide every 6 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying]);

  // Image cycling effect
  useEffect(() => {
    const slideData = carouselSlides[currentSlide];
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideData.images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(imageInterval);
  }, [currentSlide]);

  // Reset image index when slide changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentSlide]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative mb-8 md:mb-12 overflow-hidden rounded-lg shadow-xl">
      {/* Background Images with cycling */}
      {carouselSlides.map((slide, slideIndex) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            slideIndex === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {slide.images.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                slideIndex === currentSlide && imageIndex === currentImageIndex
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Slide ${slideIndex + 1} - Image ${imageIndex + 1}`}
                fill
                className="object-cover"
                priority={slideIndex === 0 && imageIndex === 0}
              />
            </div>
          ))}
          {/* Optional subtle overlay for better contrast with controls */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white border-white/20 h-8 w-8 md:h-10 md:w-10"
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
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white border-white/20 h-8 w-8 md:h-10 md:w-10"
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Image Indicators for current slide */}
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

      {/* Slide Indicators */}
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

      {/* Auto-play Progress Bar */}
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

      {/* Auto-play Status Indicator */}
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

      {/* Mobile-responsive height container */}
      <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]" />
    </div>
  );
};

export default HeroCarousel;
