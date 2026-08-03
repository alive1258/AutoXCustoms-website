"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Process", id: "process" },
  { label: "Why Us", id: "why-us" },
  { label: "Reviews", id: "reviews" },
  { label: "Gallery", id: "gallery" },
  { label: "Accessories", id: "accessories" },
  { label: "Blog", id: "blog" },
  { label: "FAQ", id: "faq" },
  { label: "Location", id: "location" },
  { label: "Contact", id: "contact" },
];

const PHONE_NUMBER = "01303-218712";
const PHONE_TEL = `tel:${PHONE_NUMBER.replace(/[^\d+]/g, "")}`;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-surface-1/95 backdrop-blur-md z-50 border-b border-white/10">
      <div className="container">
        <div className="flex justify-between items-center h-20">
          <a href="#home" className="flex flex-col leading-none shrink-0">
            <span className="text-2xl font-extrabold tracking-tight text-white">
              Auto<span className="text-red-600">X</span>Customs
            </span>
            <span className="text-[11px] text-gray-400 tracking-wide hidden sm:block">
              Where Machines Become Art
            </span>
          </a>

          <div className="hidden xl:flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-300 hover:text-white font-medium transition-all duration-300 ease-in-out text-sm whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_TEL}
              aria-label="Call us"
              className="p-2 rounded-full border border-white/15 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-300 ease-in-out xl:hidden"
            >
              <Phone className="w-5 h-5" />
            </a>

            <a
              href="#contact"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-red-900/30 text-sm whitespace-nowrap"
            >
              Book a Service
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="xl:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-300 ease-in-out"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="xl:hidden bg-surface-1 border-t border-white/10 py-4 max-h-[80vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-gray-300 hover:text-white font-medium text-sm py-2 px-3 rounded-lg hover:bg-white/5 transition-all duration-300 ease-in-out"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-4 px-3">
              <a
                href={PHONE_TEL}
                className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-lg border border-white/15 text-gray-200 hover:text-white hover:border-white/30 transition-all duration-300 ease-in-out text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 text-center py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out text-sm"
              >
                Book a Service
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
