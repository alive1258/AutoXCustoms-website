"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import MessageWidget from "./MessageWidget";
import MobileBottomNav from "./MobileBottomNav";
import MobileMenuSheet from "./MobileMenuSheet";
import { CONTACT_PHONE, CONTACT_PHONE_TEL, FACEBOOK_URL, MENU_ITEMS } from "./menuItems";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* stop body scroll while the mobile menu sheet is open */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Menu sheet and chat panel both anchor near the bottom of the screen,
  // so only one is ever open at a time to avoid them overlapping.
  const toggleMenu = () => {
    setIsChatOpen(false);
    setIsMenuOpen((prev) => !prev);
  };
  const toggleChat = () => {
    setIsMenuOpen(false);
    setIsChatOpen((prev) => !prev);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-30">
        {/* TOP UTILITY BAR — desktop only */}
        <div className="hidden xl:block bg-black/40 text-white/80 border-b border-white/5">
          <div className="container flex items-center justify-between h-9 text-xs">
            <div className="flex items-center gap-6">
              <a
                href={CONTACT_PHONE_TEL}
                className="flex items-center gap-2 hover:text-white transition-all duration-300 ease-in-out"
              >
                <Phone size={13} className="text-red-500" />
                {CONTACT_PHONE}
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-all duration-300 ease-in-out"
              >
                <FaFacebook size={13} className="text-red-500" />
                Follow us on Facebook
              </a>
            </div>
            <a
              href="#contact"
              className="bg-red-600 text-white px-3.5 py-1 rounded-full text-xs font-semibold hover:bg-red-700 transition-all duration-300 ease-in-out"
            >
              Book a Service
            </a>
          </div>
        </div>

        {/* MAIN NAVBAR — desktop only; mobile relies entirely on the
            floating bottom nav / menu sheet below, so the header stays
            transparent and floats over the hero on small screens */}
        <div
          className={`transition xl:border-b xl:border-white/10 xl:bg-surface-1/95 xl:backdrop-blur-md ${
            isScrolled ? "xl:shadow-lg xl:shadow-black/20" : ""
          }`}
        >
          <div className="container hidden xl:flex items-center justify-between h-16">
            <a href="#home" className="flex flex-col leading-none shrink-0">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Auto<span className="text-red-600">X</span>Customs
              </span>
              <span className="text-[11px] text-gray-400 tracking-wide">
                Where Machines Become Art
              </span>
            </a>

            <nav className="flex items-center gap-5">
              {MENU_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-gray-300 hover:text-white font-medium transition-all duration-300 ease-in-out text-sm whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-lg shadow-red-900/30 text-sm whitespace-nowrap"
            >
              Book a Service
            </a>
          </div>
        </div>
      </header>

      <MobileMenuSheet isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* spacer — reserved only at xl+, where the navbar is solid; on
          mobile the header is transparent and floats over the hero */}
      <div className="hidden xl:block xl:h-[100px]" />

      <MessageWidget
        isOpen={isChatOpen}
        onToggle={toggleChat}
        onClose={() => setIsChatOpen(false)}
      />
      <MobileBottomNav
        isChatOpen={isChatOpen}
        onToggleChat={toggleChat}
        isMenuOpen={isMenuOpen}
        onToggleMenu={toggleMenu}
      />
    </>
  );
};

export default Navbar;
