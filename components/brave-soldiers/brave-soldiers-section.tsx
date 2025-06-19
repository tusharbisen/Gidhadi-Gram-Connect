import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Shield, Award } from "lucide-react";
import Image from "next/image";

const soldiersData = [
  {
    name: "Nikhil Rupchand Thakare",
    photo: "/brave/nikhilthakre.jpg",
    rank: "Corporal (Special Force)",
    branch: "Indian Air Force",
    yearsOfService: "7 Years",
    status: "Currently Serving",
    story: "Nothing is Impossible... Just do it.",
  },
  {
    name: "Jayandra Kumar Tekchand Chawhan",
    photo: "/brave/jaykumar.jpg",
    rank: "Ex Havildar",
    branch: "Indian Army",
    yearsOfService: "20 Years",
    status: "Retired",
    story: "Bahot Badiya upkram hai sabhi ko Jai Hind",
  },
];

export default function BraveSoldiersSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-50 to-white rounded-2xl border-2 mt-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-2 rounded-full shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Our Brave Soldiers
            </h2>
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-2 rounded-full shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Honoring Their Service and Sacrifice
          </p>
          <div className="w-32 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto mt-4 rounded-full shadow-md"></div>

          {/* Military Pattern Background */}
          <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-slate-100 to-transparent pointer-events-none"></div>
        </div>

        {/* Soldier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto ">
          {soldiersData.map((soldier, index) => (
            <Card
              key={index}
              className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-slate-200 hover:border-amber-500 bg-white hover:bg-gradient-to-r from-green-600 via-yellow-500 to-red-500  cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="relative">
                {/* Photo */}
                <div className="aspect-[4/3] relative overflow-hidden bg-slate-200 rounded-md flex items-center justify-center">
                  <Image
                    src={soldier.photo || "/placeholder.svg"}
                    alt={`Photo of ${soldier.name}`}
                    fill
                    className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent group-hover:from-black/40 transition-all duration-300"></div>

                  {/* Military Pattern Overlay on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
                </div>

                {/* Status Badge with Enhanced Styling */}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={
                      soldier.status === "Currently Serving"
                        ? "default"
                        : "secondary"
                    }
                    className={`${
                      soldier.status === "Currently Serving"
                        ? "bg-emerald-700 hover:bg-emerald-800 group-hover:bg-emerald-600"
                        : "bg-slate-700 hover:bg-slate-800 group-hover:bg-amber-700"
                    } text-white font-bold px-4 py-2 text-xs uppercase tracking-wider shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    {soldier.status}
                  </Badge>
                </div>

                {/* Military Rank Insignia */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="bg-amber-600 text-white p-2 rounded-full shadow-lg">
                    <Shield className="h-4 w-4" />
                  </div>
                </div>
              </div>

              <CardContent className="p-6 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-slate-50 transition-all duration-300">
                {/* Name and Rank with Enhanced Styling */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-amber-800 mb-2 leading-tight transition-colors duration-300">
                    {soldier.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-amber-100 group-hover:bg-amber-200 p-1 rounded-full transition-colors duration-300">
                      <Star className="h-4 w-4 text-amber-600 group-hover:text-amber-700" />
                    </div>
                    <span className="font-bold text-slate-700 group-hover:text-slate-800 transition-colors duration-300">
                      {soldier.rank}
                    </span>
                  </div>
                </div>

                {/* Service Details with Military Theme */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-2 rounded-lg group-hover:bg-slate-100 transition-colors duration-300">
                    <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Branch:
                    </span>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors duration-300">
                      {soldier.branch}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg group-hover:bg-slate-100 transition-colors duration-300">
                    <span className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Service:
                    </span>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors duration-300">
                      {soldier.yearsOfService}
                    </span>
                  </div>
                </div>

                {/* Story/Message with Enhanced Defense Theme */}
                <div className="bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-amber-50 group-hover:to-orange-50 rounded-lg p-4 mb-4 border-l-4 border-amber-500 group-hover:border-amber-600 transition-all duration-300">
                  <div className="flex items-start gap-2">
                    <div className="bg-amber-100 group-hover:bg-amber-200 p-1 rounded-full transition-colors duration-300">
                      <Award className="h-4 w-4 text-amber-600 group-hover:text-amber-700" />
                    </div>
                    <p className="text-sm text-slate-700 group-hover:text-slate-800 italic leading-relaxed font-medium transition-colors duration-300">
                      "{soldier.story}"
                    </p>
                  </div>
                </div>

                {/* Honor Badge with Military Styling */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 group-hover:from-amber-200 group-hover:to-orange-200 rounded-full border-2 border-amber-200 group-hover:border-amber-400 transition-all duration-300 shadow-md group-hover:shadow-lg">
                    <div className="bg-amber-600 group-hover:bg-amber-700 p-1 rounded-full transition-colors duration-300">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-bold text-amber-800 group-hover:text-amber-900 uppercase tracking-wider transition-colors duration-300">
                      Proud Son of Gidhadi
                    </span>
                  </div>
                </div>

                {/* Military Action Indicator */}
                <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest">
                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
                    Click to Honor
                    <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-slate-100 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              Know a Brave Soldier from Our Village?
            </h3>
            <p className="text-slate-600 mb-6">
              Help us honor more heroes by sharing their stories with our
              community.
            </p>
            <a
              href="https://docs.google.com/forms/d/1K2xP06egTSRr2BLvb86nmP20vs_z_jTreOHxbUrwk3A/edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Share Your Story
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
