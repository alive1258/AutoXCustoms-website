import Image from "next/image";
import {
  Wrench,
  Clock,
  ShieldCheck,
  Settings,
  PackageCheck,
  Banknote,
  Zap,
  Users,
  ThumbsUp,
  HardHat,
} from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import SlideLeft from "@/src/components/Common/Animaation/SlideLeft";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";

const leftFeatures = [
  {
    icon: Wrench,
    title: "Experienced Mechanics",
    description:
      "We bring the technical knowledge and hands-on ability that only comes from years of practice.",
  },
  {
    icon: Clock,
    title: "24/7 Quality Service",
    description:
      "Our skilled technicians arrive equipped with the right tools and expertise, any time you need us.",
  },
  {
    icon: PackageCheck,
    title: "Genuine Parts & Materials",
    description:
      "Only trusted brands and OEM-grade parts go into your vehicle — no shortcuts, no knockoffs.",
  },
  {
    icon: Banknote,
    title: "Transparent Pricing",
    description:
      "A clear quote before we start, so there are no surprise charges when you pick up your car.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Efficient workflows mean your vehicle is back on the road without unnecessary delays.",
  },
];

const rightFeatures = [
  {
    icon: ShieldCheck,
    title: "Money Back Guarantee",
    description:
      "We diagnose every vehicle thoroughly to pinpoint the problem, backed by a money-back guarantee.",
  },
  {
    icon: Settings,
    title: "Quality Equipment",
    description:
      "Choosing the right equipment for your vehicle is what separates a proper repair from a temporary fix.",
  },
  {
    icon: Users,
    title: "Certified Technicians",
    description:
      "A team trained on modern and classic vehicles alike, so every job gets the right approach.",
  },
  {
    icon: ThumbsUp,
    title: "Customer-First Approach",
    description:
      "We walk you through every finding and option before any work begins — your call, always.",
  },
  {
    icon: HardHat,
    title: "Strict Safety Standards",
    description:
      "Every repair follows proper safety protocol, protecting both your vehicle and our team.",
  },
];

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="relative py-20 md:py-28 bg-surface-2 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-red-700/10 rounded-full blur-3xl" />

      <div className="container z-10">
        <SlideUp className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Vehicles Trust Our Hands
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            The people, tools, and standards behind every job we take on.
          </p>
        </SlideUp>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-6 items-center">
          <SlideLeft className="order-2 lg:order-1 space-y-8">
            {leftFeatures.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/15 flex items-center justify-center text-red-500 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{title}</h3>
                  <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </SlideLeft>

          <ZoomIn className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-56 sm:w-72 lg:w-full aspect-[396/905] max-w-xs">
              <Image
                src="/images/services/car.png"
                alt="Technical wireframe of a vehicle"
                fill
                sizes="(min-width: 1024px) 320px, 288px"
                className="object-contain drop-shadow-[0_0_40px_rgba(190,26,104,0.25)]"
              />
            </div>
          </ZoomIn>

          <SlideRight className="order-3 lg:order-3 space-y-8" delay={2}>
            {rightFeatures.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-4 lg:flex-row-reverse lg:text-right"
              >
                <div className="w-12 h-12 rounded-xl bg-red-600/15 flex items-center justify-center text-red-500 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{title}</h3>
                  <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </SlideRight>
        </div>
      </div>
    </section>
  );
}
