import { experience } from "@/src/utils/data";
import { Briefcase } from "lucide-react";

export default function Experiences() {
  return (
    <section id="experience" className="py-16 md:py-20 bg-white">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-200">
            Professional Experience
          </h2>
        </div>
        <div className="space-y-8">
          {experience.map((exp, idx) => (
            <div key={idx} className="border-l-4 border-indigo-400 pl-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {exp.title}
              </h3>
              <p className="text-indigo-700 font-medium">{exp.organization}</p>
              <p className="text-sm text-gray-500">{exp.period}</p>
              <p className="text-gray-600 mt-1">{exp.description}</p>
              {exp.achievements && exp.achievements.length > 0 && (
                <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
