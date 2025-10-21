import { ShieldOff } from "lucide-react";
import React from "react";

export default function AccessDenied() {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 bg-red-50 border border-red-200 rounded-xl shadow-sm flex items-start space-x-4">
      <div className="flex-shrink-0">
        <ShieldOff className="h-10 w-10 text-red-500" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-red-700 mb-2">
          Access Denied
        </h2>
        <p className="text-red-600">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
}
