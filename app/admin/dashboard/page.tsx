import { connectToDatabase } from "@/lib/db";
import { Soldier } from "@/lib/models/soldier";
import { SoldierAdminTable } from "@/components/admin/soldier-admin-table";
import { ShieldCheck } from "lucide-react";
import { LogoutButton } from "@/components/admin/logout-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let allSoldiers: any[] = [];

  try {
    await connectToDatabase();
    const docs = await Soldier.find().sort({ createdAt: -1 }).lean();
    allSoldiers = JSON.parse(JSON.stringify(docs));
    
    allSoldiers = allSoldiers.map(doc => ({
      ...doc,
      id: doc._id
    }));
  } catch (error) {
    console.error("Error fetching soldiers for admin:", error);
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6 pt-24 md:pt-32">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 md:p-3 rounded-full shrink-0">
            <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Brave Soldiers Directory
            </h1>
            <p className="text-sm md:text-base text-slate-600">
              Manage public submissions and directory visibility.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/complaints">
            <Button variant="outline" size="sm" className="hidden sm:flex border-slate-200">Grievances</Button>
          </Link>
          <LogoutButton />
        </div>
      </div>

      <SoldierAdminTable initialData={allSoldiers} />
    </div>
  );
}
