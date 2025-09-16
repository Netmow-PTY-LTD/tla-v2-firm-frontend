"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CompanyLawyerCountCard() {
  return (
    <Card className="w-full shadow-sm rounded-2xl">
      {/* Header */}
      <div className="flex justify-between px-4 border-b">
        <h3 className="text-xl font-semibold text-black pb-4">Lawyers</h3>
        <Link href="/dashboard/lawyers">
          <Button variant="outline" size="sm">
            View
          </Button>
        </Link>
      </div>

      {/* Counts */}
      <div className="flex items-center justify-center h-[calc(100%-100px)]">
        <div className="flex items-center justify-center gap-6 p-4">
          {/* Total */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center min-w-16 min-h-16 rounded-full bg-slate-900 text-white">
              <p className="text-2xl font-bold">{0}</p>
            </div>
            <span className="text-sm font-medium mt-1">Total Lawyers</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
