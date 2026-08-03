"use client"
import React from "react";
import {  Sparkles } from "lucide-react";
import Image from "next/image";

const CreativesSection: React.FC = () => {
    const scrollToCheckout = () => {

    const checkoutSection = document.getElementById("checkout-section");
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-purple-900/5 rounded-full blur-xl sm:blur-2xl lg:blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-pink-900/5 rounded-full blur-xl sm:blur-2xl lg:blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-32 sm:w-48 md:w-56 lg:w-64 h-32 sm:h-48 md:h-56 lg:h-64 bg-blue-900/5 rounded-full blur-xl sm:blur-2xl lg:blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_2px),linear-gradient(to_bottom,#4f46e5_1px,transparent_2px)] bg-size-[30px_30px] sm:bg-size-[45px_45px] lg:bg-size-[60px_60px] opacity-[0.015] sm:opacity-[0.02]"></div>

      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-full border border-gray-700/50 backdrop-blur-sm mb-6 sm:mb-8 group hover:border-purple-500/50 transition-all duration-500">
            <div className="flex items-center gap-2">
              <div className="p-1.5 sm:p-2 rounded-lg bg-linear-to-r from-purple-600 to-pink-600">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-white font-semibold text-sm sm:text-base md:text-lg">
                AI Creative Suite
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              Creatives
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 px-4">
            Automated Creatives for Facebook That{" "}
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Actually Convert
              </span>
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-linear-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4">
            Stop spending hours creating ads manually. Our Meta Ad Creative
            Optimizer generates high-performing creatives instantly, while the
            Automated Ad Launch Tool deploys them across your campaigns. Track
            everything with real-time analytics.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-10 sm:mb-12 md:mb-14 lg:mb-16">
            {[
              { value: "300%", label: "Higher CTR", icon: "📈" },
              { value: "10x", label: "Faster Creation", icon: "⚡" },
              { value: "92%", label: "Accuracy Rate", icon: "🎯" },
              { value: "50+", label: "Creative Types", icon: "🎨" },
            ].map((stat, index) => (
              <div key={index} className="text-center min-w-[100px] sm:min-w-0">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-1.5 sm:mb-2">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1.5 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full relative card-wrapper overflow-hidden">
          <div className="card-content">
            <div className="p-3 border border-[#1f034d] rounded-xl sm:rounded-2xl md:rounded-3xl bg-[#350288]/10 overflow-hidden">
              <div className="relative w-full border border-gray-800 h-[330px] xs:h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[770px] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
                <Image
                  className="w-full h-full "
                  src="/images/dash1.avif"
                  alt="Dashboard Overview"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

         <div className="mt-8 flex justify-center">
          <button   onClick={scrollToCheckout} className="spin-btn px-12 h-16 text-white font-semibold text-base">
            <span>Order Now</span>
          </button>
        </div>

        
        <div className="mt-40">
          <div className="w-40 h-[3px] mx-auto relative">
            {/* Enhanced Top Glow Layer */}
            <div
              className="absolute -top-5 left-0 right-0 h-10 blur-2xl opacity-70"
              style={{
                background:
                  "linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6, #d946ef, #ec4899, #d946ef, #8b5cf6, #6366f1, #3b82f6)",
                borderRadius: "999px",
                animation: "glowWave 3s ease-in-out infinite",
              }}
            ></div>

            {/* Main Border with Enhanced Glow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #3b82f6, #6366f1, #8b5cf6, #d946ef, #ec4899)",
                boxShadow: `
          0 0 20px 4px rgba(59, 130, 246, 0.7),
          0 -6px 25px rgba(139, 92, 246, 0.9),
          inset 0 0 8px rgba(255, 255, 255, 0.4)
        `,
              }}
            >
              {/* Pulsing Core with Wave Effect */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                  animation: "pulseWave 2.5s ease-in-out infinite",
                  filter: "blur(0.5px)",
                }}
              ></div>
            </div>

            {/* Left 3 Dots - Moved Further Left */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center space-x-3">
              {[0, 0.15, 0.3].map((delay, i) => (
                <div
                  key={`left-${i}`}
                  className="w-1.5 h-1.5 rounded-full relative"
                  style={{
                    animation: `dotFloat 2s ease-in-out infinite ${delay}s`,
                  }}
                >
                  {/* Dot Core */}
                  <div className="absolute inset-0 bg-white rounded-full"></div>
                  {/* Dot Glow */}
                  <div
                    className="absolute inset-0 bg-white rounded-full blur-[3px] opacity-70 animate-pulse"
                    style={{ animationDelay: `${delay}s` }}
                  ></div>
                  {/* Outer Glow Ring */}
                  <div
                    className="absolute -inset-1 border border-white/30 rounded-full animate-ping"
                    style={{
                      animationDelay: `${delay}s`,
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Right 3 Dots - Moved Further Right */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex items-center space-x-3">
              {[0.1, 0.25, 0.4].map((delay, i) => (
                <div
                  key={`right-${i}`}
                  className="w-1.5 h-1.5 rounded-full relative"
                  style={{
                    animation: `dotFloat 2s ease-in-out infinite ${delay}s`,
                  }}
                >
                  {/* Dot Core */}
                  <div className="absolute inset-0 bg-white rounded-full"></div>
                  {/* Dot Glow */}
                  <div
                    className="absolute inset-0 bg-white rounded-full blur-[3px] opacity-70 animate-pulse"
                    style={{ animationDelay: `${delay}s` }}
                  ></div>
                  {/* Outer Glow Ring */}
                  <div
                    className="absolute -inset-1 border border-white/30 rounded-full animate-ping"
                    style={{
                      animationDelay: `${delay}s`,
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Additional Sparkle Effects */}
            <div className="absolute inset-0 overflow-visible">
              {/* Random sparkles along the line */}
              {[0.2, 0.5, 0.8].map((position, i) => (
                <div
                  key={`sparkle-${i}`}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full blur-[1px] animate-ping"
                  style={{
                    left: `${position * 100}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${i * 0.3}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativesSection;
