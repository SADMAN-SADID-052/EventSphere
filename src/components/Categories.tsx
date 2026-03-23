"use client";
import Link from "next/link";

const categories = [
  {
    icon: "🎵",
    title: "Music & Concerts",
    count: "120+ Events",
    accent: "#E85D24",
    bg: "#E85D2415",
  },
  {
    icon: "💻",
    title: "Tech & Innovation",
    count: "85+ Events",
    accent: "#605DFF",
    bg: "#605DFF15",
  },
  {
    icon: "🎨",
    title: "Art & Culture",
    count: "60+ Events",
    accent: "#0F9F7B",
    bg: "#0F9F7B15",
  },
  {
    icon: "🏆",
    title: "Sports & Fitness",
    count: "95+ Events",
    accent: "#F59E0B",
    bg: "#F59E0B15",
  },
  {
    icon: "🍽️",
    title: "Food & Lifestyle",
    count: "70+ Events",
    accent: "#EC4899",
    bg: "#EC489915",
  },
  {
    icon: "🎓",
    title: "Education & Workshop",
    count: "110+ Events",
    accent: "#06B6D4",
    bg: "#06B6D415",
  },
  {
    icon: "💼",
    title: "Business & Startup",
    count: "50+ Events",
    accent: "#84CC16",
    bg: "#84CC1615",
  },
  {
    icon: "🎭",
    title: "Theatre & Comedy",
    count: "40+ Events",
    accent: "#F97316",
    bg: "#F9731615",
  },
];

export default function Categories() {
  return (
    <section className="bg-[#0d0d12] py-20 px-6 sm:px-12">
      <div className="max-w-[1290px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#605DFF] font-semibold text-sm tracking-widest uppercase mb-2">
            Browse By
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Event <span className="text-[#605DFF]">Categories</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base max-w-xl mx-auto">
            Find events that match your passion — from music to tech, art to sports.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href="/events"
              className="group flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1"
              style={{ background: cat.bg }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = cat.accent;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.05)";
              }}
            >
              <span className="text-4xl mb-4">{cat.icon}</span>
              <h3
                className="text-white font-bold text-sm sm:text-base leading-tight mb-1"
              >
                {cat.title}
              </h3>
              <p className="text-xs font-medium" style={{ color: cat.accent }}>
                {cat.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}