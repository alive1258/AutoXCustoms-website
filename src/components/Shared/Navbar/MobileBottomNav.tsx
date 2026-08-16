"use client";

import { useEffect, useState } from "react";
import { GalleryHorizontal, Home, MessageCircle, Wrench, X } from "lucide-react";

type NavEntry =
  | { type: "link"; key: string; label: string; id: string; icon: typeof Home }
  | { type: "button"; key: string; label: string; icon: typeof Home };

const NAV_ENTRIES: NavEntry[] = [
  { type: "link", key: "home", label: "Home", id: "home", icon: Home },
  { type: "link", key: "services", label: "Services", id: "services", icon: Wrench },
  {
    type: "link",
    key: "gallery",
    label: "Gallery",
    id: "gallery",
    icon: GalleryHorizontal,
  },
  { type: "button", key: "menu", label: "Menu", icon: X },
];

interface MobileBottomNavProps {
  isChatOpen: boolean;
  onToggleChat: () => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

const MobileBottomNav = ({
  isChatOpen,
  onToggleChat,
  isMenuOpen,
  onToggleMenu,
}: MobileBottomNavProps) => {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const sectionIds = NAV_ENTRIES.filter((e) => e.type === "link").map(
      (e) => (e as Extract<NavEntry, { type: "link" }>).id,
    );
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const centerIdx = Math.floor(NAV_ENTRIES.length / 2);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 block xl:hidden"
      aria-label="Mobile bottom navigation"
    >
      <div className="relative mx-auto max-w-md">
        {/* Floating call/chat bubble */}
        <button
          type="button"
          onClick={onToggleChat}
          aria-label={isChatOpen ? "Close chat" : "Open chat"}
          aria-expanded={isChatOpen}
          className="absolute left-1/2 -top-6 z-10 flex h-14 w-14 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white shadow-xl ring-4 ring-surface-1 transition hover:scale-105 hover:bg-red-700"
        >
          {isChatOpen ? <X size={22} /> : <MessageCircle size={22} />}
        </button>

        <div
          className="relative flex items-center justify-around rounded-t-3xl border-t border-white/10 bg-surface-1/95 px-2 pb-2.5 pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.35)] backdrop-blur"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle at 50% 3%, transparent 33px, black 35px)",
            maskImage:
              "radial-gradient(circle at 50% 3%, transparent 33px, black 35px)",
          }}
        >
          {NAV_ENTRIES.map((entry, idx) => {
            const isActive =
              entry.type === "link" ? activeId === entry.id : isMenuOpen;
            const Icon = entry.type === "button" && isMenuOpen ? X : entry.icon;
            const isCenterGap = idx === centerIdx;

            const content = (
              <>
                <Icon
                  size={20}
                  className={isActive ? "text-white" : "text-gray-500"}
                />
                <span
                  className={`text-[11px] font-medium ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                >
                  {entry.label}
                </span>
              </>
            );

            return (
              <div key={entry.key} className="flex items-center">
                {isCenterGap && <div className="w-10 shrink-0" aria-hidden="true" />}
                {entry.type === "link" ? (
                  <a
                    href={`#${entry.id}`}
                    className="flex flex-col items-center gap-1 px-3 py-1"
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onToggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    className="flex flex-col items-center gap-1 px-3 py-1"
                  >
                    {content}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
