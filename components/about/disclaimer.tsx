"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Info, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export function Disclaimer() {
  return (
    <motion.section
      className="py-8 md:py-12 bg-amber-50 border-t-4 border-amber-400"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <Card className="border-amber-200 bg-white shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-full flex-shrink-0">
                <Info className="h-6 w-6 text-amber-600" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  Important Disclaimer
                </h3>

                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p>
                    <strong>Gidhadi Gram Connect</strong> is an <strong>independent information platform</strong>{" "}
                    created to provide public information about Gidhadi Gram Panchayat and its services. This website is{" "}
                    <strong>not officially affiliated</strong> with or endorsed by the Gidhadi Gram Panchayat
                    administration.
                  </p>

                  <p>
                    Our platform serves as a <strong>community resource</strong> to help citizens access information
                    about government services, schemes, and procedures. All information provided is gathered from
                    publicly available sources and is intended for informational purposes only.
                  </p>

                  <p>
                    For <strong>official government services, applications, and authoritative information</strong>,
                    please contact the Gidhadi Gram Panchayat office directly or visit their official government
                    portals.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This platform is maintained by independent developers and designers committed
                    to improving access to public information and promoting digital literacy in rural communities.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="#contact"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
                  >
                    Contact Platform Team
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                  <a
                    href="#official-links"
                    className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center transition-colors"
                  >
                    Official Government Links
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}
