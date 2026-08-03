"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Calendar, Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import SlideUp from "@/src/components/Common/Animaation/SlideUp";
import ZoomIn from "@/src/components/Common/Animaation/ZoomIn";

const categories = [
  "All",
  "Paint & Body",
  "Restoration",
  "Detailing",
  "Customization",
  "Maintenance Tips",
] as const;

type Category = (typeof categories)[number];

type Post = {
  slug: string;
  title: string;
  category: Exclude<Category, "All">;
  image: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
};

const posts: Post[] = [
  {
    slug: "signs-you-need-a-respray",
    title: "5 Signs Your Car Needs a Full Respray",
    category: "Paint & Body",
    image: "/images/services/paint-body.jpg",
    date: "Jul 12, 2026",
    readTime: "4 min read",
    excerpt:
      "Fading, clear-coat peeling, and stubborn scratches all mean different things. Here's how to tell if touch-up paint is enough — or if it's time for the booth.",
    content: [
      "Not every paint problem needs a full respray, but a surprising number of the vehicles that come into our bay could have been saved from more expensive work if the early warning signs had been caught sooner.",
      "Clear-coat peeling — where a thin, flaky top layer starts lifting off in sheets, usually on the roof or hood first — is the clearest signal. Once the clear coat fails, the base color underneath is exposed to UV and moisture with nothing protecting it, and the damage accelerates fast.",
      "Chalky, dull-looking paint that no amount of polishing brings back is oxidation: the paint's binders have broken down from sun exposure. Light oxidation can often be corrected with proper polishing, but if you can wipe a white residue off the panel with your finger, the paint itself is failing.",
      "Rust bubbling up through the paint — even small dots — means moisture has already reached bare metal underneath. This has to be treated and repainted before it spreads, not just touched up on the surface.",
      "If you're seeing any of these, bring it in for an honest assessment. Sometimes a panel respray is enough; sometimes it isn't, and we'll tell you which before any work starts.",
    ],
  },
  {
    slug: "ceramic-coating-vs-ppf",
    title: "Ceramic Coating vs PPF: Which Protects Your Paint Better?",
    category: "Detailing",
    image: "/images/services/detailing.jpg",
    date: "Jun 28, 2026",
    readTime: "5 min read",
    excerpt:
      "Both promise to protect your finish, but they solve different problems. Here's the honest breakdown of what each one actually does.",
    content: [
      "Ceramic coating is a liquid polymer applied to the paint that bonds at a chemical level, giving you a hard, glossy, hydrophobic layer. It makes the car easier to clean, resists water spots and light chemical staining, and adds noticeable depth to the shine — but it does not stop stone chips, and it will not stop a key scratch.",
      "Paint Protection Film (PPF) is a thick, transparent urethane film physically applied to the panel. It's the only one of the two that actually absorbs rock chips, road debris impacts, and light scuffs — because there's real material thickness between the road and your factory paint.",
      "The two aren't actually competitors — they're complementary. A common setup we build for customers is PPF on the high-impact zones (front bumper, hood, mirrors, rocker panels) combined with a ceramic coating over the whole car, including on top of the film itself.",
      "If your budget only allows one: daily highway drivers benefit most from PPF on the front end. Cars that are mostly garaged and driven for show benefit more from ceramic alone. We'll walk you through what makes sense for how you actually use the car.",
    ],
  },
  {
    slug: "restoration-process-rust-to-shine",
    title: "The Restoration Process: From Rust to Showroom Shine",
    category: "Restoration",
    image: "/images/services/restoration.jpg",
    date: "Jun 15, 2026",
    readTime: "6 min read",
    excerpt:
      "A full restoration isn't one job — it's a sequence. Here's what actually happens between a rusted-out classic arriving and it rolling out looking factory-new.",
    content: [
      "Every restoration starts with an honest inspection, not a paint job. We check the chassis and floor pans for structural rust before touching anything cosmetic — there's no point in a beautiful finish over a frame that isn't sound.",
      "Once the structural work is confirmed solid (or repaired), the vehicle is stripped down further than most people expect: trim, glass, and often the interior come out so panels can be properly treated, not just painted around.",
      "Rust treatment and bodywork come next — cutting out compromised metal, welding in new sections where needed, and minimal use of body filler, only where it belongs. This is the stage that determines whether a restoration lasts ten years or two.",
      "Only after all of that is the vehicle prepped and moved into the paint booth. Mechanical and interior work often happens in parallel, so the car comes back together as a whole rather than a paint job bolted onto old problems.",
      "It's slower than a repaint, and it should be — a real restoration is judged by what's under the paint, not just how it looks the day you pick it up.",
    ],
  },
  {
    slug: "why-regular-detailing-matters",
    title: "Why Regular Detailing Extends Your Car's Life",
    category: "Maintenance Tips",
    image: "/images/services/upgrades.jpg",
    date: "Jun 2, 2026",
    readTime: "3 min read",
    excerpt:
      "Detailing isn't just about looking good for a weekend. Done on a schedule, it's one of the cheapest ways to protect your car's long-term value.",
    content: [
      "Dust, pollen, and road grime aren't just cosmetic problems — left on the paint long enough, they trap moisture against the clear coat and accelerate oxidation, especially in Dhaka's humidity.",
      "Regular interior detailing matters just as much. UV exposure through the windshield breaks down dashboard plastics and seat material faster than people realize, and a proper clean-and-condition cycle every few months slows that down significantly.",
      "There's also a resale angle: a car with a documented detailing history and a clean, well-kept cabin consistently commands a better price than an identical mechanically-sound car that looks neglected.",
      "We recommend a full detail every 3-4 months for daily drivers in Dhaka's conditions, with quick maintenance washes in between — not because it needs to look perfect every week, but because consistency is what actually protects the finish.",
    ],
  },
  {
    slug: "vinyl-wrap-101",
    title: "Vinyl Wrap 101: Color Change Without Touching Factory Paint",
    category: "Customization",
    image: "/images/services/wraps.jpg",
    date: "May 20, 2026",
    readTime: "4 min read",
    excerpt:
      "A full wrap can completely change how a car looks — and it's fully reversible. Here's what's actually involved before you commit to a color.",
    content: [
      "A vinyl wrap is a large-format adhesive film applied panel by panel over your existing paint. Done properly, it doesn't touch or damage the factory finish underneath — which is exactly why it's reversible, unlike a repaint.",
      "Surface prep is what separates a wrap that lasts from one that lifts at the edges within a year. Every panel is thoroughly decontaminated and, where needed, minor paint imperfections are corrected first — the film will show, not hide, whatever is underneath it.",
      "Finish choice matters more than most people expect going in: gloss reads closest to factory paint, satin is the most forgiving of small imperfections and fingerprints, and matte requires the most careful maintenance since it can't be machine-polished the way gloss can.",
      "With reasonable care, a quality wrap holds up for 5+ years before colors starts to look tired — and when you're ready for a change, or ready to sell, it comes off cleanly with the original paint underneath intact.",
    ],
  },
  {
    slug: "diagnosing-engine-issues-early",
    title: "How We Diagnose Engine Issues Before They Become Expensive",
    category: "Maintenance Tips",
    image: "/images/services/diagnostics.jpg",
    date: "May 8, 2026",
    readTime: "5 min read",
    excerpt:
      "Most costly engine repairs started as a small, ignorable symptom months earlier. Here's what we actually listen and look for during a diagnostic check.",
    content: [
      "A proper diagnosis starts before the scanner goes in — a road test and a listen to the engine at idle and under load catches things error codes alone often miss, like a subtle knock or an inconsistent idle.",
      "Once codes are pulled, the work is in figuring out which one is the actual root cause and which are downstream symptoms. A single failing sensor can trigger four or five unrelated-looking codes, and replacing parts without that context wastes money without fixing anything.",
      "Fluid checks tell their own story: metallic particles in oil, a burnt smell from transmission fluid, or milky coolant all point to specific, serious issues well before they'd show up as a warning light.",
      "Our rule is simple — we show customers exactly what we found, in plain language, before any repair starts. No guesswork billed as a fix, and no work done that the car doesn't actually need.",
    ],
  },
];

function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-surface-1 shadow-2xl shadow-black/60"
      >
        <button
          onClick={onClose}
          aria-label="Close article"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-red-600 border border-white/20 flex items-center justify-center text-white transition-all duration-300 ease-in-out z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-56 sm:h-72 w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(min-width: 640px) 672px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface-1 via-black/20 to-transparent" />
          <span className="absolute bottom-4 left-4 sm:left-6 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-semibold">
            {post.category}
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-white text-2xl sm:text-3xl font-extrabold leading-tight">
            {post.title}
          </h3>

          <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out shadow-lg shadow-red-900/30"
          >
            Book a Service
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const openPost = posts.find((p) => p.slug === openSlug) ?? null;

  return (
    <section
      id="blog"
      className="py-20 md:py-28 bg-surface-2 border-t border-white/5"
    >
      <div className="container">
        <SlideUp className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">
            From The Workshop
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3">
            Tips & Insights
          </h2>
          <p className="text-gray-400 mt-4 text-lg">
            Straight answers on paint, restoration, and keeping your car in top
            shape.
          </p>
        </SlideUp>

        <SlideUp
          className="flex flex-wrap justify-center gap-3 mb-12"
          delay={2}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
                activeCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-white/5 text-gray-300 border border-white/10 hover:border-red-600/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </SlideUp>

        <ZoomIn className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <button
              key={post.slug}
              onClick={() => setOpenSlug(post.slug)}
              className="group flex flex-col text-left bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-red-600/50 hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-semibold">
                  {post.category}
                </span>
              </div>

              <div className="flex flex-col grow p-6">
                <div className="flex items-center gap-3 text-gray-500 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-white text-lg font-bold mt-3 leading-snug group-hover:text-red-400 transition-all duration-300 ease-in-out">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed grow">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center gap-1.5 text-red-500 group-hover:text-red-400 font-medium text-sm mt-5 pt-4 border-t border-white/10 transition-all duration-300 ease-in-out">
                  Read Article
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </ZoomIn>
      </div>

      {openPost && (
        <PostModal post={openPost} onClose={() => setOpenSlug(null)} />
      )}
    </section>
  );
}
