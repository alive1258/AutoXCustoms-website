import { memberships } from "@/src/utils/data";
import { Users } from "lucide-react";

export default function Memberships() {
  return (
    <section id="memberships" className="py-16 md:py-20 bg-white">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-200">
            Professional Memberships
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {memberships.map((org) => (
            <span
              key={org}
              className="px-4 py-2 bg-gray-100 hover:bg-indigo-100 rounded-full text-sm font-medium transition"
            >
              {org}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
