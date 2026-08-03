import {
  SearchCheck,
  ShieldCheck,
  SprayCan,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";

const steps = [
  {
    icon: SearchCheck,
    title: "Inspection & Diagnosis",
    description: "A full vehicle check before any work begins.",
    highlights: [],
  },
  {
    icon: ShieldCheck,
    title: "Preparation",
    description: "Proper body prep, done right from the start.",
    highlights: ["Proper body prep", "Minimal putty", "Rust treatment"],
  },
  {
    icon: SprayCan,
    title: "Paint Booth / Workshop Work",
    description: "Controlled conditions for a factory-grade result.",
    highlights: [
      "Dust-free booth",
      "High-grade paint",
      "Sikkens Hardener",
      "Heater curing system",
    ],
  },
  {
    icon: Sparkles,
    title: "Finishing",
    description: "Layered polishing for a true mirror finish.",
    highlights: ["Rough polish", "Shine polish", "Final mirror polish"],
  },
  {
    icon: CheckCircle2,
    title: "Quality Check & Delivery",
    description: "A final inspection with the customer before handover.",
    highlights: [],
  },
];

function StepCard({ step }: { step: (typeof steps)[number] }) {
  return (
    <div className="group bg-white/4 border border-white/10 rounded-2xl p-6 sm:p-7 hover:border-red-600/50 hover:bg-white/6 transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-600/15 flex items-center justify-center text-red-500 shrink-0 group-hover:bg-red-600/25 transition-all duration-300 ease-in-out">
          <step.icon className="w-5 h-5" />
        </div>
        <h3 className="text-white font-bold text-lg sm:text-xl">
          {step.title}
        </h3>
      </div>
      <p className="text-gray-400 mt-3">{step.description}</p>

      {step.highlights.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-5">
          {step.highlights.map((highlight, hIdx) => (
            <span key={highlight} className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 whitespace-nowrap">
                {highlight}
              </span>
              {hIdx < step.highlights.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-red-600/60 shrink-0" />
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-20 md:py-28 bg-surface-1 overflow-hidden"
    >
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-700/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-700/10 rounded-full blur-3xl" />

      <div className="container">
        <SlideUp className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-red-500 font-semibold text-xs sm:text-sm tracking-wide uppercase">
            How We Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4">
            Our Process
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            The discipline behind every finish, not just the results.
          </p>
        </SlideUp>

        <SlideUp className="relative max-w-5xl mx-auto">
          {/* center connecting line — desktop */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-7 bottom-7 w-px bg-linear-to-b from-transparent via-red-600/30 to-transparent" />
          {/* connecting line — mobile */}
          <div className="lg:hidden absolute left-6 sm:left-7 top-7 bottom-7 w-px bg-white/10" />

          <div className="space-y-10 lg:space-y-14">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={step.title} className="relative">
                  {/* number node */}
                  <div className="absolute left-0 top-0 lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-red-500 to-red-700 text-white font-bold flex items-center justify-center z-10 shadow-lg shadow-red-900/40 ring-4 ring-black">
                    {idx + 1}
                  </div>

                  {/* mobile: single column */}
                  <div className="lg:hidden pl-16 sm:pl-20">
                    <StepCard step={step} />
                  </div>

                  {/* desktop: alternating sides */}
                  <div className="hidden lg:flex lg:items-center lg:gap-8">
                    <div className="lg:w-1/2">
                      {isEven ? (
                        <StepCard step={step} />
                      ) : (
                        <div aria-hidden className="h-full" />
                      )}
                    </div>
                    <div className="lg:w-1/2">
                      {!isEven ? (
                        <StepCard step={step} />
                      ) : (
                        <div aria-hidden className="h-full" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
