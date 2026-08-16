"use client";

import { Phone, X } from "lucide-react";
import { CONTACT_PHONE, CONTACT_PHONE_TEL, MENU_ITEMS } from "./menuItems";

interface MobileMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuSheet = ({ isOpen, onClose }: MobileMenuSheetProps) => {
  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className={`fixed inset-x-0 top-0 bottom-16 z-40 bg-black/60 transition-opacity duration-300 xl:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* SHEET */}
      <div
        className={`fixed inset-x-0 bottom-[calc(2rem+env(safe-area-inset-bottom))] z-50 mx-auto max-h-[75vh] max-w-md rounded-t-3xl border border-white/10 bg-surface-1 shadow-2xl transition-transform duration-300 ease-out xl:hidden ${
          isOpen ? "translate-y-0" : "translate-y-[calc(100%+2rem)]"
        }`}
      >
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/15" />

        <div className="flex items-center justify-between px-6 pb-4 pt-3">
          <span className="text-lg font-extrabold tracking-tight text-white">
            Auto<span className="text-red-600">X</span>Customs
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[calc(75vh-72px)] overflow-y-auto px-6 pb-8">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {MENU_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClose}
                className="text-sm font-medium text-gray-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={CONTACT_PHONE_TEL}
            className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-white"
          >
            <Phone size={16} className="text-red-500" />
            {CONTACT_PHONE}
          </a>

          <a
            href="#contact"
            onClick={onClose}
            className="spin-btn spin-btn-red mt-4 flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold text-white"
          >
            <span>Book a Service</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileMenuSheet;
