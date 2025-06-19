"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"

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
      en: "COVID-19 vaccination drive at GP office. All residents 18+ eligible. Bring Aadhaar card and previous vaccination certificate.",
      hi: "जीपी कार्यालय में कोविड-19 टीकाकरण। 18+ सभी निवासी पात्र। आधार कार्ड और पिछला टीकाकरण प्रमाणपत्र लाएं।",
      mr: "जीपी कार्यालयात कोविड-19 लसीकरण. 18+ सर्व रहिवासी पात्र. आधार कार्ड आणि मागील लसीकरण प्रमाणपत्र आणा.",
    },
  },
  {
    id: 2,
    title: {
      en: "Water Supply Interruption - URGENT",
      hi: "पानी की आपूर्ति में व्यवधान - तत्काल",
      mr: "पाणी पुरवठा खंडित - तातडीचे",
    },
    date: "2023-06-12",
    urgent: true,
    content: {
      en: "Water supply interrupted 10 AM - 2 PM for maintenance work. Alternative arrangements made at community well.",
      hi: "रखरखाव कार्य के लिए 10 बजे - 2 बजे पानी की आपूर्ति बंद। सामुदायिक कुएं पर वैकल्पिक व्यवस्था।",
      mr: "देखभालीसाठी 10 ते 2 पर्यंत पाणी पुरवठा बंद. सामुदायिक विहिरीवर पर्यायी व्यवस्था.",
    },
  },
  {
    id: 3,
    title: {
      en: "Gram Sabha Meeting",
      hi: "ग्राम सभा बैठक",
      mr: "ग्रामसभा बैठक",
    },
    date: "2023-06-25",
    urgent: false,
    content: {
      en: "Monthly Gram Sabha meeting at 11 AM in GP hall. Discussion on budget allocation and development projects.",
      hi: "जीपी हॉल में 11 बजे मासिक ग्राम सभा बैठक। बजट आवंटन और विकास परियोजनाओं पर चर्चा।",
      mr: "जीपी हॉलमध्ये 11 वाजता मासिक ग्रामसभा बैठक. अर्थसंकल्प वाटप आणि विकास प्रकल्पांवर चर्चा.",
    },
  },
  {
    id: 4,
    title: {
      en: "Road Construction Work",
      hi: "सड़क निर्माण कार्य",
      mr: "रस्ता बांधकाम कार्य",
    },
    date: "2023-07-01",
    urgent: false,
    content: {
      en: "New road construction work starting from Main Street to School. Traffic diversions in place for 15 days.",
      hi: "मुख्य सड़क से स्कूल तक नई सड़क निर्माण कार्य शुरू। 15 दिनों के लिए यातायात मार्ग परिवर्तन।",
      mr: "मुख्य रस्त्यापासून शाळेपर्यंत नवीन रस्ता बांधकाम कार्य सुरू. 15 दिवसांसाठी वाहतूक वळवणी.",
    },
  },
  {
    id: 5,
    title: {
      en: "Skill Development Program",
      hi: "कौशल विकास कार्यक्रम",
      mr: "कौशल्य विकास कार्यक्रम",
    },
    date: "2023-07-05",
    urgent: false,
    content: {
      en: "Free skill development program for women. Training in tailoring, computer basics, and entrepreneurship.",
      hi: "महिलाओं के लिए मुफ्त कौशल विकास कार्यक्रम। सिलाई, कंप्यूटर बेसिक्स और उद्यमिता में प्रशिक्षण।",
      mr: "महिलांसाठी मोफत कौशल्य विकास कार्यक्रम. शिवणकाम, संगणक मूलभूत आणि उद्योजकतेचे प्रशिक्षण.",
    },
  },
  {
    id: 6,
    title: {
      en: "Health Check-up Camp - URGENT",
      hi: "स्वास्थ्य जांच शिविर - तत्काल",
      mr: "आरोग्य तपासणी शिबिर - तातडीचे",
    },
    date: "2023-07-10",
    urgent: true,
    content: {
      en: "Free health check-up camp by government doctors. Blood tests, BP check, and diabetes screening available.",
      hi: "सरकारी डॉक्टरों द्वारा मुफ्त स्वास्थ्य जांच शिविर। रक्त जांच, बीपी चेक और मधुमेह स्क्रीनिंग उपलब्ध।",
      mr: "सरकारी डॉक्टरांकडून मोफत आरोग्य तपासणी शिबिर. रक्त तपासणी, बीपी चेक आणि मधुमेह स्क्रीनिंग उपलब्ध.",
    },
  },
  {
    id: 7,
    title: {
      en: "Electricity Maintenance",
      hi: "बिजली रखरखाव",
      mr: "वीज देखभाल",
    },
    date: "2023-07-15",
    urgent: false,
    content: {
      en: "Scheduled electricity maintenance on July 15th from 9 AM to 1 PM. Power supply will be interrupted.",
      hi: "15 जुलाई को सुबह 9 बजे से दोपहर 1 बजे तक निर्धारित बिजली रखरखाव। बिजली आपूर्ति बाधित रहेगी।",
      mr: "15 जुलै रोजी सकाळी 9 ते दुपारी 1 पर्यंत नियोजित वीज देखभाल. वीज पुरवठा खंडित राहील.",
    },
  },
  {
    id: 8,
    title: {
      en: "Tree Plantation Drive",
      hi: "वृक्षारोपण अभियान",
      mr: "वृक्षारोपण मोहीम",
    },
    date: "2023-07-20",
    urgent: false,
    content: {
      en: "Community tree plantation drive on World Environment Day. Join us to plant 500 saplings across the village.",
      hi: "विश्व पर्यावरण दिवस पर सामुदायिक वृक्षारोपण अभियान। गांव भर में 500 पौधे लगाने में हमारे साथ जुड़ें।",
      mr: "जागतिक पर्यावरण दिनानिमित्त सामुदायिक वृक्षारोपण मोहीम. गावभर 500 रोपे लावण्यासाठी आमच्यात सामील व्हा.",
    },
  },
  {
    id: 9,
    title: {
      en: "Ration Distribution",
      hi: "राशन वितरण",
      mr: "रेशन वाटप",
    },
    date: "2023-07-25",
    urgent: false,
    content: {
      en: "Monthly ration distribution for BPL families. Bring ration card and Aadhaar card for verification.",
      hi: "बीपीएल परिवारों के लिए मासिक राशन वितरण। सत्यापन के लिए राशन कार्ड और आधार कार्ड लाएं।",
      mr: "बीपीएल कुटुंबांसाठी मासिक रेशन वाटप. पडताळणीसाठी रेशन कार्ड आणि आधार कार्ड आणा.",
    },
  },
  {
    id: 10,
    title: {
      en: "Digital Literacy Program",
      hi: "डिजिटल साक्षरता कार्यक्रम",
      mr: "डिजिटल साक्षरता कार्यक्रम",
    },
    date: "2023-08-01",
    urgent: false,
    content: {
      en: "Free digital literacy classes for senior citizens. Learn mobile banking, online services, and digital payments.",
      hi: "वरिष्ठ नागरिकों के लिए मुफ्त डिजिटल साक्षरता कक्षाएं। मोबाइल बैंकिंग, ऑनलाइन सेवाएं और डिजिटल भुगतान सीखें।",
      mr: "ज्येष्ठ नागरिकांसाठी मोफत डिजिटल साक्षरता वर्ग. मोबाइल बँकिंग, ऑनलाइन सेवा आणि डिजिटल पेमेंट शिका.",
    },
  },
  {
    id: 11,
    title: {
      en: "Cleanliness Drive - URGENT",
      hi: "स्वच्छता अभियान - तत्काल",
      mr: "स्वच्छता मोहीम - तातडीचे",
    },
    date: "2023-08-05",
    urgent: true,
    content: {
      en: "Village-wide cleanliness drive before monsoon season. All residents requested to participate actively.",
      hi: "मानसून सीजन से पहले गांव व्यापी स्वच्छता अभियान। सभी निवासियों से सक्रिय भागीदारी का अनुरोध।",
      mr: "पावसाळी हंगामापूर्वी गावव्यापी स्वच्छता मोहीम. सर्व रहिवाशांना सक्रिय सहभागाची विनंती.",
    },
  },
  {
    id: 12,
    title: {
      en: "Solar Street Light Installation",
      hi: "सोलर स्ट्रीट लाइट स्थापना",
      mr: "सोलर स्ट्रीट लाइट बसवणे",
    },
    date: "2023-08-10",
    urgent: false,
    content: {
      en: "Installation of solar street lights on main roads. Work will be completed in phases over 2 weeks.",
      hi: "मुख्य सड़कों पर सोलर स्ट्रीट लाइट की स्थापना। कार्य 2 सप्ताह में चरणों में पूरा होगा।",
      mr: "मुख्य रस्त्यांवर सोलर स्ट्रीट लाइट बसवणे. कार्य 2 आठवड्यांत टप्प्याटप्प्याने पूर्ण होईल.",
    },
  },
]

const AnnouncementCarousel = () => {
  const { t, language } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<(typeof announcements)[0] | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === announcements.length - 1 ? 0 : prevIndex + 1))
      }, 4000) // Change slide every 4 seconds
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying])

  // Scroll to current announcement
  useEffect(() => {
    if (scrollRef.current) {
      const scrollAmount = currentIndex * 320 // Card width + gap
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  // Marquee animation for the current announcement
  useEffect(() => {
    if (marqueeRef.current && isAutoPlaying) {
      const marqueeElement = marqueeRef.current
      marqueeElement.style.animation = "none"
      // Trigger reflow
      void marqueeElement.offsetWidth
      marqueeElement.style.animation = "marquee 15s linear infinite"
    }
  }, [currentIndex, isAutoPlaying])

  const handlePrevious = () => {
    setIsAutoPlaying(false) // Stop auto-play when user interacts
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? announcements.length - 1 : prevIndex - 1))
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleNext = () => {
    setIsAutoPlaying(false) // Stop auto-play when user interacts
    setCurrentIndex((prevIndex) => (prevIndex === announcements.length - 1 ? 0 : prevIndex + 1))
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false) // Pause on hover
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true) // Resume on mouse leave
  }

  const handleCardClick = (announcement: (typeof announcements)[0]) => {
    setSelectedAnnouncement(announcement)
    setIsAutoPlaying(false)
  }

  const closeModal = () => {
    setSelectedAnnouncement(null)
    setIsAutoPlaying(true)
  }

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
            className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-500" : "bg-gray-400"}`}
            title={isAutoPlaying ? "Auto-playing" : "Paused"}
          />

          {/* Navigation arrows */}
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Marquee for current announcement */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 mb-4 overflow-hidden">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap"
          style={{
            animation: isAutoPlaying ? "marquee 15s linear infinite" : "none",
          }}
        >
          <div className="flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4 text-gov-orange" />
            <span className="font-medium text-gov-blue">
              {announcements[currentIndex].title[language]}: {announcements[currentIndex].content[language]}
            </span>
            <span className="mx-8">•</span>
            <AlertTriangle className="mr-2 h-4 w-4 text-gov-orange" />
            <span className="font-medium text-gov-blue">
              {announcements[currentIndex].title[language]}: {announcements[currentIndex].content[language]}
            </span>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto mobile-carousel pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {announcements.map((announcement, index) => (
            <Card
              key={announcement.id}
              className={`flex-shrink-0 w-80 md:w-96 transition-all duration-300 cursor-pointer ${
                announcement.urgent ? "urgent-alert" : ""
              } ${index === currentIndex ? "ring-2 ring-gov-blue shadow-lg scale-105" : "hover:shadow-lg hover:scale-102"}`}
              onClick={() => handleCardClick(announcement)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={announcement.urgent ? "destructive" : "secondary"} className="mb-2">
                    {announcement.urgent ? "URGENT" : "INFO"}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(announcement.date).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{announcement.title[language]}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{announcement.content[language]}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
                setTimeout(() => setIsAutoPlaying(true), 10000)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-gov-blue w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to announcement ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Modal for clicked announcement */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div
            className="bg-white rounded-lg max-w-lg w-full p-6 relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={closeModal}>
              <X className="h-4 w-4" />
            </Button>

            <Badge variant={selectedAnnouncement.urgent ? "destructive" : "secondary"} className="mb-4">
              {selectedAnnouncement.urgent ? "URGENT" : "INFO"}
            </Badge>

            <h2 className="text-xl font-bold mb-2">{selectedAnnouncement.title[language]}</h2>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="mr-1 h-4 w-4" />
              {new Date(selectedAnnouncement.date).toLocaleDateString()}
            </div>

            <p className="text-gray-700">{selectedAnnouncement.content[language]}</p>

            <div className="mt-6 flex justify-end">
              <Button onClick={closeModal}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Add keyframe animation for marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}

export default AnnouncementCarousel
