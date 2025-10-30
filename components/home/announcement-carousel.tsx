// "use client";

// import { useLanguage } from "@/components/providers/language-provider";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import {
//   AlertTriangle,
//   Calendar,
//   ChevronLeft,
//   ChevronRight,
//   X,
// } from "lucide-react";
// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";

// const announcements = [
//   {
//     id: 1,
//     title: {
//       en: "📢 Welcome to Gidhadi Gram Connect – Your Village, Now Online!",
//       hi: "📢 गिधाड़ी ग्राम कनेक्ट में आपका स्वागत है – अब गांव की जानकारी ऑनलाइन!",
//       mr: "📢 गिधाडी ग्राम कनेक्टमध्ये तुमचं स्वागत आहे – आता गावाची माहिती ऑनलाइन!",
//     },
//     date: "2023-06-20",
//     urgent: false,
//     content: {
//       en: "Welcome to Gidhadi Gram Connect – Your Village, Now Online!",
//       hi: "📢 गिधाड़ी ग्राम कनेक्ट में आपका स्वागत है – अब गांव की जानकारी ऑनलाइन!",
//       mr: "📢 गिधाडी ग्राम कनेक्टमध्ये तुमचं स्वागत आहे – आता गावाची माहिती ऑनलाइन!",
//     },
//   },
//   {
//     id: 2,
//     title: {
//       en: "🪖 Honoring Our Soldiers",
//       hi: "🪖 हमारे सैनिकों को सम्मान",
//       mr: "🪖 आपल्या सैनिकांचा सन्मान",
//     },
//     date: "2023-06-12",
//     urgent: false,
//     content: {
//       en: "Submit details of village members serving or retired from the Armed Forces. 📌 Please fill out the form available in the Brave Soldiers section.",
//       hi: "सशस्त्र बलों में सेवा देने वाले गांववासियों की जानकारी साझा करें। 📌 कृपया वीर सैनिक अनुभाग में उपलब्ध फॉर्म को भरें।",
//       mr: "सशस्त्र दलात सेवा केलेल्या गावकऱ्यांची माहिती शेअर करा. 📌 कृपया शूर सैनिक विभागातील फॉर्म भरा.",
//     },
//   },

//   {
//     id: 3,
//     title: {
//       en: "📣 Promote Your Business with Us!",
//       hi: "📣 अपने व्यवसाय का प्रचार करें!",
//       mr: "📣 आपला व्यवसाय प्रसिद्ध करा!",
//     },
//     date: "2025-06-30",
//     urgent: false,
//     content: {
//       en: "We now offer paid promotions for local businesses. 📌 Interested? Contact our team today.",
//       hi: "हम स्थानीय व्यवसायों के लिए पेड प्रमोशन की सुविधा दे रहे हैं। 📌 इच्छुक लोग हमारी टीम से संपर्क करें।",
//       mr: "आम्ही स्थानिक व्यवसायांसाठी पेड प्रमोशन उपलब्ध करून देत आहोत. 📌 इच्छुकांनी आमच्याशी संपर्क साधा.",
//     },
//   },

//   {
//     id: 4,
//     title: {
//       en: "🚀 Internship Opportunity – Join Gidhadi Gram Connect",
//       hi: "🚀 इंटर्नशिप का मौका – गिधाड़ी ग्राम कनेक्ट से जुड़ें",
//       mr: "🚀 इंटर्नशिप संधी – गिधाडी ग्राम कनेक्टमध्ये सामील व्हा",
//     },
//     date: "2025-06-30",
//     urgent: false,
//     content: {
//       en: "We're looking for interns to help build Gidhadi Gram Connect. 📌 Open to Tech students from B.E. or Diploma in IT/CS. Contact us to apply!",
//       hi: "हम गिधाड़ी ग्राम कनेक्ट के निर्माण में सहयोग के लिए इंटर्न्स ढूंढ रहे हैं। 📌 बीई/डिप्लोमा (आईटी/सीएस) टेक स्टूडेंट्स के लिए खुला है। संपर्क करें!",
//       mr: "गिधाडी ग्राम कनेक्ट तयार करण्यासाठी आम्हाला इंटर्न्सची गरज आहे. 📌 बी.ई. किंवा डिप्लोमा (आयटी/सीएस) विद्यार्थी अर्ज करू शकतात. संपर्क करा!",
//     },
//   },
//   {
//   id: 5,
//   title: {
//     en: "⚠️ Disclaimer – Unofficial Platform",
//     hi: "⚠️ अस्वीकरण – यह एक गैर-सरकारी प्लेटफ़ॉर्म है",
//     mr: "⚠️ अस्वीकरण – ही एक अनौपचारिक वेबसाइट आहे",
//   },
//   date: "2025-06-30",
//   urgent: false,
//   content: {
//     en: "This website is unofficial and created for public awareness. It only displays publicly available information from legal and open sources.",
//     hi: "यह वेबसाइट एक गैर-सरकारी प्रयास है और केवल जन जागरूकता के लिए बनाई गई है। इसमें केवल सार्वजनिक रूप से उपलब्ध कानूनी जानकारी ही प्रदर्शित की जाती है।",
//     mr: "ही वेबसाइट अनौपचारिक असून केवळ जनजागृतीसाठी तयार केली आहे. यामध्ये केवळ कायदेशीर आणि सार्वजनिक माहितीच दाखवली जाते.",
//   },
// }

// ];

// const AnnouncementCarousel = () => {
//   const { t, language } = useLanguage();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [selectedAnnouncement, setSelectedAnnouncement] = useState<
//     (typeof announcements)[0] | null
//   >(null);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
//   const marqueeRef = useRef<HTMLDivElement>(null);

//   // Auto-play functionality
//   useEffect(() => {
//     if (isAutoPlaying) {
//       autoPlayRef.current = setInterval(() => {
//         setCurrentIndex((prevIndex) =>
//           prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
//         );
//       }, 4000); // Change slide every 4 seconds
//     }

//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isAutoPlaying]);

//   // Scroll to current announcement
//   useEffect(() => {
//     if (scrollRef.current) {
//       const scrollAmount = currentIndex * 320; // Card width + gap
//       scrollRef.current.scrollTo({
//         left: scrollAmount,
//         behavior: "smooth",
//       });
//     }
//   }, [currentIndex]);

//   // Marquee animation for the current announcement
//   useEffect(() => {
//     if (marqueeRef.current && isAutoPlaying) {
//       const marqueeElement = marqueeRef.current;
//       marqueeElement.style.animation = "none";
//       // Trigger reflow
//       void marqueeElement.offsetWidth;
//       marqueeElement.style.animation = "marquee 15s linear infinite";
//     }
//   }, [currentIndex, isAutoPlaying]);

//   const handlePrevious = () => {
//     setIsAutoPlaying(false); // Stop auto-play when user interacts
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
//     );
//     // Resume auto-play after 10 seconds
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const handleNext = () => {
//     setIsAutoPlaying(false); // Stop auto-play when user interacts
//     setCurrentIndex((prevIndex) =>
//       prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
//     );
//     // Resume auto-play after 10 seconds
//     setTimeout(() => setIsAutoPlaying(true), 10000);
//   };

//   const handleMouseEnter = () => {
//     setIsAutoPlaying(false); // Pause on hover
//   };

//   const handleMouseLeave = () => {
//     setIsAutoPlaying(true); // Resume on mouse leave
//   };

//   const handleCardClick = (announcement: (typeof announcements)[0]) => {
//     setSelectedAnnouncement(announcement);
//     setIsAutoPlaying(false);
//   };

//   const closeModal = () => {
//     setSelectedAnnouncement(null);
//     setIsAutoPlaying(true);
//   };

//   return (
//     <div className="mb-8">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold text-gray-900 flex items-center">
//           <AlertTriangle className="mr-2 h-6 w-6 text-gov-orange" />
//           {t("latestAnnouncements")}
//         </h2>
//         <div className="flex items-center space-x-2">
//           {/* Auto-play indicator */}
//           <div
//             className={`w-2 h-2 rounded-full ${
//               isAutoPlaying ? "bg-green-500" : "bg-gray-400"
//             }`}
//             title={isAutoPlaying ? "Auto-playing" : "Paused"}
//           />

//           {/* Navigation arrows */}
//           <Button variant="outline" size="icon" onClick={handlePrevious}>
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <Button variant="outline" size="icon" onClick={handleNext}>
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {/* Marquee for current announcement */}
//       <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 mb-4 overflow-hidden">
//         <div
//           ref={marqueeRef}
//           className="whitespace-nowrap"
//           style={{
//             animation: isAutoPlaying ? "marquee 15s linear infinite" : "none",
//           }}
//         >
//           <div className="flex items-center">
//             <AlertTriangle className="mr-2 h-4 w-4 text-gov-orange" />
//             <span className="font-medium text-gov-blue">
//               {announcements[currentIndex].title[language]}:{" "}
//               {announcements[currentIndex].content[language]}
//             </span>
//             <span className="mx-8">•</span>
//             <AlertTriangle className="mr-2 h-4 w-4 text-gov-orange" />
//             <span className="font-medium text-gov-blue">
//               {announcements[currentIndex].title[language]}:{" "}
//               {announcements[currentIndex].content[language]}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Carousel Container */}
//       <div
//         className="relative"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div
//           ref={scrollRef}
//           className="flex space-x-4 overflow-x-auto mobile-carousel pb-4 scroll-smooth"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {announcements.map((announcement, index) => (
//             <Card
//               key={announcement.id}
//               className={`flex-shrink-0 w-80 md:w-96 transition-all duration-300 cursor-pointer ${
//                 announcement.urgent ? "urgent-alert" : ""
//               } ${
//                 index === currentIndex
//                   ? "ring-2 ring-gov-blue shadow-lg scale-105"
//                   : "hover:shadow-lg hover:scale-102 shadow-sky-600 border-sky-600 "
//               }`}
//               onClick={() => handleCardClick(announcement)}
//             >
//               <CardContent className="p-4">
//                 <div className="flex items-start justify-between mb-2">
//                   <Badge
//                     variant={announcement.urgent ? "destructive" : "secondary"}
//                     className="mb-2"
//                   >
//                     {announcement.urgent ? "URGENT" : "INFO"}
//                   </Badge>
//                   <div className="flex items-center text-sm text-gray-500">
//                     <Calendar className="mr-1 h-4 w-4" />
//                     {new Date(announcement.date).toLocaleDateString()}
//                   </div>
//                 </div>
//                 <h3 className="font-semibold text-lg mb-2 text-gray-900">
//                   {announcement.title[language]}
//                 </h3>
//                 <p className="text-gray-700 text-sm leading-relaxed">
//                   {announcement.content[language]}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Dots indicator */}
//         <div className="flex justify-center mt-4 space-x-2">
//           {announcements.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setCurrentIndex(index);
//                 setIsAutoPlaying(false);
//                 setTimeout(() => setIsAutoPlaying(true), 10000);
//               }}
//               className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                 index === currentIndex
//                   ? "bg-gov-blue w-6"
//                   : "bg-sky-400 hover:bg-sky-400"
//               }`}
//               aria-label={`Go to announcement ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Modal for clicked announcement */}
//       {selectedAnnouncement && (
//         <div
//           className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//           onClick={closeModal}
//         >
//           <div
//             className="bg-white rounded-lg max-w-lg w-full p-6 relative animate-fade-in"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-2 top-2"
//               onClick={closeModal}
//             >
//               <X className="h-4 w-4" />
//             </Button>

//             <Badge
//               variant={
//                 selectedAnnouncement.urgent ? "destructive" : "secondary"
//               }
//               className="mb-4"
//             >
//               {selectedAnnouncement.urgent ? "URGENT" : "INFO"}
//             </Badge>

//             <h2 className="text-xl font-bold mb-2">
//               {selectedAnnouncement.title[language]}
//             </h2>

//             <div className="flex items-center text-sm text-gray-500 mb-4">
//               <Calendar className="mr-1 h-4 w-4" />
//               {new Date(selectedAnnouncement.date).toLocaleDateString()}
//             </div>

//             <p className="text-gray-700">
//               {selectedAnnouncement.content[language]}
//             </p>

//             <div className="mt-6 flex justify-end">
//               <Button onClick={closeModal}>Close</Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add keyframe animation for marquee */}
//       <style jsx global>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(100%);
//           }
//           100% {
//             transform: translateX(-100%);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AnnouncementCarousel;



 "use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";

const announcements = [
  {
    id: 1,
    title: {
      en: "📢 Welcome to Gidhadi Gram Connect – Your Village, Now Online!",
      hi: "📢 गिधाड़ी ग्राम कनेक्ट में आपका स्वागत है – अब गांव की जानकारी ऑनलाइन!",
      mr: "📢 गिधाडी ग्राम कनेक्टमध्ये तुमचं स्वागत आहे – आता गावाची माहिती ऑनलाइन!",
    },
    date: "2023-06-20",
    urgent: false,
    content: {
      en: "Welcome to Gidhadi Gram Connect – Your Village, Now Online!",
      hi: "📢 गिधाड़ी ग्राम कनेक्ट में आपका स्वागत है – अब गांव की जानकारी ऑनलाइन!",
      mr: "📢 गिधाडी ग्राम कनेक्टमध्ये तुमचं स्वागत आहे – आता गावाची माहिती ऑनलाइन!",
    },
  },
  {
    id: 2,
    title: {
      en: "🪖 Honoring Our Soldiers",
      hi: "🪖 हमारे सैनिकों को सम्मान",
      mr: "🪖 आपल्या सैनिकांचा सन्मान",
    },
    date: "2023-06-12",
    urgent: false,
    content: {
      en: "Submit details of village members serving or retired from the Armed Forces. 📌 Please fill out the form available in the Brave Soldiers section.",
      hi: "सशस्त्र बलों में सेवा देने वाले गांववासियों की जानकारी साझा करें। 📌 कृपया वीर सैनिक अनुभाग में उपलब्ध फॉर्म को भरें।",
      mr: "सशस्त्र दलात सेवा केलेल्या गावकऱ्यांची माहिती शेअर करा. 📌 कृपया शूर सैनिक विभागातील फॉर्म भरा.",
    },
  },
  {
    id: 3,
    title: {
      en: "📣 Promote Your Business with Us!",
      hi: "📣 अपने व्यवसाय का प्रचार करें!",
      mr: "📣 आपला व्यवसाय प्रसिद्ध करा!",
    },
    date: "2025-06-30",
    urgent: false,
    content: {
      en: "We now offer paid promotions for local businesses. 📌 Interested? Contact our team today.",
      hi: "हम स्थानीय व्यवसायों के लिए पेड प्रमोशन की सुविधा दे रहे हैं। 📌 इच्छुक लोग हमारी टीम से संपर्क करें।",
      mr: "आम्ही स्थानिक व्यवसायांसाठी पेड प्रमोशन उपलब्ध करून देत आहोत. 📌 इच्छुकांनी आमच्याशी संपर्क साधा.",
    },
  },
  {
    id: 4,
    title: {
      en: "🚀 Internship Opportunity – Join Gidhadi Gram Connect",
      hi: "🚀 इंटर्नशिप का मौका – गिधाड़ी ग्राम कनेक्ट से जुड़ें",
      mr: "🚀 इंटर्नशिप संधी – गिधाडी ग्राम कनेक्टमध्ये सामील व्हा",
    },
    date: "2025-06-30",
    urgent: false,
    content: {
      en: "We're looking for interns to help build Gidhadi Gram Connect. 📌 Open to Tech students from B.E. or Diploma in IT/CS. Contact us to apply!",
      hi: "हम गिधाड़ी ग्राम कनेक्ट के निर्माण में सहयोग के लिए इंटर्न्स ढूंढ रहे हैं। 📌 बीई/डिप्लोमा (आईटी/सीएस) टेक स्टूडेंट्स के लिए खुला है। संपर्क करें!",
      mr: "गिधाडी ग्राम कनेक्ट तयार करण्यासाठी आम्हाला इंटर्न्सची गरज आहे. 📌 बी.ई. किंवा डिप्लोमा (आयटी/सीएस) विद्यार्थी अर्ज करू शकतात. संपर्क करा!",
    },
  },
  {
    id: 5,
    title: {
      en: "⚠️ Disclaimer – Unofficial Platform",
      hi: "⚠️ अस्वीकरण – यह एक गैर-सरकारी प्लेटफ़ॉर्म है",
      mr: "⚠️ अस्वीकरण – ही एक अनौपचारिक वेबसाइट आहे",
    },
    date: "2025-06-30",
    urgent: false,
    content: {
      en: "This website is unofficial and created for public awareness. It only displays publicly available information from legal and open sources.",
      hi: "यह वेबसाइट एक गैर-सरकारी प्रयास है और केवल जन जागरूकता के लिए बनाई गई है। इसमें केवल सार्वजनिक रूप से उपलब्ध कानूनी जानकारी ही प्रदर्शित की जाती है।",
      mr: "ही वेबसाइट अनौपचारिक असून केवळ जनजागृतीसाठी तयार केली आहे. यामध्ये केवळ कायदेशीर आणि सार्वजनिक माहिती दाखवली जाते.",
    },
  },
];

const AnnouncementCarousel = () => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<
    (typeof announcements)[0] | null
  >(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize current announcement to prevent unnecessary recalculations
  const currentAnnouncement = useMemo(
    () => announcements[currentIndex],
    [currentIndex]
  );

  // Cleanup function for timeouts
  const cleanupTimeout = useCallback(() => {
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
  }, []);

  // Auto-play functionality with cleanup
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return cleanupTimeout;
  }, [isAutoPlaying, currentIndex, cleanupTimeout]);

  // Scroll to current announcement
  useEffect(() => {
    if (scrollRef.current) {
      const scrollAmount = currentIndex * 320; // Card width + gap
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const handlePrevious = useCallback(() => {
    cleanupTimeout();
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
    );
    // Resume auto-play after 10 seconds
    autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [cleanupTimeout]);

  const handleNext = useCallback(() => {
    cleanupTimeout();
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
    );
    // Resume auto-play after 10 seconds
    autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [cleanupTimeout]);

  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  const handleCardClick = useCallback(
    (announcement: (typeof announcements)[0]) => {
      setSelectedAnnouncement(announcement);
      setIsAutoPlaying(false);
    },
    []
  );

  const closeModal = useCallback(() => {
    setSelectedAnnouncement(null);
    setIsAutoPlaying(true);
  }, []);

  const handleDotClick = useCallback(
    (index: number) => {
      cleanupTimeout();
      setCurrentIndex(index);
      setIsAutoPlaying(false);
      autoPlayTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 10000);
    },
    [cleanupTimeout]
  );

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <AlertTriangle className="mr-2 h-6 w-6 text-gov-orange" />
          {t("latestAnnouncements")}
        </h2>
        <div className="flex items-center space-x-2">
          {/* Auto-play indicator */}
          <div
            className={`w-2 h-2 rounded-full transition-colors ${
              isAutoPlaying ? "bg-green-500" : "bg-gray-400"
            }`}
            title={isAutoPlaying ? "Auto-playing" : "Paused"}
            aria-label={isAutoPlaying ? "Auto-playing" : "Paused"}
          />

          {/* Navigation arrows */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePrevious}
            aria-label="Previous announcement"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNext}
            aria-label="Next announcement"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Optimized Marquee for current announcement - CSS only */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 mb-4 overflow-hidden">
        <div
          className={`whitespace-nowrap ${isAutoPlaying ? 'animate-marquee' : ''}`}
        >
          <div className="inline-flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4 text-gov-orange flex-shrink-0" />
            <span className="font-medium text-gov-blue">
              {currentAnnouncement.title[language]}:{" "}
              {currentAnnouncement.content[language]}
            </span>
            <span className="mx-8">•</span>
            <AlertTriangle className="mr-2 h-4 w-4 text-gov-orange flex-shrink-0" />
            <span className="font-medium text-gov-blue">
              {currentAnnouncement.title[language]}:{" "}
              {currentAnnouncement.content[language]}
            </span>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto mobile-carousel pb-4 scroll-smooth hide-scrollbar"
        >
          {announcements.map((announcement, index) => (
            <Card
              key={announcement.id}
              className={`flex-shrink-0 w-80 md:w-96 transition-all duration-300 cursor-pointer ${
                announcement.urgent ? "urgent-alert" : ""
              } ${
                index === currentIndex
                  ? "ring-2 ring-gov-blue shadow-lg scale-105"
                  : "hover:shadow-lg hover:scale-102 shadow-sky-600 border-sky-600"
              }`}
              onClick={() => handleCardClick(announcement)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant={announcement.urgent ? "destructive" : "secondary"}
                    className="mb-2"
                  >
                    {announcement.urgent ? "URGENT" : "INFO"}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(announcement.date).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {announcement.title[language]}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                  {announcement.content[language]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gov-blue w-6"
                  : "bg-sky-400 hover:bg-sky-400"
              }`}
              aria-label={`Go to announcement ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal for clicked announcement */}
      {selectedAnnouncement && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full p-6 relative animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </Button>

            <Badge
              variant={
                selectedAnnouncement.urgent ? "destructive" : "secondary"
              }
              className="mb-4"
            >
              {selectedAnnouncement.urgent ? "URGENT" : "INFO"}
            </Badge>

            <h2 id="modal-title" className="text-xl font-bold mb-2">
              {selectedAnnouncement.title[language]}
            </h2>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="mr-1 h-4 w-4" />
              {new Date(selectedAnnouncement.date).toLocaleDateString()}
            </div>

            <p className="text-gray-700">
              {selectedAnnouncement.content[language]}
            </p>

            <div className="mt-6 flex justify-end">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Optimized CSS animations */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 15s linear infinite;
        }

        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementCarousel;