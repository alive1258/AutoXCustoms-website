import Image from "next/image";
import {
  MapPin,
  SprayCan,
  Wrench,
  Sparkles,
  Quote,
  Car,
  Award,
} from "lucide-react";
import SlideLeft from "@/src/components/Common/Animaation/SlideLeft";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";

const pillars = [
  { icon: SprayCan, label: "Paint" },
  { icon: Wrench, label: "Restoration" },
  { icon: Sparkles, label: "Customization" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 md:py-28 bg-surface-1 overflow-hidden"
    >
      <div className="absolute -top-16 -left-16 w-64 h-64 sm:-top-24 sm:-left-24 sm:w-80 sm:h-80 bg-red-700/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 sm:-bottom-24 sm:-right-24 sm:w-80 sm:h-80 bg-red-700/10 rounded-full blur-3xl" />

      <div className="container z-10">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <SlideLeft>
            <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
              About AutoXCustoms
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 leading-tight">
              Craftsmanship Behind Every Finish
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mt-6">
              AutoXCustoms is a Dhaka-based workshop specializing in paint,
              restoration, and customization. Every vehicle that comes through
              our bay is treated as a craft project, not a queue number — built
              with the patience and precision that turn a good job into a
              lasting one.
            </p>

            <div className="mt-8 border-l-2 border-red-600 pl-5 sm:pl-6 relative">
              <Quote className="w-6 h-6 text-red-600/40 absolute -left-3 -top-1 bg-surface-1" />
              <p className="text-white text-lg sm:text-xl font-medium leading-relaxed italic">
                A proper paint job isn&apos;t just color — it&apos;s
                preparation, the right materials, and a factory-grade finish.
              </p>
            </div>

            <div className="mt-8 flex items-start gap-3 text-gray-300">
              <Car className="w-5 h-5 text-red-500 mt-1 shrink-0" />
              <p>
                Our work speaks for itself — clients regularly travel from
                outside Dhaka, including as far as{" "}
                <span className="text-white font-medium">Kushtia</span>, to have
                their vehicles serviced with us.
              </p>
            </div>
          </SlideLeft>

          <SlideRight delay={2}>
            <div className="relative">
              <div className="relative h-72 sm:h-96 lg:h-[26rem] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/images/services/diagnostics.jpg"
                  alt="AutoXCustoms technician servicing a vehicle"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-surface-1 via-black/10 to-transparent" />
                <p className="absolute bottom-4 left-5 right-5 text-white text-sm font-medium">
                  Precision servicing, every vehicle, every time.
                </p>
              </div>

              <div className="absolute -bottom-6 -left-4 sm:-left-6 flex items-center gap-3 bg-surface-2 border border-white/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-xl shadow-black/40">
                <div className="w-11 h-11 rounded-full bg-red-600/15 flex items-center justify-center text-red-500 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold leading-none">
                    10+ Years
                  </p>
                  <p className="text-gray-400 text-xs mt-1 whitespace-nowrap">
                    Trusted Experience
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 mt-10 sm:mt-9">
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {pillars.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center gap-2 py-3 px-1 rounded-xl border border-white/10 bg-white/5"
                  >
                    <div className="w-9 h-9 rounded-full bg-red-600/15 flex items-center justify-center text-red-500 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-white text-xs sm:text-sm font-semibold leading-snug">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="w-9 h-9 rounded-full bg-red-600/15 flex items-center justify-center text-red-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Baganbari, Meradia, Banasree, Dhaka
                  </p>
                  <a
                    href="#location"
                    className="inline-block text-red-500 hover:text-red-400 text-sm font-medium mt-1 transition-all duration-300 ease-in-out"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </SlideRight>
        </div>
      </div>
    </section>
  );
}
