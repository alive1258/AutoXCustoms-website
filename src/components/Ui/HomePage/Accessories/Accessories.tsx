import {
  Flower2,
  KeyRound,
  MonitorSmartphone,
  Lightbulb,
  Droplets,
  ArrowRight,
} from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";

const accessories = [
  { icon: Flower2, label: "Car Perfumes" },
  { icon: KeyRound, label: "Key Fobs" },
  { icon: MonitorSmartphone, label: "Android Head Units" },
  { icon: Lightbulb, label: "Ambient Lighting" },
  { icon: Droplets, label: "Car Care Products" },
];

export default function Accessories() {
  return (
    <section
      id="accessories"
      className="py-20 md:py-28 bg-surface-1 border-t border-white/5"
    >
      <div className="container">
        <SlideUp className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
            Add-ons
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Interior Accessories &amp; Add-ons
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Make your ride smarter, cleaner, and more comfortable.
          </p>
        </SlideUp>

        <SlideUp className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {accessories.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-red-600/50 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <div className="w-14 h-14 rounded-full bg-red-600/15 flex items-center justify-center text-red-500">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-white font-semibold text-sm">{label}</span>
            </div>
          ))}
        </SlideUp>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out shadow-lg shadow-red-900/30"
          >
            Ask About Accessories
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
