import { Phone, MapPin } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";

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

const phoneNumbers = ["01303-218712", "+880 1303-218712", "01724-604088"];
const toTel = (number: string) => `tel:${number.replace(/[^\d+]/g, "")}`;

const FACEBOOK_URL = "https://facebook.com/AutoXCustoms";
const ADDRESS =
  "Trimohoni Bagani-Bari, Meradia, Banasree, Dhaka, Dhaka, Bangladesh, 1219";
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS,
)}&output=embed`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-surface-2 border-t border-white/10 pt-16 pb-8">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#be1a68_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="container z-10">
        <SlideUp className="mb-12 rounded-2xl overflow-hidden border border-white/10 h-56 sm:h-72">
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="AutoXCustoms workshop location"
            className="grayscale-[40%] contrast-125"
          />
        </SlideUp>

        <SlideUp className="grid md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          <div>
            <a href="#home" className="flex flex-col leading-none">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Auto<span className="text-red-600">X</span>Customs
              </span>
            </a>
            <p className="text-gray-400 text-sm mt-3 max-w-xs">
              Where Machines Become Art
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:border-[#1877F2]/50 transition-all duration-300 ease-in-out"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-gray-400 hover:text-red-500 text-sm transition-all duration-300 ease-in-out"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              {phoneNumbers.map((number) => (
                <li key={number}>
                  <a
                    href={toTel(number)}
                    className="flex items-center gap-2.5 text-gray-400 hover:text-red-500 text-sm transition-all duration-300 ease-in-out"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    {number}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2.5 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                {ADDRESS}
              </li>
            </ul>
          </div>
        </SlideUp>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 pt-8">
          <p className="text-gray-500 text-sm text-center">
            © {currentYear}{" "}
            <span className="text-white font-medium">AutoXCustoms</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
