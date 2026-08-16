"use client";

import Image from "next/image";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { useGetActiveGalleryItemsQuery } from "@/src/redux/api/galleryApi";

const defaultPhotos = [
  "/images/photogallery/711618250_122124873471227008_474043552845203726_n.jpg",
  "/images/photogallery/711618810_122124874491227008_3953375464654191192_n.jpg",
  "/images/photogallery/711688084_122124873843227008_8421712796164015588_n.jpg",
  "/images/photogallery/711828632_122124873315227008_3511051440768778883_n.jpg",
  "/images/photogallery/712644061_122124874437227008_4138141654898738221_n.jpg",
  "/images/photogallery/712704443_122124873897227008_3917003832173102482_n.jpg",
  "/images/photogallery/712724080_122124873411227008_6232902889378561604_n.jpg",
  "/images/photogallery/713443576_122124874347227008_2154145902622217742_n.jpg",
  "/images/photogallery/713623964_122124874257227008_6974986842804734865_n.jpg",
  "/images/photogallery/713624156_122124873393227008_4538086605288558472_n.jpg",
  "/images/photogallery/713725552_122124874095227008_7405238677985498670_n.jpg",
  "/images/photogallery/713743960_122124874407227008_2767146469800872885_n.jpg",
  "/images/photogallery/713754025_122124874263227008_2751855796821614709_n.jpg",
  "/images/photogallery/713824549_122124874179227008_7893470876602044218_n.jpg",
  "/images/photogallery/714410080_122124873819227008_6416341647019738695_n.jpg",
  "/images/photogallery/715441654_122124874329227008_134610840964038351_n.jpg",
  "/images/photogallery/716137762_122124873513227008_9095287441510608704_n.jpg",
  "/images/photogallery/716330623_122124874173227008_2263285198776086264_n.jpg",
  "/images/photogallery/716489986_122124876711227008_8912465878187645655_n.jpg",
  "/images/photogallery/723066955_122126306061227008_7712393512489932894_n.jpg",
];

const PhotoGallery = () => {
  const { data } = useGetActiveGalleryItemsQuery();
  const fetchedPhotos = (data?.data || []).flatMap((item) => item.images || []);
  const photos = fetchedPhotos.length > 0 ? fetchedPhotos : defaultPhotos;
  const isRemote = fetchedPhotos.length > 0;

  return (
    <section id="photos" className="py-20 bg-surface-2 overflow-hidden">
      <SlideUp className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-linear-to-r from-surface-2 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-linear-to-l from-surface-2 to-transparent z-10" />

        <div className="flex w-max animate-scroll-right">
          {[...photos, ...photos].map((src, idx) => (
            <div
              key={`${src}-${idx}`}
              className="relative w-40 h-40 sm:w-80 sm:h-72 mx-2.5 sm:mx-3 shrink-0 rounded-2xl overflow-hidden border border-white/10"
            >
              <Image
                src={src}
                alt="AutoXCustoms workshop"
                fill
                sizes="(min-width: 640px) 192px, 160px"
                className=""
                unoptimized={isRemote}
              />
            </div>
          ))}
        </div>
      </SlideUp>
    </section>
  );
};

export default PhotoGallery;
