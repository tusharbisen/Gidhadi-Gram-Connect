import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { LanguageProvider } from "@/components/providers/language-provider";
import AnnouncementMarquee from "@/components/home/announcement-marquee";
import { SITE_CONFIG } from "@/lib/site-config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Gidhadi Gram Connect | गिधाडी ग्राम कनेक्ट",
    template: "%s | Gidhadi Gram Connect",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Gidhadi village",
    "Gidhadi Gram Panchayat",
    "Gidhadi Gram Connect",
    "Gondia district Maharashtra",
    "village portal India",
    "government schemes Maharashtra",
    "PM-KISAN",
    "MGNREGA",
    "Ayushman Bharat",
    "gram panchayat online",
    "rural development Maharashtra",
    "village news Gondia",
    "grievance redressal village",
    "गिधाडी गाव",
    "गिधाडी ग्रामपंचायत",
    "गोंदिया जिल्हा",
    "महाराष्ट्र ग्राम कनेक्ट",
    "सरकारी योजना",
  ],
  authors: [
    { name: "Tejas Bisen", url: `${SITE_CONFIG.url}/about` },
    { name: "Tushar Bisen", url: `${SITE_CONFIG.url}/about` },
    { name: "Pankaj Meshram", url: `${SITE_CONFIG.url}/about` },
  ],
  creator: "Gidhadi Gram Connect Team",
  publisher: "Gidhadi Gram Connect",
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "hi-IN": "/?lang=hi",
      "mr-IN": "/?lang=mr",
    },
  },
  openGraph: {
    type: "website",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Gidhadi Gram Connect | गिधाडी ग्राम कनेक्ट",
    description: SITE_CONFIG.description,
    locale: SITE_CONFIG.locale,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gidhadi Gram Connect - Village Community Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gidhadi Gram Connect",
    description: SITE_CONFIG.description,
    images: ["/og-image.png"],
    creator: SITE_CONFIG.twitter,
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "512x512", type: "image/png" }],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "PASTE_SEARCH_CONSOLE_CODE_HERE",
  },
  applicationName: "Gidhadi Gram Connect",
  category: "government",
  classification: "Public Information",
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Gidhadi, Gondia, Maharashtra",
    "geo.position": "21.297306;80.284306",
    ICBM: "21.297306, 80.284306",
    "DC.language": "en, hi, mr",
    "DC.coverage": "Gidhadi, Gondia, Maharashtra, India",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f8fb",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      inLanguage: ["en-IN", "hi-IN", "mr-IN"],
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "GovernmentOrganization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: "Gidhadi Gram Panchayat",
      alternateName: ["गिधाडी ग्रामपंचायत", "Gidhadi Gram Connect"],
      url: SITE_CONFIG.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
        width: 512,
        height: 512,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9168383674",
        email: "gidhadigramconnect@gmail.com",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Village Gidhadi",
        addressLocality: "Gidhadi",
        addressRegion: "Maharashtra",
        postalCode: "441614",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 21.297306,
        longitude: 80.284306,
      },
      sameAs: ["https://panchayat.gov.in"],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/#webpage`,
      url: SITE_CONFIG.url,
      name: "Gidhadi Gram Connect - Home",
      isPartOf: { "@id": `${SITE_CONFIG.url}/#website` },
      about: { "@id": `${SITE_CONFIG.url}/#organization` },
      inLanguage: "en-IN",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_CONFIG.url,
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#f4f8fb" />
      </head>
      <body className={`${dmSans.className} antialiased`}>
        <Script
          id="json-ld-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <AnnouncementMarquee />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}