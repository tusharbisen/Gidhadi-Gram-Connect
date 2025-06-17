import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { LanguageProvider } from "@/components/providers/language-provider"
import AnnouncementMarquee from "@/components/home/announcement-marquee"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gram Panchayat Gidhadi",
  description: "Official website of Gram Panchayat Gidhadi",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
  )
}
