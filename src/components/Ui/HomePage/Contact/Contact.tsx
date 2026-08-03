"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  User,
  Phone,
  Car,
  Wrench,
  Calendar,
  AlertCircle,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import SlideLeft from "@/src/components/Common/Animaation/SlideLeft";
import SlideRight from "@/src/components/Common/Animaation/SlideRight";

interface BookingFormData {
  name: string;
  phone: string;
  vehicleModel: string;
  serviceNeeded: string;
  preferredDate: string;
}

const phoneNumbers = [
  "01303-218712",
  "01724-604088",
  "+880 17 3930 2689",
  "+880 17 2641 9962",
];

const toTel = (number: string) => `tel:${number.replace(/[^\d+]/g, "")}`;

const FACEBOOK_URL = "https://facebook.com/AutoXCustoms";
const ADDRESS =
  "Trimohoni Bagani-Bari, Meradia, Banasree, Dhaka, Dhaka, Bangladesh, 1219";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS,
)}`;

const serviceOptions = [
  "Paint & Body",
  "Restoration",
  "Detailing & Protection",
  "Upgrades & Accessories",
  "Diagnostics & Mechanical Repair",
  "Other",
];

const inputClass = (hasError: boolean) =>
  `w-full pl-11 pr-4 py-3 bg-white/5 border ${
    hasError ? "border-red-500" : "border-white/15"
  } rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-600 transition-all duration-300 ease-in-out`;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({ mode: "onChange" });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit: SubmitHandler<BookingFormData> = (data) => {
    console.log(data);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-surface-2">
      <div className="container">
        <SlideUp className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Contact &amp; Booking
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Tell us about your vehicle and we&apos;ll confirm your appointment.
          </p>
        </SlideUp>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          <SlideLeft className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10">
                <div className="w-14 h-14 rounded-full bg-red-600/15 flex items-center justify-center text-red-500 mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-white font-bold text-xl">
                  Request Received
                </h3>
                <p className="text-gray-400 mt-2 max-w-sm">
                  Thanks — we&apos;ll call you shortly to confirm your
                  appointment.
                </p>
                <button
                  onClick={() => {
                    reset();
                    setSubmitted(false);
                  }}
                  className="mt-6 text-red-500 hover:text-red-400 font-medium text-sm transition-all duration-300 ease-in-out"
                >
                  Book another service
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      {...register("name", {
                        required: "Please enter your name",
                      })}
                      className={inputClass(!!errors.name)}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      {...register("phone", {
                        required: "Please enter your phone number",
                      })}
                      className={inputClass(!!errors.phone)}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Car className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Vehicle Model (e.g. Toyota Corolla 2018)"
                      {...register("vehicleModel", {
                        required: "Please enter your vehicle model",
                      })}
                      className={inputClass(!!errors.vehicleModel)}
                    />
                  </div>
                  {errors.vehicleModel && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />{" "}
                      {errors.vehicleModel.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Wrench className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                    <select
                      defaultValue=""
                      {...register("serviceNeeded", {
                        required: "Please select a service",
                      })}
                      className={`${inputClass(!!errors.serviceNeeded)} appearance-none`}
                    >
                      <option value="" disabled className="bg-surface-1">
                        Service Needed
                      </option>
                      {serviceOptions.map((service) => (
                        <option
                          key={service}
                          value={service}
                          className="bg-surface-1"
                        >
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.serviceNeeded && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />{" "}
                      {errors.serviceNeeded.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                    <input
                      type="date"
                      {...register("preferredDate", {
                        required: "Please choose a preferred date",
                      })}
                      className={`${inputClass(!!errors.preferredDate)} scheme-dark`}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />{" "}
                      {errors.preferredDate.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="spin-btn spin-btn-red w-full h-14 text-white font-semibold text-sm sm:text-base rounded-xl mt-2"
                >
                  <span>Book a Service</span>
                </button>
              </form>
            )}
          </SlideLeft>

          <SlideRight className="space-y-6" delay={2}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-white font-bold text-lg mb-5">
                Call Us Directly
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {phoneNumbers.map((number) => (
                  <a
                    key={number}
                    href={toTel(number)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-600/50 transition-all duration-300 ease-in-out"
                  >
                    <span className="w-9 h-9 rounded-full bg-red-600/15 flex items-center justify-center text-red-500 shrink-0">
                      <Phone className="w-4 h-4" />
                    </span>
                    <span className="text-gray-200 text-sm font-medium">
                      {number}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-600/50 transition-all duration-300 ease-in-out"
              >
                <span className="w-9 h-9 rounded-full bg-[#1877F2]/15 flex items-center justify-center text-[#1877F2] shrink-0">
                  <FaFacebook className="w-4 h-4" />
                </span>
                <span className="text-gray-200 text-sm font-medium">
                  Visit our Facebook Page
                </span>
              </a>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-red-600/50 transition-all duration-300 ease-in-out"
              >
                <span className="w-9 h-9 rounded-full bg-red-600/15 flex items-center justify-center text-red-500 shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <span className="text-gray-200 text-sm font-medium">
                  {ADDRESS}
                </span>
              </a>
            </div>
          </SlideRight>
        </div>
      </div>
    </section>
  );
}
