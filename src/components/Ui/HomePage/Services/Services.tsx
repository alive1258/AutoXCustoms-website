import Image from "next/image";
import {
  SprayCan,
  Wrench,
  Sparkles,
  Lightbulb,
  Gauge,
  Shield,
  ArrowRight,
} from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";

const services = [
  {
    icon: SprayCan,
    image: "/images/services/paint-body.jpg",
    title: "Paint & Body",
    description:
      "Showroom-grade finishes and structural repair, from full respray to collision recovery.",
    items: [
      "Full repaint & custom color change",
      "Paint booth premium paint jobs",
      "Body kit installation (GT, Modellista)",
      "Dent repair & rust treatment",
    ],
  },
  {
    icon: Wrench,
    image: "/images/services/restoration.jpg",
    title: "Restoration",
    description:
      "Ground-up rebuilds that bring classic and worn vehicles back to their best.",
    items: [
      "Complete vehicle restoration (body, mechanical, interior)",
      "Engine overhauling & replacement",
      "Suspension & brake overhauling",
      "Interior re-trimming & upholstery",
    ],
  },
  {
    icon: Sparkles,
    image: "/images/services/detailing.jpg",
    title: "Detailing & Protection",
    description:
      "Precision finishing and protection that keeps your vehicle looking factory-fresh.",
    items: [
      "Professional polishing & detailing",
      "Ceramic window tinting",
      "Premium cabin sound damping (Nakamichi)",
      "Paint correction & swirl removal",
    ],
  },
  {
    icon: Lightbulb,
    image: "/images/services/upgrades.jpg",
    title: "Upgrades & Accessories",
    description:
      "Modern upgrades that add style, comfort, and convenience to your ride.",
    items: [
      "Laser projection headlight upgrades",
      "Interior accessories (perfumes, key fobs)",
      "Android players",
      "Ambient lighting",
    ],
  },
  {
    icon: Gauge,
    image: "/images/services/diagnostics.jpg",
    title: "Diagnostics & Mechanical Repair",
    description:
      "Thorough inspection and repair to keep your vehicle running right.",
    items: [
      "Full inspection & diagnosis",
      "Mount / bushing / oil-leak repair",
      "Battery & electrical system check",
      "Brake & fluid service",
    ],
  },
  {
    icon: Shield,
    image: "/images/services/wraps.jpg",
    title: "Wraps & Paint Protection",
    description:
      "Change your look or shield your finish, without ever touching the factory paint.",
    items: [
      "Vinyl wrap & color change",
      "Paint protection film (PPF)",
      "Chrome delete & trim wrap",
      "Matte / gloss finish options",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-surface-1 border-t border-white/5"
    >
      <div className="container">
        <SlideUp className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Our Services
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            A clear menu of everything AutoXCustoms offers, grouped by category.
          </p>
        </SlideUp>

        <ZoomIn className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, image, title, description, items }) => (
            <div
              key={title}
              className="flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/50 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full bg-black/60 backdrop-blur border border-white/10 flex items-center justify-center text-red-500">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="flex flex-col grow p-6 sm:p-7">
                <h3 className="text-white text-xl font-bold">{title}</h3>
                <p className="text-gray-400 text-sm mt-2">{description}</p>

                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-gray-300 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-400 font-medium text-sm mt-6 pt-5 border-t border-white/10 transition-all duration-300 ease-in-out"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </ZoomIn>
      </div>
    </section>
  );
}
