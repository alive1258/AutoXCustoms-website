"use client";

import React, { useState } from "react";
import {
  Lock,
  User,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  agreeToTerms: boolean;
}

const ModernCheckoutSection: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({ mode: "onChange" });
  const agreeToTerms = watch("agreeToTerms");
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    setIsProcessing(true);
    setTimeout(() => {
      alert("অর্ডার সফলভাবে জমা হয়েছে! Redirecting to SSLCommerz...");
      console.log(data);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <section className="min-h-screen py-12 px-4 relative overflow-hidden ">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-800/20 rounded-full border border-purple-500/30 mb-6">
            <Lock className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300 text-sm font-medium">অর্ডার করুন নিরাপদে</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300 mb-4">
            Complete Your{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-blue-400 to-cyan-400">
              জিরো টু বিজনেস ই-বুক
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            উদ্যোক্তাদের জন্য ৩০০+ পণ্যের সোর্সিং, স্টার্টআপ ও মার্কেটিং গাইড। নিরাপদ অনলাইন পেমেন্ট SSLCommerz-এর মাধ্যমে।
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Checkout Form */}
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-300 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" /> অর্ডার বিবরণ
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              {/* Name */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-sm sm:text-base text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" /> আপনার নাম *
                </label>
                <input
                  type="text"
                  {...register("fullName", { required: "আপনার নাম লিখুন" })}
                  placeholder="আপনার নাম লিখুন"
                  className={`w-full px-4 py-3 sm:py-3 bg-gray-900/50 border ${errors.fullName ? "border-red-500" : "border-gray-700/50"} rounded-xl text-gray-300 placeholder-gray-400 text-sm sm:text-base`}
                />
                {errors.fullName && (
                  <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-sm sm:text-base text-gray-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Mobile Number *
                </label>
                <input
                  type="tel"
                  {...register("phone", { required: "Mobile Number লিখুন" })}
                  placeholder="+8801XXXXXXXXX"
                  className={`w-full px-4 py-3 sm:py-3 bg-gray-900/50 border ${errors.phone ? "border-red-500" : "border-gray-700/50"} rounded-xl text-gray-300 placeholder-gray-400 text-sm sm:text-base`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-sm sm:text-base text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email *
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email লিখুন" })}
                  placeholder="আপনার Email লিখুন"
                  className={`w-full px-4 py-3 sm:py-3 bg-gray-900/50 border ${errors.email ? "border-red-500" : "border-gray-700/50"} rounded-xl text-gray-300 placeholder-gray-400 text-sm sm:text-base`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Order Notes */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-sm sm:text-base text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" /> Order notes (optional)
                </label>
                <input
                  type="text"
                  {...register("note")}
                  placeholder="Order notes (optional)"
                  className="w-full px-4 py-3 sm:py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-gray-300 placeholder-gray-400 text-sm sm:text-base"
                />
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer text-sm sm:text-base">
                <input
                  type="checkbox"
                  {...register("agreeToTerms", { required: true })}
                  className="mt-1"
                />
                <span className="text-gray-300">
                  আমি ওয়েবসাইটের{" "}
                  <a href="#" className="text-blue-400 underline">শর্তাবলী</a>,{" "}
                  <a href="#" className="text-blue-400 underline">প্রাইভেসি পলিসি</a> ও{" "}
                  <a href="#" className="text-blue-400 underline">রিফান্ড পলিসি</a> এর সাথে একমত।
                </span>
              </label>
            </form>
          </div>

          {/* Order Summary + Pay Online */}
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-300 mb-4 sm:mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" /> আপনার অর্ডার
              </h2>

              {/* Product Item */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-3 bg-gray-900/50 rounded-xl border border-gray-700/50 mb-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-purple-600/20 rounded-lg">
                    <Image
                      className="object-cover"
                      src="/images/book1.webp"
                      alt="E-Book"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-300 text-sm sm:text-base md:text-lg">
                      জিরো টু বিজনেসঃ উদ্যোক্তাদের ৩০০+ পণ্যের কমপ্লিট সোর্সিং ও স্টার্টআপ গাইড
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                      Lifetime Access • Premium Support
                    </p>
                  </div>
                </div>
                <div className="flex justify-end items-center gap-2 sm:gap-3 mt-2 sm:mt-0 text-gray-300 font-semibold text-sm sm:text-base md:text-lg">
                  <span className="text-gray-400">1×</span>
                  <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">195.00৳</span>
                </div>
              </div>

              {/* Subtotal & Total */}
              <div className="flex justify-between text-gray-300 text-sm sm:text-base md:text-lg mb-2">
                <span>Subtotal</span>
                <span>195.00৳</span>
              </div>
              <div className="flex justify-between text-white font-bold text-base sm:text-lg md:text-xl mb-4">
                <span>Total</span>
                <span>195.00৳</span>
              </div>
            </div>

            {/* Pay Online Button */}
            <div className="mt-4">
              <p className="text-gray-400 text-xs sm:text-sm mb-2">
                Pay Online (Credit/Debit Card/Mobile Banking/NetBanking/bKash) <br />
                Pay securely through SSLCommerz.
              </p>
              <button
                disabled={isProcessing || !agreeToTerms || !isValid}
                className="group w-full relative px-6 sm:px-8 md:px-12 h-12 sm:h-14 md:h-16 text-gray-300 font-bold text-sm sm:text-base md:text-lg rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 bg-linear-to-r from-purple-700 to-purple-900"></span>
                <span className="absolute inset-0 bg-linear-to-r from-purple-900 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="animate-pulse">⚡</span>
                  {isProcessing ? "Processing..." : "অর্ডার করুন 195.00৳"}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernCheckoutSection;
