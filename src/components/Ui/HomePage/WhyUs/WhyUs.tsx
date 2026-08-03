import { Wind, Layers, Target, MapPin, Eye, Home } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";

const reasons = [
  {
    icon: Wind,
    title: "Dust-Free Paint Booth",
    description:
      "A professional, dust-free booth with a controlled curing system for a flawless finish.",
  },
  {
    icon: Layers,
    title: "High-Grade Materials",
    description:
      "Only high-grade automotive paint and materials — no shortcuts.",
  },
  {
    icon: Target,
    title: "Precision-First Technicians",
    description:
      "Skilled technicians who bring a precision-first approach to every job.",
  },
  {
    icon: MapPin,
    title: "Trusted Nationwide",
    description: "Trusted by customers across Bangladesh, not just Dhaka.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "A transparent process — see every stage of the work.",
  },
  {
    icon: Home,
    title: "Home Service Available",
    description:
      "Select services, like ceramic tinting, available at your doorstep inside Dhaka.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-20 md:py-28 bg-surface-2 border-t border-white/5"
    >
      <div className="container">
        <SlideUp className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Why Choose AutoXCustoms
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Quick reasons customers trust the shop over the competition.
          </p>
        </SlideUp>

        <ZoomIn className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-red-600/50 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <div className="w-12 h-12 rounded-full bg-red-600/15 flex items-center justify-center text-red-500">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-lg mt-5">{title}</h3>
              <p className="text-gray-400 text-sm mt-2">{description}</p>
            </div>
          ))}
        </ZoomIn>
      </div>
    </section>
  );
}
