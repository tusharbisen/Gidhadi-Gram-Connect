import { connectToDatabase } from "@/lib/db";
import { Soldier } from "@/lib/models/soldier";
import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award } from "lucide-react";

import { SoldierForm } from "@/components/brave-soldiers/soldier-form";

export const revalidate = 60; // ISR cache

export default async function BraveSoldiersPage() {
  let soldiers: any[] = [];

  try {
    await connectToDatabase();
    const docs = await Soldier.find({ status: "approved", isPublic: true })
      .sort({ createdAt: -1 })
      .lean();
    
    // Serialize docs for Next.js Server Components
    soldiers = JSON.parse(JSON.stringify(docs));
  } catch (error) {
    console.error("Error fetching brave soldiers:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* ── Hero Banner ──────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10 bg-black pointer-events-none mix-blend-overlay" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative text-center">
          <div className="bg-white/10 p-4 rounded-full inline-block mb-6 shadow-xl backdrop-blur-sm border border-white/20">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Honoring Our Brave Soldiers 🇮🇳
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed px-4">
            A tribute to the brave sons and daughters of our land who serve the nation with unwavering courage and dedication.
          </p>
        </div>
      </section>

      {/* ── Roster & Form Wrapper ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10 space-y-16">
        
        {/* ── Database Output Grid ────────────────────────────────────────── */}
        {soldiers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center text-slate-500">
            <Shield className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium">No completely approved records yet.</p>
            <p className="text-sm">Be the first to submit a hero's details below.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {soldiers.map((soldier: any) => (
              <Card key={soldier._id || soldier.id} className="group overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-slate-100 hover:border-primary/30 bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4 items-center">
                      {soldier.photo && (
                        <img src={soldier.photo} alt={soldier.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">{soldier.name}</h3>
                        <div className="flex items-center gap-1.5 text-slate-600 mt-1">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className="font-medium">{soldier.rank || "Soldier"}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                      {soldier.force}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                       <span className="text-slate-500">From</span>
                       <span className="font-semibold text-slate-700">{soldier.village}</span>
                    </div>
                    {/* Hiding highly personal info like phone deliberately from public output as a best practice */}
                  </div>

                  {soldier.message && (
                    <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-primary/40 mt-4">
                      <div className="flex gap-2 items-start">
                         <Award className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-600 italic font-medium leading-relaxed">"{soldier.message}"</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ── Submission Form Block ────────────────────────────────────────── */}
        <section id="submission-form" className="scroll-mt-24 pt-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Know a hero from our village?</h2>
            <p className="text-slate-600 mt-2">Submit their details below so we can honor them.</p>
          </div>
          <SoldierForm />
        </section>

      </div>
    </main>
  );
}
