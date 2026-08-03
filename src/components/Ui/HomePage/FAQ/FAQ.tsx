"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Wrench } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import SlideLeft from "@/src/components/Common/Animaation/SlideLeft";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";

const faqs = [
  {
    question: "How long does a full respray take?",
    answer:
      "A full respray typically takes 5-7 working days depending on the vehicle's condition and color. We'll give you an honest, specific timeline after the initial inspection — not a generic estimate.",
  },
  {
    question: "Do you offer a warranty on paint and restoration work?",
    answer:
      "Yes. All paint, body, and restoration work comes with a workmanship warranty. If something isn't right, you bring it back and we fix it — no extra charge.",
  },
  {
    question: "Can I get a free quote before booking?",
    answer:
      "Absolutely. Send us your vehicle details and photos through the contact form or call us directly, and we'll give you a clear quote before any work starts.",
  },
  {
    question: "Do you handle insurance claim repairs?",
    answer:
      "Yes, we regularly work with customers on insurance-covered collision and body repairs. We can provide the documentation and itemized estimates your insurer typically requires.",
  },
  {
    question: "Can you match my car's exact factory color?",
    answer:
      "Yes — color matching is done using your vehicle's factory paint code combined with an on-site spray test, so the final panel blends seamlessly with the rest of the car.",
  },
  {
    question: "Do you offer pickup and drop-off?",
    answer:
      "For customers within Dhaka, we can arrange vehicle pickup and drop-off for most services. Ask us when booking and we'll confirm availability for your area.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, bKash, Nagad, and bank transfer. For larger restoration jobs, we can also arrange a milestone-based payment schedule.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 md:py-28 bg-surface-1 border-t border-white/5"
    >
      <div className="container">
        <SlideUp className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Straight answers to what customers ask us most before booking.
          </p>
        </SlideUp>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <SlideLeft className="relative h-80 sm:h-[26rem] lg:h-[32rem] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/images/hero-bg.jpg"
              alt="Inside the AutoXCustoms workshop"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-black/10" />

            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10">
              <span className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 shrink-0">
                <Wrench className="w-5 h-5" />
              </span>
              <div>
                <p className="text-white font-semibold text-sm">
                  Still have a question?
                </p>
                <a
                  href="#contact"
                  className="text-red-500 hover:text-red-400 text-sm font-medium transition-all duration-300 ease-in-out"
                >
                  Ask us directly →
                </a>
              </div>
            </div>
          </SlideLeft>

          <SlideRight className="space-y-4" delay={2}>
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="border border-white/10 bg-white/5 rounded-xl overflow-hidden hover:border-red-600/50 transition-all duration-300 ease-in-out"
                >
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex justify-between items-center gap-4 p-4 sm:p-5 text-left"
                  >
                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      {faq.question}
                    </h3>
                    <span className="w-8 h-8 rounded-full bg-red-600/15 flex items-center justify-center text-red-500 shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </SlideRight>
        </div>
      </div>
    </section>
  );
}
