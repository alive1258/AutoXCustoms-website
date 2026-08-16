"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Play, ChevronDown } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";
import { useGetAllVideoGallariesQuery } from "@/src/redux/api/videoGallaryApi";
import { useGetAllVideoGalleryCategoriesQuery } from "@/src/redux/api/videoGallaryCategoryApi";
import { extractYoutubeId } from "@/src/utils/youtube";

const defaultCategories = [
  "All",
  "Paint Jobs",
  "Restorations",
  "Engine Work",
  "Detailing",
  "Accessories",
] as const;

type Reel = { category: string; youtubeId: string };

const defaultReels: Reel[] = [
  { category: "Paint Jobs", youtubeId: "1visjcVXXtM" },
  { category: "Paint Jobs", youtubeId: "9VQfJQU6S9U" },
  { category: "Paint Jobs", youtubeId: "CmeyAlIT7uc" },
  { category: "Paint Jobs", youtubeId: "rj-wJxkdwb4" },
  { category: "Restorations", youtubeId: "_x7QPr_SqZo" },
  { category: "Restorations", youtubeId: "cTyTff9G_Ys" },
  { category: "Restorations", youtubeId: "Tvf-F7ykjc8" },
  { category: "Restorations", youtubeId: "FTp9JHQoYZM" },
  { category: "Engine Work", youtubeId: "hqFp3syfluc" },
  { category: "Engine Work", youtubeId: "TmwNpAYGqvc" },
  { category: "Engine Work", youtubeId: "AGPlhGhUX4I" },
  { category: "Engine Work", youtubeId: "VP6HNc-jJHg" },
  { category: "Detailing", youtubeId: "Q4s2vzkCecE" },
  { category: "Detailing", youtubeId: "vnDyhEIxwrc" },
  { category: "Detailing", youtubeId: "VPL7MHinzTY" },
  { category: "Detailing", youtubeId: "S8oM85Csv9Y" },
  { category: "Accessories", youtubeId: "PNhlIt2ObeU" },
  { category: "Accessories", youtubeId: "jaksVuR01As" },
  { category: "Accessories", youtubeId: "tzKMRfoOnKg" },
  { category: "Accessories", youtubeId: "K0RpT-fRqDc" },
];

const PAGE_SIZE = 6;
const LOAD_MORE_STEP = 3;

function VideoModal({
  youtubeId,
  onClose,
}: {
  youtubeId: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6"
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 border border-white/20 flex items-center justify-center text-white transition-all duration-300 ease-in-out z-10"
      >
        <X className="w-5 h-5" />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
        style={{ aspectRatio: "16 / 9" }}
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  const { data: categoryData } = useGetAllVideoGalleryCategoriesQuery({
    limit: 100,
  });
  const { data: videoData } = useGetAllVideoGallariesQuery({
    is_active: true,
    limit: 100,
  });

  const fetchedCategories = (categoryData?.data || []).filter(
    (c) => c.is_active !== false,
  );
  const fetchedVideos = videoData?.data || [];

  const reels: Reel[] = useMemo(() => {
    if (fetchedVideos.length === 0) return defaultReels;

    return fetchedVideos
      .map((v) => ({
        category: v.videoGallaryCategory?.title || "Uncategorized",
        youtubeId: extractYoutubeId(v.video_url),
      }))
      .filter((r): r is Reel => Boolean(r.youtubeId));
  }, [fetchedVideos]);

  const categories: string[] =
    fetchedCategories.length > 0
      ? ["All", ...fetchedCategories.map((c) => c.title || "Uncategorized")]
      : [...defaultCategories];

  const filteredReels =
    activeCategory === "All"
      ? reels
      : reels.filter((r) => r.category === activeCategory);

  const visibleReels = filteredReels.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReels.length;

  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-surface-2">
      <div className="container">
        <SlideUp className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
            Live Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Video Showcase
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Real reels from the workshop floor — see the craft in motion.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {visibleReels.map((reel) => (
            <ZoomIn key={reel.youtubeId}>
              <button
                onClick={() => setOpenVideoId(reel.youtubeId)}
                aria-label="Play video"
                className="group relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-[#111] bg-cover bg-center hover:border-red-600/50 transition-all duration-300 ease-in-out"
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg)`,
                }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 ease-in-out" />

                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-red-600/90 group-hover:border-red-600 group-hover:scale-110 transition-all duration-300 ease-in-out">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </span>
                </span>
              </button>
            </ZoomIn>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() =>
                setVisibleCount((c) =>
                  Math.min(c + LOAD_MORE_STEP, filteredReels.length)
                )
              }
              className="spin-btn spin-btn-red inline-flex items-center gap-2 px-8 h-14 text-white font-semibold text-sm sm:text-base rounded-xl"
            >
              <span className="flex items-center gap-2">
                See More Videos
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>
          </div>
        )}
      </div>

      {openVideoId && (
        <VideoModal
          youtubeId={openVideoId}
          onClose={() => setOpenVideoId(null)}
        />
      )}
    </section>
  );
}
