import { Star } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";

const testimonials = [
  {
    text: "The paint job came out better than I expected — factory finish, no orange peel anywhere. Worth every taka.",
    author: "Rafiqul I.",
    vehicle: "Toyota Auris 2016",
  },
  {
    text: "I traveled all the way from Kushtia for the restoration and it was 100% worth it. My Camry Vista looks brand new.",
    author: "Shirin A.",
    vehicle: "Toyota Camry Vista 1995",
  },
  {
    text: "They kept me updated at every stage — no surprises, no shortcuts. That's rare in this industry.",
    author: "Tanvir H.",
    vehicle: "Toyota Corolla AE110",
  },
  {
    text: "The ceramic tinting and cabin sound damping completely changed how the car feels to drive.",
    author: "Mahin K.",
    vehicle: "Nissan March",
  },
  {
    text: "Professional team, dust-free booth, real transparency. This is how a workshop should be run.",
    author: "Farhana R.",
    vehicle: "Honda Civic 10th Gen",
  },
  {
    text: "Booked the polishing package and the mirror finish exceeded expectations. Already recommended them to my brother.",
    author: "Imran S.",
    vehicle: "Toyota Corolla Fielder 2020",
  },
];

const StarRow = () => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-4 h-4 text-red-500 fill-red-500" />
    ))}
  </div>
);

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="py-20 md:py-28 bg-surface-1 border-t border-white/5"
    >
      <div className="container">
        <SlideUp className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
            Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Our real measure of success isn&apos;t delivery day — it&apos;s how
            happy customers still are months later.
          </p>
        </SlideUp>

        <ZoomIn className="flex items-center justify-center gap-6 sm:gap-10 max-w-xl mx-auto mb-14 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-extrabold text-white leading-none">
              4.9
            </p>
            <div className="flex justify-center mt-2">
              <StarRow />
            </div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="flex items-center gap-3 text-gray-300">
            <div className="w-10 h-10 rounded-full bg-[#1877F2]/15 flex items-center justify-center text-[#1877F2] shrink-0">
              <FaFacebook className="w-5 h-5" />
            </div>
            <p className="text-sm">
              Based on <span className="text-white font-semibold">200+</span>
              <br />
              Facebook reviews
            </p>
          </div>
        </ZoomIn>

        <ZoomIn className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-red-600/50 transition-all duration-300 ease-in-out"
            >
              <StarRow />
              <p className="text-gray-300 text-sm leading-relaxed mt-4 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-red-600/15 flex items-center justify-center text-red-500 font-bold text-sm shrink-0">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.author}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.vehicle}</p>
                </div>
              </div>
            </div>
          ))}
        </ZoomIn>
      </div>
    </section>
  );
}
