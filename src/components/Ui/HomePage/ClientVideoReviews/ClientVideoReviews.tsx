"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Star, User, X } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { useGetActiveClientVideoReviewsQuery } from "@/src/redux/api/clientVideoReviewApi";
import { extractYoutubeId } from "@/src/utils/youtube";

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
        className="w-full max-w-sm sm:max-w-md rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
        style={{ aspectRatio: "9 / 16" }}
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

export default function ClientVideoReviews() {
  const { data } = useGetActiveClientVideoReviewsQuery();
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  const reviews = (data?.data || [])
    .map((r) => ({ ...r, youtubeId: extractYoutubeId(r.video_url) }))
    .filter((r) => r.youtubeId);

  if (reviews.length === 0) {
    return null;
  }

  // Duplicated for a seamless, continuous marquee loop.
  const loopedReviews = [...reviews, ...reviews];

  return (
    <section id="video-reviews" className="py-20 md:py-28 bg-surface-1 overflow-hidden">
      <div className="container">
        <SlideUp className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
            In Their Own Words
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Client Video Reviews
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Real customers, real results — straight from the driver&apos;s seat.
          </p>
        </SlideUp>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-linear-to-r from-surface-1 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-linear-to-l from-surface-1 to-transparent z-10" />

        <div className="flex w-max animate-scroll-right">
          {loopedReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="group w-56 sm:w-64 mx-2.5 sm:mx-3 shrink-0"
            >
              <button
                onClick={() => setOpenVideoId(review.youtubeId)}
                aria-label={`Play video review from ${review.name}`}
                className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#111] bg-cover bg-center hover:border-red-600/50 transition-all duration-300 ease-in-out"
                style={{
                  aspectRatio: "9 / 16",
                  backgroundImage: `url(https://img.youtube.com/vi/${review.youtubeId}/hqdefault.jpg)`,
                }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/60 transition-all duration-300 ease-in-out" />

                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-red-600/90 group-hover:border-red-600 group-hover:scale-110 transition-all duration-300 ease-in-out">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </span>
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center shrink-0">
                      {review.image ? (
                        <Image
                          src={review.image}
                          alt={review.name}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      ) : (
                        <User className="w-4 h-4 text-gray-300" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-semibold truncate">
                        {review.name}
                      </p>
                      {review.designation && (
                        <p className="text-gray-300 text-xs truncate">
                          {review.designation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? "text-red-500 fill-red-500"
                            : "text-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {openVideoId && (
        <VideoModal youtubeId={openVideoId} onClose={() => setOpenVideoId(null)} />
      )}
    </section>
  );
}
