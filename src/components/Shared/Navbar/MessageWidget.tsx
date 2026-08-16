"use client";

import { useState } from "react";
import { CheckCircle2, MessageCircle, Send, X } from "lucide-react";

interface MessageWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

// TODO: no backend yet — wire this up to a real inbox once one exists
// (matches Contact.tsx's booking form, which is also local-only for now).
const MessageWidget = ({ isOpen, onToggle, onClose }: MessageWidgetProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [wasOpen, setWasOpen] = useState(isOpen);

  /* reset the submitted state once the panel has closed */
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (!isOpen) setSubmitted(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* PANEL */}
      <div
        className={`fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm origin-bottom-right overflow-hidden rounded-2xl border border-white/10 bg-surface-1 shadow-2xl transition duration-200 sm:right-6 ${
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-3 bg-red-600 p-5">
          <div>
            <p className="font-bold text-white">Chat with AutoXCustoms</p>
            <p className="mt-1 text-xs text-white/70">
              We typically reply within a few hours.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close message panel"
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          {submitted ? (
            <div className="flex flex-col items-center gap-2.5 py-6 text-center">
              <CheckCircle2 size={28} className="text-red-500" />
              <p className="text-sm font-bold text-white">Message sent</p>
              <p className="text-xs text-gray-400">
                A member of our team will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-1 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Name
                </span>
                <input
                  type="text"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-red-600 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Phone
                </span>
                <input
                  type="tel"
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-red-600 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Message
                </span>
                <textarea
                  required
                  rows={3}
                  placeholder="How can we help?"
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-red-600 focus:outline-none"
                />
              </label>
              <button
                type="submit"
                className="spin-btn spin-btn-red flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white"
              >
                <span className="flex items-center gap-2">
                  Send Message
                  <Send size={14} />
                </span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* LAUNCHER BUTTON — desktop/tablet only; the mobile bottom nav's
          center bubble controls this same panel on small screens */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Close message panel" : "Open message panel"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition hover:scale-105 hover:bg-red-700 xl:flex"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
};

export default MessageWidget;
