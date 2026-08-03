"use client";

import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';

// Testimonial Data
const testimonials = [
  {
    id: 1,
    name: "রাকিব হাসান",
    role: "ডিজিটাল মার্কেটার",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?&w=150&h=150&fit=crop",
    rating: 5,
    message: "এই ইবুকটা আমার জীবন বদলে দিয়েছে। মাত্র ৩ মাসে আমি ৫ লাখ টাকা ইনকাম করেছি। প্রতিটি পৃষ্ঠায় আছে প্র্যাকটিক্যাল নলেজ।",
    date: "২ মাস আগে",
    amount: "৫,০০,০০০+",
  },
  {
    id: 2,
    name: "সাদিয়া ইসলাম",
    role: "ফ্রিল্যান্সার",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=150&h=150&fit=crop",
    rating: 5,
    message: "২ বছর ধরে ফ্রিল্যান্সিং করছি কিন্তু এত কিছু জানতাম না। 'The Next Master' পড়ার পর আমার ইনকাম ৩x বেড়েছে। সবার জন্য রেকমেন্ডেড!",
    date: "১ সপ্তাহ আগে",
    amount: "৮,০০,০০০+",
  },
  {
    id: 3,
    name: "তানভীর আহমেদ",
    role: "ছাত্র (ইউনিভার্সিটি)",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?&w=150&h=150&fit=crop",
    rating: 5,
    message: "ছাত্র অবস্থায় ৬ মাসে ১০ লাখ টাকা ইনকাম! এটা আমার জন্য অসম্ভব ছিল কিন্তু এই ইবুকের কৌশলগুলো কাজ করেছে। ধন্যবাদ টিমকে।",
    date: "৩ সপ্তাহ আগে",
    amount: "১০,০০,০০০+",
  },
  {
    id: 4,
    name: "নাজমা আক্তার",
    role: "গৃহিণী উদ্যোক্তা",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?&w=150&h=150&fit=crop",
    rating: 5,
    message: "গৃহিণী হয়ে ঘরে বসে ইনকাম করার স্বপ্ন ছিল। এখন মাসে ৫০ হাজার+ টাকা ইনকাম করছি। এই ইবুকটা সত্যিই মাস্টারপিস!",
    date: "৫ দিন আগে",
    amount: "৩,০০,০০০+",
  },
  {
    id: 5,
    name: "ইমরান খান",
    role: "ইউটিউবার",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=150&h=150&fit=crop",
    rating: 4,
    message: "ইউটিউবের সাথে ইবুক মার্কেটিং এর কম্বিনেশনটা অসাধারণ। ভিডিওতে যা শিখিয়েছেন তা প্র্যাকটিক্যালি কাজ করে। থ্যাংক ইউ!",
    date: "২ সপ্তাহ আগে",
    amount: "১৫,০০,০০০+",
  }
];


const ClientReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Next testimonial
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  // Previous testimonial
  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto play
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 3000); // Change every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextTestimonial]);

  // Pause auto play on hover
  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextTestimonial();
    }
    if (touchStart - touchEnd < -100) {
      // Swipe right
      prevTestimonial();
    }
  };
  // Scroll to checkout
  const scrollToCheckout = () => {
    const checkoutSection = document.getElementById("checkout-section");
    if (checkoutSection) {
      checkoutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  // Render stars
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-600'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-linear-to-b from-transparent to-purple-900/10">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              সফল উদ্যোক্তাদের মতামত
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            ১০,০০০+ সফল উদ্যোক্তা ইতিমধ্যে তাদের জীবন বদলেছেন
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 animate-pulse"></div>

          {/* Main Card */}
          <div className="relative bg-linear-to-br from-[#1a0b2e] to-[#2d1a44] rounded-2xl sm:rounded-3xl border border-purple-500/30 p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">
              {/* Left Side - Image & Rating */}
              <div className="md:w-1/3">
                <div className="flex flex-col items-center md:items-start">
                  {/* Image Container */}
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-4">
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                    <div className="absolute inset-1 rounded-full overflow-hidden border-4 border-purple-500/30">
                      <Image
                        src={current.image}
                        alt={current.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px"
                      />
                    </div>
                    
                    {/* Verified Badge */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-[#1a0b2e]">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="text-center md:text-left">
                    <div className="flex gap-1 mb-2">
                      {renderStars(current.rating)}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-yellow-400 font-bold text-lg sm:text-xl">
                        {current.rating}.0
                      </span>
                      <span className="text-gray-400 text-sm">(৫৪২ রিভিউ)</span>
                    </div>
                    
                    {/* Achievement Badge */}
                    <div className="mt-3 inline-block px-3 py-1.5 bg-linear-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
                      <span className="text-green-400 text-xs sm:text-sm font-semibold">
                        ইনকাম: {current.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Message */}
              <div className="md:w-2/3">
                {/* Quote Icon */}
                <div className="mb-4">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Message */}
                <div className="mb-6">
                  <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                    &quot;{current.message}&quot;
                  </p>
                </div>

                {/* User Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-1">
                      {current.name}
                    </h3>
                    <p className="text-purple-300 text-sm sm:text-base">
                      {current.role}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      {current.date}
                    </p>
                  </div>

                  {/* Social Proof */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1,2,3].map((i) => (
                        <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-linear-to-r from-purple-500 to-pink-500 border-2 border-[#1a0b2e]"></div>
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs sm:text-sm">+৫০</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center md:justify-end gap-3 mt-6 md:mt-0 md:absolute md:bottom-6 md:right-6">
              <button
                onClick={prevTestimonial}
                className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 sm:w-8 h-2 sm:h-3 bg-linear-to-r from-purple-500 to-pink-500 rounded-full'
                  : 'w-2 h-2 sm:w-3 sm:h-3 bg-gray-600 rounded-full hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Counter */}
         {/* Stats Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-12 lg:mt-16">
          {[
            { label: 'সফল উদ্যোক্তা', value: '১০,০০০+' },
            { label: 'ইনকাম (গড়)', value: '৫,০০,০০০+' },
            { label: '৫ স্টার রিভিউ', value: '৯,৫০০+' },
            { label: 'সফলতার হার', value: '৯৮%' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 sm:p-6 bg-[#371796]/20 rounded-xl border border-[#6d28d9]/20">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#371796] to-[#6d28d9]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Mini */}
        <div className="text-center mt-8 sm:mt-10">
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <button
            onClick={scrollToCheckout}
            className="spin-btn px-6 sm:px-7 h-14 sm:h-16 text-white font-semibold text-sm sm:text-base rounded-xl"
          >
            <span>এখনই অর্ডার করুন</span>
          </button>
        
        </div>
        </div>
      </div>
    </section>
  );
};



export default ClientReview