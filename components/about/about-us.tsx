import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Heart,
  Shield,
  Globe,
  Phone,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "तेजस बिसेन (Tejas Bisen)",
      role: "Project Coordinator & Full Stack Developer",
      designation: "Software Engineer",
      responsibility:
        "Leading project coordination, backend development, and community liaison",
      contact: "+91 98343 39517",
      skills: [
        "Leadership",
        "Project Management",
        "React.js",
        "Java",
        "Spring Boot",
        "Go Programming",
        "API Development",
        "Database Design",
      ],
      image: "/tejas.jpg",
    },
    {
      name: "तुषार बिसेन (Tushar Bisen)",
      role: "Team Lead & Frontend Developer",
      designation: "Frontend Developer",
      responsibility:"Leading the UI development and managing village news, events, and content updates",
      contact: "+91 91683 83674",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Responsive Design",
      ],
      image: "/tushar.jpg",
    },
    {
      name: "पंकज मेश्राम (Pankaj Meshram)",
      role: "Platform UI Designer",
      designation: "UI/UX Designer",
      responsibility:
        "Designing user-friendly interfaces and enhancing platform aesthetics",
      contact: "+91 8805920106",
      skills: ["UI/UX Design", "Figma", "Responsive Design", "User Research"],
      image: "/pnk.jpg",
    },
  ];
  

  const missionPoints = [
    "Provide easy access to important village information and government schemes",
    "Create a digital platform for villagers to stay connected and informed",
    "Promote transparency in local governance and community activities",
    "Support local businesses and farmers through digital visibility",
    "Bridge the digital divide by making technology accessible to all villagers",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 max-w-7xl">
        {/* Logo and Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-sky-100 rounded-full flex items-center justify-center border-2 sm:border-4 border-sky-200 shadow-lg">
              <Image
                src="/logo.png"
                alt="Gidhadi Gram Connect Logo"
                width={250}
                height={250}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-sky-800 mb-3 sm:mb-4 px-2 leading-tight">
            About Gidhadi Gram Connect
          </h1>
          <div className="w-12 sm:w-16 md:w-24 h-0.5 sm:h-1 bg-sky-600 mx-auto rounded-full"></div>
        </div>

        {/* Introduction Section */}
        <Card className="mb-4 sm:mb-6 md:mb-8 border-sky-200 shadow-lg">
          <CardHeader className="bg-sky-100 p-3 sm:p-4 md:p-6">
            <CardTitle className="flex flex-col sm:flex-row items-center gap-2 text-base sm:text-lg md:text-xl lg:text-2xl text-sky-800">
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              <span className="text-center sm:text-left leading-tight">
                Welcome to Our Digital Village
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 mb-3 sm:mb-4">
              <strong>Gidhadi Gram Connect</strong> is a community-driven
              digital platform created by and for the people of Gidhadi village.
              Our website serves as a bridge between traditional village life
              and modern digital convenience, making important information
              easily accessible to every villager.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
              Whether you're looking for government scheme updates, local news,
              community events, or want to connect with fellow villagers, this
              platform is designed to serve our entire community with simplicity
              and trust at its core.
            </p>
          </CardContent>
        </Card>

        {/* Vision and Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
          {/* Vision */}
          <Card className="border-sky-200 shadow-lg">
            <CardHeader className="bg-sky-100 p-3 sm:p-4 md:p-6">
              <CardTitle className="flex flex-col sm:flex-row items-center gap-2 text-base sm:text-lg md:text-xl text-sky-800">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="leading-tight">Our Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700 italic">
                "To create a digitally empowered Gidhadi village where every
                resident has easy access to information, opportunities, and
                community connections, fostering growth, transparency, and unity
                in our beloved village."
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="border-sky-300 shadow-lg">
            <CardHeader className="bg-sky-200 p-3 sm:p-4 md:p-6">
              <CardTitle className="flex flex-col sm:flex-row items-center gap-2 text-base sm:text-lg md:text-xl text-sky-800">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="leading-tight">Our Mission</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <ul className="space-y-2 sm:space-y-3">
                {missionPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <Badge
                      variant="outline"
                      className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-sky-50 text-sky-700 border-sky-300 flex-shrink-0"
                    >
                      {index + 1}
                    </Badge>
                    <span className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <Card className="mb-4 sm:mb-6 md:mb-8 border-sky-200 shadow-lg">
          <CardHeader className="bg-sky-100 p-3 sm:p-4 md:p-6">
            <CardTitle className="flex flex-col sm:flex-row items-center gap-2 text-base sm:text-lg md:text-xl lg:text-2xl text-sky-800">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              <span className="leading-tight">Our Dedicated Team</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <p className="text-gray-700 mb-4 sm:mb-6 text-center text-xs sm:text-sm md:text-base leading-relaxed">
              Meet the passionate volunteers who work tirelessly to keep our
              village connected and informed.
            </p>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="border-sky-200 shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-sky-50"
                >
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <div className="space-y-3 sm:space-y-4">
                      {/* Profile Image and Basic Info */}
                      <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                        <div className="relative">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 sm:border-4 border-sky-200 shadow-lg bg-sky-100">
                            <Image
                              src={member.image || `/placeholder.svg?height=96&width=96&text=${member.name.split(" ")[0]}`}
                              alt={`${member.name} profile picture`}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 bg-sky-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h3 className="font-bold text-gray-800 text-xs sm:text-sm md:text-base leading-tight px-2">
                            {member.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="bg-sky-100 text-sky-800 text-[10px] sm:text-xs"
                          >
                            {member.role}
                          </Badge>
                        </div>
                      </div>

                      {/* Designation */}
                      <div className="bg-sky-50 rounded-lg p-2 sm:p-3 border border-sky-100">
                        <div className="text-center">
                          <span className="text-[10px] sm:text-xs font-medium text-sky-600 uppercase tracking-wide block mb-1">
                            Designation
                          </span>
                          <p className="text-xs sm:text-sm font-medium text-gray-800 leading-snug">
                            {member.designation}
                          </p>
                        </div>
                      </div>

                      {/* Responsibility */}
                      <div className="space-y-1.5 sm:space-y-2">
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
                          <Target className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          Responsibility
                        </span>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50 p-2 sm:p-3 rounded-lg border">
                          {member.responsibility}
                        </p>
                      </div>

                      {/* Skills */}
                      <div className="space-y-1.5 sm:space-y-2">
                        <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1">
                          <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          Skills
                        </span>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {member.skills.map((skill, skillIndex) => (
                            <Badge
                              key={skillIndex}
                              variant="outline"
                              className="text-[10px] sm:text-xs bg-sky-50 text-sky-700 border-sky-300 hover:bg-sky-100 transition-colors"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="pt-2 sm:pt-3 border-t border-sky-100">
                        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 bg-sky-50 p-2 sm:p-3 rounded-lg">
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-sky-600 flex-shrink-0" />
                          <span className="font-medium">{member.contact}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Team Stats */}
            <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-sky-50 rounded-lg border border-sky-100">
                <div className="text-xl sm:text-2xl font-bold text-sky-600">
                  {teamMembers.length}
                </div>
                <div className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wide mt-1">
                  Team Members
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-sky-50 rounded-lg border border-sky-100">
                <div className="text-xl sm:text-2xl font-bold text-sky-600">24/7</div>
                <div className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wide mt-1">
                  Support
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-sky-50 rounded-lg border border-sky-100">
                <div className="text-xl sm:text-2xl font-bold text-sky-600">100%</div>
                <div className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wide mt-1">
                  Dedicated
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-sky-50 rounded-lg border border-sky-100">
                <div className="text-xl sm:text-2xl font-bold text-sky-600">∞</div>
                <div className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wide mt-1">
                  Community Love
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-4 sm:mb-6 md:mb-8 border-sky-200 shadow-lg">
          <CardHeader className="bg-sky-100 p-3 sm:p-4 md:p-6">
            <CardTitle className="flex flex-col sm:flex-row items-center gap-2 text-base sm:text-lg md:text-xl text-sky-800">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="leading-tight">Get in Touch</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-sky-50 rounded-lg">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-sky-600" />
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Visit Us</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Village Gidhadi
                  <br />
                  
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-sky-50 rounded-lg">
                <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-sky-600" />
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Call Us</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  +91 9168383674
                  <br />
                  Mon-Sat: 9AM-6PM
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-sky-50 rounded-lg sm:col-span-2 lg:col-span-1">
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-sky-600" />
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Email Us</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  gidhadigramconnect@gmail.com
                  <br />
                  We reply within 24 hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-amber-200 shadow-lg mb-4 sm:mb-6 md:mb-8">
          <CardHeader className="bg-amber-50 p-3 sm:p-4 md:p-6">
            <CardTitle className="flex flex-col sm:flex-row items-center gap-2 text-base sm:text-lg md:text-xl text-amber-800">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="leading-tight">Important Disclaimer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="bg-yellow-50 border-l-2 sm:border-l-4 border-yellow-400 p-3 sm:p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
                <strong>Please Note:</strong> Gidhadi Gram Connect is an{" "}
                <strong>unofficial community website</strong> created for public
                awareness and community benefit. This platform is not affiliated
                with any government body or official administrative office. All
                information provided here is for informational purposes only and
                should be verified with official sources when necessary.
              </p>
              <p className="text-gray-700 leading-relaxed mt-2 sm:mt-3 text-xs sm:text-sm md:text-base">
                Our goal is to serve our community with accurate and helpful
                information. For official government services and documentation,
                please visit the appropriate government offices or official
                websites.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="text-center p-3 sm:p-4 md:p-6 bg-sky-50 rounded-lg border border-sky-200">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-sky-800 mb-2 leading-tight">
            Together We Grow
          </h3>
          <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
            Thank you for being part of the Gidhadi Gram Connect community. Your
            participation and feedback help us serve our village better every
            day.
          </p>
        </div>
      </div>
    </div>
  );
}