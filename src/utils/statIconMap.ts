import {
  Award,
  BadgeCheck,
  Car,
  Clock,
  LucideIcon,
  PackageCheck,
  ShieldCheck,
  Star,
  ThumbsUp,
  TrendingUp,
  Trophy,
  Users,
  Wrench,
} from "lucide-react";

// Maps a stat's `icon` string (stored on Hero.stats[].icon) to its Lucide
// component. Keep the option list in sync with the <select> in AddHero/EditHero.
export const statIconMap: Record<string, LucideIcon> = {
  Award,
  Wrench,
  Car,
  Star,
  Users,
  ShieldCheck,
  BadgeCheck,
  PackageCheck,
  Clock,
  ThumbsUp,
  TrendingUp,
  Trophy,
};

export const statIconOptions = Object.keys(statIconMap);

export const resolveStatIcon = (icon?: string): LucideIcon =>
  (icon && statIconMap[icon]) || Star;
