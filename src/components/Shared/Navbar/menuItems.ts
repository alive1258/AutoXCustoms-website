export interface MenuItem {
  label: string;
  id: string;
}

export const MENU_ITEMS: MenuItem[] = [
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

export const CONTACT_PHONE = "01303-218712";
export const CONTACT_PHONE_TEL = `tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`;
export const FACEBOOK_URL = "https://facebook.com/AutoXCustoms";
