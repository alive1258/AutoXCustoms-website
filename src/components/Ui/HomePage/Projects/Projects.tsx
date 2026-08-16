"use client";

import { useState } from "react";
import { Car, ChevronDown, Loader2 } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import { useGetActiveProjectsQuery } from "@/src/redux/api/projectApi";
import { ProjectCategory } from "@/src/types/projectType";

const categories = [
  "All",
  "Paint",
  "Restoration",
  "Detailing",
  "Mechanical",
  "Accessories",
] as const;

type Category = (typeof categories)[number];

const PAGE_SIZE = 6;
const LOAD_MORE_STEP = 3;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { data, isLoading } = useGetActiveProjectsQuery();
  const projects = data?.data || [];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === (activeCategory as ProjectCategory));

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const selectCategory = (category: Category) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  if (!isLoading && projects.length === 0) {
    return null;
  }

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

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          </div>
        ) : (
          <>
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
                <ZoomIn key={project.id}>
                  <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/50 hover:-translate-y-1 transition-all duration-300 ease-in-out">
                    <div
                      className="relative h-48 bg-cover bg-center bg-[#111] flex items-center justify-center"
                      style={
                        project.image
                          ? { backgroundImage: `url(${project.image})` }
                          : undefined
                      }
                    >
                      {!project.image && (
                        <Car className="w-10 h-10 text-white/10 group-hover:text-white/20 transition-all duration-300 ease-in-out" />
                      )}
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
                      Math.min(c + LOAD_MORE_STEP, filteredProjects.length),
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
          </>
        )}
      </div>
    </section>
  );
}
