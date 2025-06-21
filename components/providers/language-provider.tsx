"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Language = "en" | "hi" | "mr";

type Translations = {
  [key: string]: {
    en: string;
    hi: string;
    mr: string;
  };
};

const translations: Translations = {
  // Navigation & Header
  home: {
    en: "Home",
    hi: "होम",
    mr: "मुख्यपृष्ठ",
  },
  about: {
    en: "About Us",
    hi: "हमारे बारे में",
    mr: "आमच्याबद्दल",
  },
  schemes: {
    en: "Schemes & Services",
    hi: "योजनाएं और सेवाएं",
    mr: "योजना आणि सेवा",
  },
  news: {
    en: "News & Events",
    hi: "समाचार और कार्यक्रम",
    mr: "बातम्या आणि कार्यक्रम",
  },
  grievance: {
    en: "Grievance",
    hi: "शिकायत",
    mr: "तक्रार",
  },
  gallery: {
    en: "Gallery",
    hi: "गैलरी",
    mr: "गॅलरी",
  },
  election: {
    en: "Election",
    hi: "चुनाव",
    mr: "निवडणूक",
  },
  documents: {
    en: "Documents",
    hi: "दस्तावेज़",
    mr: "कागदपत्रे",
  },
  adminLogin: {
    en: "Admin Login",
    hi: "एडमिन लॉगिन",
    mr: "प्रशासक लॉगिन",
  },

  // Hero Section
  welcomeToGidhadi: {
    en: "Welcome to Gidhadi Gram Connect",
    hi: "गिधाड़ी ग्राम कनेक्ट में आपका स्वागत है",
    mr: "गिधाडी ग्राम कनेक्ट मध्ये आपले स्वागत आहे",
  },
  welcomeMessage: {
    en: "Empowering rural governance through transparency, accountability and citizen participation for sustainable development",
    hi: "सतत विकास के लिए पारदर्शिता, जवाबदेही और नागरिक भागीदारी के माध्यम से ग्रामीण शासन को सशक्त बनाना",
    mr: "शाश्वत विकासासाठी पारदर्शकता, उत्तरदायित्व आणि नागरिकांच्या सहभागातून ग्रामीण प्रशासनाचे सक्षमीकरण",
  },
  submitGrievance: {
    en: "Submit Grievance",
    hi: "शिकायत दर्ज करें",
    mr: "तक्रार नोंदवा",
  },
  viewGovernmentSchemes: {
    en: "View Government Schemes",
    hi: "सरकारी योजनाएं देखें",
    mr: "सरकारी योजना पहा",
  },

  // Announcements
  latestAnnouncements: {
    en: "Latest Announcements",
    hi: "नवीनतम घोषणाएँ",
    mr: "नवीनतम घोषणा",
  },
  viewAll: {
    en: "View All",
    hi: "सभी देखें",
    mr: "सर्व पहा",
  },
  recentEvents: {
    en: "Recent Events",
    hi: "हाल के कार्यक्रम",
    mr: "अलीकडील कार्यक्रम",
  },
  emergencyContacts: {
    en: "Emergency Contacts",
    hi: "आपातकालीन संपर्क",
    mr: "आपत्कालीन संपर्क",
  },

  // Basic Info
  gramPanchayat: {
    en: "Gram Panchayat",
    hi: "ग्राम पंचायत",
    mr: "ग्रामपंचायत",
  },
  gidhadi: {
    en: "Gidhadi",
    hi: "गिधाड़ी",
    mr: "गिधाडी",
  },
  districtState: {
    en: "District, State - 123456",
    hi: "जिला, राज्य - 123456",
    mr: "जिल्हा, राज्य - 123456",
  },

  // Footer
  footerDescription: {
    en: "This website is for public information only. It is not affiliated with the Gram Panchayat or any government website, and we share only publicly available information.",
    hi: "यह वेबसाइट केवल सार्वजनिक जानकारी के लिए है। इसका ग्राम पंचायत या किसी सरकारी वेबसाइट से कोई संबंध नहीं है, और हम केवल सार्वजनिक रूप से उपलब्ध जानकारी साझा करते हैं।",
    mr: "ही वेबसाइट केवळ सार्वजनिक माहितीसाठी आहे. याचा ग्रामपंचायत किंवा कोणत्याही सरकारी वेबसाइटशी संबंध नाही आणि आम्ही फक्त सार्वजनिक माहिती शेअर करतो.",
  },
  quickLinks: {
    en: "Quick Links",
    hi: "त्वरित लिंक",
    mr: "जलद दुवे",
  },
  importantLinks: {
    en: "Important Links",
    hi: "महत्वपूर्ण लिंक",
    mr: "महत्त्वाचे दुवे",
  },
  ministryRuralDevelopment: {
    en: "Ministry of Rural Development",
    hi: "ग्रामीण विकास मंत्रालय",
    mr: "ग्रामीण विकास मंत्रालय",
  },
  ministryPanchayatiRaj: {
    en: "Ministry of Panchayati Raj",
    hi: "पंचायती राज मंत्रालय",
    mr: "पंचायती राज मंत्रालय",
  },
  nationalPortal: {
    en: "National Portal of India",
    hi: "भारत का राष्ट्रीय पोर्टल",
    mr: "भारताचे राष्ट्रीय पोर्टल",
  },
  contactUs: {
    en: "Contact Us",
    hi: "संपर्क करें",
    mr: "संपर्क करा",
  },
  gramPanchayatAddress: {
    en: "Gidhadi Gram Connect, Gidhadi, Gondia, Maharashtra - 441801",
    hi: "गिधाड़ी ग्राम कनेक्ट, गिधाड़ी, गोंदिया, महाराष्ट्र - ४४१८०१",
    mr: "गिधाडी ग्राम कनेक्ट, गिधाडी, गोंदिया, महाराष्ट्र - ४४१८०१",
  },
  allRightsReserved: {
    en: "All Rights Reserved",
    hi: "सर्वाधिकार सुरक्षित",
    mr: "सर्व हक्क राखीव",
  },

  // About Page
  aboutVillage: {
    en: "About Gidhadi Village",
    hi: "गिधाड़ी गांव के बारे में",
    mr: "गिधाडी गावाबद्दल",
  },
  electedMembers: {
    en: "Elected Members",
    hi: "निर्वाचित सदस्य",
    mr: "निवडून आलेले सदस्य",
  },
  sarpanch: {
    en: "Sarpanch",
    hi: "सरपंच",
    mr: "सरपंच",
  },
  upSarpanch: {
    en: "Up-Sarpanch",
    hi: "उप-सरपंच",
    mr: "उप-सरपंच",
  },
  wardMember: {
    en: "Ward Member",
    hi: "वार्ड सदस्य",
    mr: "वार्ड सदस्य",
  },
  readMore: {
    en: "Read More",
    hi: "और पढ़ें",
    mr: "अधिक वाचा",
  },
  showLess: {
    en: "Show Less",
    hi: "कम दिखाएं",
    mr: "कमी दाखवा",
  },

  // Schemes Page
  governmentSchemes: {
    en: "Government Schemes",
    hi: "सरकारी योजनाएं",
    mr: "सरकारी योजना",
  },
  allSchemes: {
    en: "All Schemes",
    hi: "सभी योजनाएं",
    mr: "सर्व योजना",
  },
  central: {
    en: "Central",
    hi: "केंद्रीय",
    mr: "केंद्रीय",
  },
  state: {
    en: "State",
    hi: "राज्य",
    mr: "राज्य",
  },
  local: {
    en: "Local",
    hi: "स्थानीय",
    mr: "स्थानिक",
  },
  eligibility: {
    en: "Eligibility",
    hi: "पात्रता",
    mr: "पात्रता",
  },
  learnMore: {
    en: "Learn More",
    hi: "और जानें",
    mr: "अधिक जाणून घ्या",
  },

  // Scheme Names
  pmay: {
    en: "Pradhan Mantri Awas Yojana (PMAY)",
    hi: "प्रधानमंत्री आवास योजना",
    mr: "प्रधानमंत्री आवास योजना",
  },
  pmayDesc: {
    en: "Housing for all by providing financial assistance for construction of houses",
    hi: "घर निर्माण के लिए वित्तीय सहायता प्रदान करके सभी के लिए आवास",
    mr: "घर बांधणीसाठी आर्थिक मदत देऊन सर्वांसाठी घर",
  },
  pmayEligibility: {
    en: "BPL families, women-headed households",
    hi: "बीपीएल परिवार, महिला मुखिया परिवार",
    mr: "बीपीएल कुटुंबे, महिला मुख्य कुटुंबे",
  },
  nrega: {
    en: "Mahatma Gandhi NREGA",
    hi: "महात्मा गांधी नरेगा",
    mr: "महात्मा गांधी नरेगा",
  },
  nregaDesc: {
    en: "Guaranteed 100 days of employment in a financial year to rural households",
    hi: "ग्रामीण परिवारों को वित्तीय वर्ष में 100 दिन रोजगार की गारंटी",
    mr: "ग्रामीण कुटुंबांना आर्थिक वर्षात 100 दिवसांच्या रोजगाराची हमी",
  },
  nregaEligibility: {
    en: "Adult members of rural households",
    hi: "ग्रामीण परिवारों के वयस्क सदस्य",
    mr: "ग्रामीण कुटुंबांचे प्रौढ सदस्य",
  },
  ayushman: {
    en: "Ayushman Bharat",
    hi: "आयुष्मान भारत",
    mr: "आयुष्मान भारत",
  },
  ayushmanDesc: {
    en: "Health insurance coverage up to ₹5 lakh per family per year",
    hi: "प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य बीमा कवरेज",
    mr: "प्रति कुटुंब दरवर्षी ₹5 लाख पर्यंत आरोग्य विमा कव्हरेज",
  },
  ayushmanEligibility: {
    en: "Families listed in SECC 2011",
    hi: "SECC 2011 में सूचीबद्ध परिवार",
    mr: "SECC 2011 मध्ये सूचीबद्ध कुटुंबे",
  },
  samagraShiksha: {
    en: "Samagra Shiksha Abhiyan",
    hi: "समग्र शिक्षा अभियान",
    mr: "समग्र शिक्षा अभियान",
  },
  samagraShikshaDesc: {
    en: "Holistic education from pre-school to class 12",
    hi: "प्री-स्कूल से कक्षा 12 तक समग्र शिक्षा",
    mr: "प्री-स्कूल ते वर्ग 12 पर्यंत समग्र शिक्षा",
  },
  samagraShikshaEligibility: {
    en: "All children aged 3-18 years",
    hi: "3-18 वर्ष आयु के सभी बच्चे",
    mr: "3-18 वर्ष वयोगटातील सर्व मुले",
  },

  // Emergency Contacts
  police: {
    en: "Police",
    hi: "पुलिस",
    mr: "पोलीस",
  },
  fireBrigade: {
    en: "Fire Brigade",
    hi: "दमकल",
    mr: "अग्निशमन दल",
  },
  ambulance: {
    en: "Ambulance",
    hi: "एम्बुलेंस",
    mr: "रुग्णवाहिका",
  },

  // Grievance
  grievancePortal: {
    en: "Grievance Portal",
    hi: "शिकायत पोर्टल",
    mr: "तक्रार पोर्टल",
  },
  submitComplaint: {
    en: "Submit Complaint",
    hi: "शिकायत दर्ज करें",
    mr: "तक्रार नोंदवा",
  },
  trackStatus: {
    en: "Track Status",
    hi: "स्थिति ट्रैक करें",
    mr: "स्थिती ट्रॅक करा",
  },
  fullName: {
    en: "Full Name",
    hi: "पूरा नाम",
    mr: "पूर्ण नाव",
  },
  phoneNumber: {
    en: "Phone Number",
    hi: "फोन नंबर",
    mr: "फोन नंबर",
  },
  complaintType: {
    en: "Complaint Type",
    hi: "शिकायत का प्रकार",
    mr: "तक्रारीचा प्रकार",
  },
  description: {
    en: "Description",
    hi: "विवरण",
    mr: "वर्णन",
  },
  uploadPhoto: {
    en: "Upload Photo (Optional)",
    hi: "फोटो अपलोड करें (वैकल्पिक)",
    mr: "फोटो अपलोड करा (पर्यायी)",
  },
  submit: {
    en: "Submit",
    hi: "जमा करें",
    mr: "सबमिट करा",
  },

  // Complaint Types
  waterSupply: {
    en: "Water Supply",
    hi: "पानी की आपूर्ति",
    mr: "पाणी पुरवठा",
  },
  roadMaintenance: {
    en: "Road Maintenance",
    hi: "सड़क रखरखाव",
    mr: "रस्ता देखभाल",
  },
  streetLights: {
    en: "Street Lights",
    hi: "स्ट्रीट लाइट",
    mr: "रस्त्यावरील दिवे",
  },
  drainageCleaning: {
    en: "Drainage & Cleaning",
    hi: "जल निकासी और सफाई",
    mr: "गटार आणि साफसफाई",
  },
  other: {
    en: "Other",
    hi: "अन्य",
    mr: "इतर",
  },

  // Gallery
  eventPhotos: {
    en: "Event Photos",
    hi: "कार्यक्रम की तस्वीरें",
    mr: "कार्यक्रमाचे फोटो",
  },
  developmentWork: {
    en: "Development Work",
    hi: "विकास कार्य",
    mr: "विकास कार्य",
  },

  // Documents
  documentsDownloads: {
    en: "Documents & Downloads",
    hi: "दस्तावेज़ और डाउनलोड",
    mr: "कागदपत्रे आणि डाउनलोड",
  },
  budgetReports: {
    en: "Budget Reports",
    hi: "बजट रिपोर्ट",
    mr: "अर्थसंकल्प अहवाल",
  },
  meetingMinutes: {
    en: "Meeting Minutes",
    hi: "बैठक कार्यवृत्त",
    mr: "सभेचे कार्यवृत्त",
  },
  certificates: {
    en: "Certificates & Forms",
    hi: "प्रमाणपत्र और फॉर्म",
    mr: "प्रमाणपत्रे आणि फॉर्म",
  },
  download: {
    en: "Download",
    hi: "डाउनलोड",
    mr: "डाउनलोड",
  },

  // Admin
  adminDashboard: {
    en: "Admin Dashboard",
    hi: "एडमिन डैशबोर्ड",
    mr: "प्रशासक डॅशबोर्ड",
  },
  email: {
    en: "Email",
    hi: "ईमेल",
    mr: "ईमेल",
  },
  password: {
    en: "Password",
    hi: "पासवर्ड",
    mr: "पासवर्ड",
  },
  login: {
    en: "Login",
    hi: "लॉगिन",
    mr: "लॉगिन",
  },

  // Common Actions
  save: {
    en: "Save",
    hi: "सेव करें",
    mr: "सेव्ह करा",
  },
  cancel: {
    en: "Cancel",
    hi: "रद्द करें",
    mr: "रद्द करा",
  },
  edit: {
    en: "Edit",
    hi: "संपादित करें",
    mr: "संपादित करा",
  },
  delete: {
    en: "Delete",
    hi: "हटाएं",
    mr: "हटवा",
  },
  close: {
    en: "Close",
    hi: "बंद करें",
    mr: "बंद करा",
  },
  loading: {
    en: "Loading...",
    hi: "लोड हो रहा है...",
    mr: "लोड होत आहे...",
  },
  success: {
    en: "Success",
    hi: "सफल",
    mr: "यशस्वी",
  },
  error: {
    en: "Error",
    hi: "त्रुटि",
    mr: "त्रुटी",
  },

  // Status
  pending: {
    en: "Pending",
    hi: "लंबित",
    mr: "प्रलंबित",
  },
  inProgress: {
    en: "In Progress",
    hi: "प्रगति में",
    mr: "प्रगतीत",
  },
  resolved: {
    en: "Resolved",
    hi: "हल हो गया",
    mr: "निराकरण झाले",
  },
  rejected: {
    en: "Rejected",
    hi: "अस्वीकृत",
    mr: "नाकारले",
  },

  // Dates and Time
  today: {
    en: "Today",
    hi: "आज",
    mr: "आज",
  },
  yesterday: {
    en: "Yesterday",
    hi: "कल",
    mr: "काल",
  },
  tomorrow: {
    en: "Tomorrow",
    hi: "कल",
    mr: "उद्या",
  },

  // Announcements Content
  covidVaccination: {
    en: "Connecting Gidhadi Village with Information, Updates, and Community Awareness",
  hi: "गिधाड़ी गांव को जानकारी, अपडेट और सामुदायिक जागरूकता से जोड़ने का प्रयास",
  mr: "गिधाडी गावाला माहिती, अद्यतने आणि सामुदायिक जनजागृतीने जोडण्याचा प्रयत्न"
  },
  covidVaccinationDesc: {
    en: "COVID-19 vaccination drive at GP office on 20th June. All residents 18+ eligible.",
    hi: "20 जून को जीपी कार्यालय में कोविड-19 टीकाकरण अभियान। 18+ सभी निवासी पात्र।",
    mr: "20 जून रोजी जीपी कार्यालयात कोविड-19 लसीकरण मोहीम. 18+ सर्व रहिवासी पात्र.",
  },
  waterSupplyInterruption: {
    en: "Water Supply Interruption - URGENT",
    hi: "पानी की आपूर्ति में व्यवधान - तत्काल",
    mr: "पाणी पुरवठा खंडित - तातडीचे",
  },
  waterSupplyInterruptionDesc: {
    en: "Water supply interrupted 10 AM - 2 PM for maintenance work.",
    hi: "रखरखाव कार्य के लिए 10 बजे - 2 बजे पानी की आपूर्ति बंद।",
    mr: "देखभालीसाठी 10 ते 2 पर्यंत पाणी पुरवठा बंद.",
  },
  gramSabhaMeeting: {
    en: "Gram Sabha Meeting",
    hi: "ग्राम सभा बैठक",
    mr: "ग्रामसभा बैठक",
  },
  gramSabhaMeetingDesc: {
    en: "Monthly Gram Sabha meeting at 11 AM in GP hall.",
    hi: "जीपी हॉल में 11 बजे मासिक ग्राम सभा बैठक।",
    mr: "जीपी हॉलमध्ये 11 वाजता मासिक ग्रामसभा बैठक.",
  },

  // Events
  independenceDay: {
    en: "Independence Day Celebration",
    hi: "स्वतंत्रता दिवस समारोह",
    mr: "स्वातंत्र्य दिन समारंभ",
  },
  treePlantation: {
    en: "Tree Plantation Drive",
    hi: "वृक्षारोपण अभियान",
    mr: "वृक्षारोपण मोहीम",
  },
  cleanlinessCompaign: {
    en: "Village Cleanliness Campaign",
    hi: "गांव स्वच्छता अभियान",
    mr: "गाव स्वच्छता मोहीम",
  },

  // Form Validation
  required: {
    en: "This field is required",
    hi: "यह फील्ड आवश्यक है",
    mr: "हे फील्ड आवश्यक आहे",
  },
  invalidEmail: {
    en: "Please enter a valid email",
    hi: "कृपया एक वैध ईमेल दर्ज करें",
    mr: "कृपया वैध ईमेल टाका",
  },
  invalidPhone: {
    en: "Please enter a valid phone number",
    hi: "कृपया एक वैध फोन नंबर दर्ज करें",
    mr: "कृपया वैध फोन नंबर टाका",
  },

  // Success Messages
  complaintSubmitted: {
    en: "Your complaint has been submitted successfully. Reference ID: ",
    hi: "आपकी शिकायत सफलतापूर्वक दर्ज की गई है। संदर्भ आईडी: ",
    mr: "तुमची तक्रार यशस्वीरित्या नोंदवली गेली आहे. संदर्भ आयडी: ",
  },
  loginSuccessful: {
    en: "Login successful",
    hi: "लॉगिन सफल",
    mr: "लॉगिन यशस्वी",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
