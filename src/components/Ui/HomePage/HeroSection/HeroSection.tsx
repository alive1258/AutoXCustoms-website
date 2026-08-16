"use client";

import {
  ArrowRight,
  Wrench,
  Car,
  Star,
  ShieldCheck,
  BadgeCheck,
  PackageCheck,
  ChevronDown,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import { useGetActiveHeroQuery } from "@/src/redux/api/heroApi";
import { resolveStatIcon } from "@/src/utils/statIconMap";

const defaultTrustStats = [
  { icon: FaFacebook, value: "8.9K+", label: "Facebook Followers" },
  { icon: Wrench, value: "10+", label: "Years Experience" },
  { icon: Car, value: "500+", label: "Vehicles Restored & Serviced" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Money-Back Guarantee" },
  { icon: BadgeCheck, label: "Certified Technicians" },
  { icon: PackageCheck, label: "Genuine Parts Only" },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: y, behavior: "smooth" });
};

const handleCtaClick = (link?: string) => {
  if (!link) return;
  if (link.startsWith("#")) {
    scrollToSection(link.slice(1));
  } else {
    window.location.href = link;
  }
};

export default function Hero() {
  const { data } = useGetActiveHeroQuery();
  const hero = data?.data;

  const badge = hero?.badge || "Dhaka's Premium Auto Detailing Studio";
  const title = hero?.title || "Where Machines Become Art";
  const description =
    hero?.description ||
    "Premium Auto Detailing, Restoration & Customization in Dhaka";
  const backgroundImage = hero?.image || "/images/hero-bg.jpg";
  const primaryButtonText = hero?.primary_button_text || "Book a Service";
  const primaryButtonLink = hero?.primary_button_link || "#contact";
  const secondaryButtonText = hero?.secondary_button_text || "View Our Work";
  const secondaryButtonLink = hero?.secondary_button_link || "#portfolio";
  const ratingLabel = hero?.rating_label || "See what our customers say";
  const trustStats =
    hero?.stats && hero.stats.length > 0
      ? hero.stats.map((s) => ({
          icon: resolveStatIcon(s.icon),
          value: s.value,
          label: s.label,
        }))
      : defaultTrustStats;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-surface-1 pt-24 pb-28 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/50 to-black" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-700/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-red-700/20 rounded-full blur-3xl" />

      <div className="container z-10 w-full">
        <SlideUp className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs sm:text-sm text-gray-300 mb-6">
            <Star className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            {badge}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-white">
            {title}
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mt-6 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleCtaClick(primaryButtonLink)}
              className="spin-btn spin-btn-red px-8 sm:px-10 h-14 text-white font-semibold text-sm sm:text-base rounded-xl"
            >
              <span className="flex items-center gap-2">
                {primaryButtonText}
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>

            {secondaryButtonText && (
              <button
                onClick={() => handleCtaClick(secondaryButtonLink)}
                className="inline-flex items-center px-8 sm:px-10 h-14 text-white font-semibold text-sm sm:text-base rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300 ease-in-out"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-400"
              >
                <Icon className="w-4 h-4 text-red-500" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-8 sm:gap-12">
            {trustStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-white leading-none">
                    {value}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("reviews")}
            className="inline-flex items-center gap-2 mt-8 text-sm text-gray-400 hover:text-red-400 transition-all duration-300 ease-in-out"
          >
            <span className="flex items-center gap-0.5 text-red-500">
              <Star className="w-3.5 h-3.5 fill-red-500" />
              <Star className="w-3.5 h-3.5 fill-red-500" />
              <Star className="w-3.5 h-3.5 fill-red-500" />
              <Star className="w-3.5 h-3.5 fill-red-500" />
              <Star className="w-3.5 h-3.5 fill-red-500" />
            </span>
            {ratingLabel}
          </button>
        </SlideUp>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to explore"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-gray-400 hover:text-white transition-all duration-300 ease-in-out animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
