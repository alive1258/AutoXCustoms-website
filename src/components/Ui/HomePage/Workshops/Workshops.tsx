import { workshops } from "@/src/utils/data";
import { Video } from "lucide-react";

export default function Workshops() {
  return (
    <section id="workshops" className="py-16 md:py-20 bg-white">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <Video className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Workshops & Training
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {workshops?.map((w, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-800">{w.title}</h3>
              <p className="text-sm text-indigo-700">
                {w.type} · {w.role}
              </p>
              <p className="text-sm text-gray-500 mt-1">{w.topics}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
