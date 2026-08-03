"use client";

import { useState } from "react";
import { Car, ChevronDown } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";

const categories = [
  "All",
  "Paint",
  "Restoration",
  "Detailing",
  "Mechanical",
  "Accessories",
] as const;

type Category = (typeof categories)[number];

const projects: {
  slug: string;
  vehicle: string;
  work: string;
  result: string;
  category: Exclude<Category, "All">;
}[] = [
  {
    slug: "corolla-fielder-2020",
    vehicle: "Toyota Corolla Fielder 2020 Hybrid",
    work: "Professional Polishing & Detailing",
    result: "Mirror-finish shine restored and protected for the long haul.",
    category: "Detailing",
  },
  {
    slug: "auris-2016",
    vehicle: "Toyota Auris 2016",
    work: "Full Repaint in Custom Pearl White",
    result: "Showroom-fresh finish with a flawless, factory-grade coat.",
    category: "Paint",
  },
  {
    slug: "chr-2017",
    vehicle: "Toyota C-HR 2017",
    work: "Fresh Paint & Premium Finishing",
    result: "Sharp, even finish that looks freshly rolled off the line.",
    category: "Paint",
  },
  {
    slug: "corolla-ae110",
    vehicle: "Toyota Corolla AE110",
    work: "Complete Restoration + GT Body Kit",
    result: "Reborn with a track-ready stance and GT-spec styling.",
    category: "Restoration",
  },
  {
    slug: "camry-vista-1995",
    vehicle: "Toyota Camry Vista 1995",
    work: "Full Restoration",
    result:
      "A 1995 classic brought back to life — the customer traveled from Kushtia for it.",
    category: "Restoration",
  },
  {
    slug: "corolla-g-2006",
    vehicle: "Toyota Corolla G 2006",
    work: "Engine Replacement (1NZ-FE) + Full Restoration",
    result: "New heart, new life — 1NZ-FE swap with a full body refresh.",
    category: "Restoration",
  },
  {
    slug: "nissan-march",
    vehicle: "Nissan March",
    work: "Premium Cabin Sound Damping",
    result: "Concert-grade cabin acoustics with Nakamichi damping.",
    category: "Detailing",
  },
  {
    slug: "prado-2019",
    vehicle: "Toyota Land Cruiser Prado 2019",
    work: "Body Kit Repair, Paint Touch-up & Engine Service",
    result: "Trail-ready looks paired with a smooth-running engine.",
    category: "Paint",
  },
  {
    slug: "insight-2019",
    vehicle: "Honda Insight 2019",
    work: "Full Colour Work",
    result: "A complete exterior color transformation, done right.",
    category: "Paint",
  },
  {
    slug: "civic-10th-gen",
    vehicle: "Honda Civic 10th Gen",
    work: "Colour Change (Boost Blue → Candy Red)",
    result:
      "Bold Candy Red replacing Boost Blue — turning heads on every drive.",
    category: "Paint",
  },
  {
    slug: "lancer-glx",
    vehicle: "Mitsubishi Lancer GLX",
    work: "Suspension & Brake System Overhaul",
    result:
      "Tighter handling and confident stops, overhauled from the ground up.",
    category: "Mechanical",
  },
  {
    slug: "mark-ii-gx100",
    vehicle: "Toyota Mark II GX100",
    work: "Mechanical Diagnosis & Repair",
    result: "Root-cause diagnosis and repair — no more guesswork.",
    category: "Mechanical",
  },
  {
    slug: "corolla-110",
    vehicle: "Toyota Corolla 110",
    work: "Laser Projection Headlight Upgrade",
    result: "Night driving redefined with laser-sharp beam clarity.",
    category: "Accessories",
  },
];

const PAGE_SIZE = 6;
const LOAD_MORE_STEP = 3;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const selectCategory = (category: Category) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-surface-2">
      <div className="container">
        <SlideUp className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
            Our Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Featured Restoration Projects
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Proof of work, built from real completed jobs.
          </p>
        </SlideUp>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => selectCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                activeCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-white/5 text-gray-300 border border-white/10 hover:border-red-600/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project) => (
            <ZoomIn key={project.slug}>
              <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/50 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                <div
                  className="relative h-48 bg-cover bg-center bg-[#111] flex items-center justify-center"
                  style={{
                    backgroundImage: `url(/images/portfolio/${project.slug}.jpg)`,
                  }}
                >
                  <Car className="w-10 h-10 text-white/10 group-hover:text-white/20 transition-all duration-300 ease-in-out" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-semibold">
                    {project.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-white font-bold leading-snug">
                    {project.vehicle}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{project.work}</p>
                  <p className="text-gray-300 text-sm italic mt-3 pt-3 border-t border-white/10">
                    {project.result}
                  </p>
                </div>
              </div>
            </ZoomIn>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() =>
                setVisibleCount((c) =>
                  Math.min(c + LOAD_MORE_STEP, filteredProjects.length)
                )
              }
              className="spin-btn spin-btn-red inline-flex items-center gap-2 px-8 h-14 text-white font-semibold text-sm sm:text-base rounded-xl"
            >
              <span className="flex items-center gap-2">
                See More Projects
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
