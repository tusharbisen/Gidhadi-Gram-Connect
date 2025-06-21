"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Footer from "../layout/footer"
import {
  Target,
  Eye,
  Heart,
  Globe,
  Smartphone,
  Code,
  Palette,
  Award,
  Shield,
  Zap,
  TrendingUp,
  Database,
  Monitor,
} from "lucide-react"
import Image from "next/image"
import { Disclaimer } from "@/components/about/disclaimer"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
}

export default function AboutUs() {
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const visionRef = useRef(null)
  const teamRef = useRef(null)
  const valuesRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const visionInView = useInView(visionRef, { once: true, margin: "-100px" })
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" })
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" })

  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Platform UI/UX Designer",
      description:
        "Creative designer who developed the user-friendly interface for Gidhadi Gram Connect. Specializes in accessible design for rural information platforms and government service portals.",
      icon: Palette,
      image: "/placeholder.svg?height=300&width=300",
      skills: ["Web Design", "User Experience", "Information Architecture", "Accessibility Design"],
    },
    {
      name: "Priya Sharma",
      role: "Senior Platform Developer",
      description:
        "Lead developer who built the Gidhadi Gram Connect platform. Expert in creating scalable information systems and public service portals for rural communities.",
      icon: Code,
      image: "/placeholder.svg?height=300&width=300",
      skills: ["Full-Stack Development", "Database Design", "API Development", "Performance Optimization"],
    },
    {
      name: "Amit Singh",
      role: "Frontend Developer & Mobile Specialist",
      description:
        "Frontend specialist who ensures Gidhadi Gram Connect works seamlessly across all devices. Focus on mobile-first design for rural internet connectivity scenarios.",
      icon: Smartphone,
      image: "/placeholder.svg?height=300&width=300",
      skills: ["React/Next.js", "Mobile Optimization", "Progressive Web Apps", "Responsive Design"],
    },
  ]

  const platformFeatures = [
    { number: "24/7", label: "Information Access", description: "Round-the-clock platform availability" },
    { number: "50+", label: "Service Information", description: "Comprehensive service details provided" },
    { number: "100%", label: "Mobile Responsive", description: "Optimized for all devices" },
    { number: "Free", label: "Public Access", description: "No cost information platform" },
  ]

  const informationServices = [
    {
      title: "Government Services Info",
      description: "Detailed information about available certificates and application processes",
      icon: Award,
    },
    {
      title: "Scheme Information",
      description: "Comprehensive details about government welfare schemes and eligibility",
      icon: Shield,
    },
    {
      title: "Contact Information",
      description: "Official contact details and office hours for citizen convenience",
      icon: Zap,
    },
    {
      title: "Process Guidance",
      description: "Step-by-step guides for various government procedures and applications",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      {/* Hero Section - Updated for Platform */}
      <motion.section
        ref={heroRef}
        className="relative py-12 md:py-20 lg:py-24 overflow-hidden"
        initial="initial"
        animate={heroInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6">
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                Gidhadi Gram Connect | Public Information Platform | Community Resource
              </Badge>
            </motion.div>

            <motion.h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900" variants={fadeInUp}>
              About <span className="text-blue-600">Gidhadi Gram Connect</span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-gray-600 font-normal">
                Your Gateway to Gidhadi Gram Panchayat Information
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              An <strong>independent information platform</strong> dedicated to providing comprehensive public
              information about <strong>Gidhadi Gram Panchayat services</strong>, government schemes, and procedures.
              Bridging the gap between citizens and government information through accessible digital resources.
            </motion.p>

            <motion.div className="flex flex-wrap justify-center gap-4 pt-4" variants={fadeInUp}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Database className="mr-2 h-5 w-5" />
                  Explore Information
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Contact Platform Team
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Platform Section */}
      <motion.section
        ref={aboutRef}
        className="py-12 md:py-16 bg-white"
        initial="initial"
        animate={aboutInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div className="space-y-6" variants={fadeInLeft}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                Welcome to Gidhadi Gram Connect
                <span className="block text-lg font-normal text-blue-600 mt-2">
                  Independent Information Platform | Community Resource | Public Service Portal
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                <strong>Gidhadi Gram Connect</strong> is an <strong>independent digital platform</strong> created to
                serve as a comprehensive information resource about Gidhadi Gram Panchayat. Our mission is to make
                government information more accessible to citizens through a user-friendly, mobile-responsive platform.
              </p>

              <p className="text-gray-600 leading-relaxed">
                This platform provides detailed information about <strong>government services</strong>, application
                procedures, welfare schemes, contact details, and office hours. We aim to bridge the information gap
                between citizens and local government services, promoting transparency and accessibility in rural
                governance.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                <h3 className="font-bold text-gray-900 mb-3">Platform Features:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>Service Information Hub</strong> - Comprehensive details about all government services
                  </li>
                  <li>
                    • <strong>Scheme Database</strong> - Complete information about welfare programs and eligibility
                  </li>
                  <li>
                    • <strong>Process Guides</strong> - Step-by-step instructions for various procedures
                  </li>
                  <li>
                    • <strong>Contact Directory</strong> - Official contact information and office hours
                  </li>
                </ul>
              </div>

              <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4" variants={staggerContainer}>
                {platformFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg"
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-blue-600">{feature.number}</div>
                    <div className="text-sm font-medium text-gray-800">{feature.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{feature.description}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="relative" variants={fadeInRight}>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Gidhadi Gram Connect - Digital Information Platform Interface"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </motion.div>

              {/* Floating Platform Info Cards */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="text-sm font-bold text-blue-600">Information Platform</div>
                <div className="text-xs text-gray-600">Community Resource</div>
              </motion.div>

              <motion.div
                className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="text-sm font-bold text-green-600">Free Access</div>
                <div className="text-xs text-gray-600">Public Service</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Information Services Showcase */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-sky-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Information Services & Resources</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Comprehensive information resources designed to help citizens understand and access government services
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {informationServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center"
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <service.icon className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                <h3 className="font-bold mb-2">{service.title}</h3>
                <p className="text-blue-100 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section - Platform Focused */}
      <motion.section
        ref={visionRef}
        className="py-12 md:py-16 bg-gray-50"
        initial="initial"
        animate={visionInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Platform Vision & Mission
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Committed to creating an accessible bridge between citizens and government information through innovative
              digital solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <motion.div variants={fadeInLeft}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardContent className="p-6 md:p-8">
                  <motion.div className="flex items-center mb-6" whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Eye className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Our Vision</h3>
                  </motion.div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    To become the <strong>most trusted and comprehensive information platform</strong> for Gidhadi Gram
                    Panchayat, ensuring every citizen has easy access to accurate, up-to-date information about
                    government services and procedures.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We envision a digitally informed community where{" "}
                    <strong>information barriers are eliminated</strong>, enabling citizens to easily understand and
                    access the government services they need.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission Card */}
            <motion.div variants={fadeInRight}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardContent className="p-6 md:p-8">
                  <motion.div className="flex items-center mb-6" whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">Our Mission</h3>
                  </motion.div>
                  <div className="space-y-3 text-gray-600">
                    <p className="leading-relaxed">
                      • Provide <strong>accurate, comprehensive information</strong> about all Gram Panchayat services
                      and procedures
                    </p>
                    <p className="leading-relaxed">
                      • Create <strong>user-friendly digital resources</strong> accessible to citizens of all technical
                      backgrounds
                    </p>
                    <p className="leading-relaxed">
                      • Maintain <strong>up-to-date information</strong> about government schemes, eligibility, and
                      application processes
                    </p>
                    <p className="leading-relaxed">
                      • Bridge the <strong>digital divide</strong> by making government information accessible on all
                      devices
                    </p>
                    <p className="leading-relaxed">
                      • Support <strong>informed citizenship</strong> through transparent access to public information
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section - Platform Development Team */}
      <motion.section
        ref={teamRef}
        className="py-12 md:py-16 bg-white"
        initial="initial"
        animate={teamInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-blue-600">Platform Development Team</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The dedicated developers and designers who created <strong>Gidhadi Gram Connect</strong> to serve as your
              trusted information resource. Independent professionals committed to improving access to public
              information.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" variants={staggerContainer}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div className="relative mb-6" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={`${member.name} - ${member.role} at Gidhadi Gram Connect`}
                        width={120}
                        height={120}
                        className="rounded-full mx-auto border-4 border-blue-100"
                      />
                      <motion.div
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 p-2 rounded-full"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <member.icon className="h-4 w-4 text-white" />
                      </motion.div>
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
                      {member.role}
                    </Badge>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.description}</p>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skillIndex}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          whileHover={{ scale: 1.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section - Platform Values */}
      <motion.section
        ref={valuesRef}
        className="py-12 md:py-16 bg-gradient-to-r from-blue-500 to-sky-500 text-white overflow-hidden"
        initial="initial"
        animate={valuesInView ? "animate" : "initial"}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Our Platform Values & Principles</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              The core principles that guide our commitment to providing reliable, accessible public information.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer}>
            {[
              {
                icon: Heart,
                title: "Public Service",
                description:
                  "Dedicated to serving the community by providing free, accessible information about government services.",
              },
              {
                icon: Monitor,
                title: "Transparency",
                description:
                  "Clear about our role as an independent platform and our commitment to accurate information sharing.",
              },
              {
                icon: Globe,
                title: "Accessibility",
                description:
                  "Ensuring our platform works for everyone, regardless of technical expertise or device limitations.",
              },
              {
                icon: Target,
                title: "Accuracy",
                description:
                  "Committed to providing the most current and accurate information available from official sources.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="bg-white/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <value.icon className="h-8 w-8" />
                </motion.div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact CTA Section - Platform Contact */}
      <motion.section
        className="py-12 md:py-16 bg-gray-900 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Connect with Our Platform Team
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have questions about our <strong>information platform</strong>, need help finding specific information, or
            want to suggest improvements? Our team is here to help make government information more accessible.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Contact Platform Team
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                Browse Information
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <Disclaimer />
      <Footer />
    </div>
  )
}
