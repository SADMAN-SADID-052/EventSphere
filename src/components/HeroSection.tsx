"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    tag: "🎵 Music Festival",
    date: "12–14 April • Dhaka Stadium",
    title: "Soundwave",
    highlight: "Festival 2025",
    desc: "Three days of electrifying performances, art installations, and unforgettable memories under the open sky.",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=80",
    cta: "Get Tickets",
    accent: "#605DFF",
  },
  {
    tag: "💻 Tech Conference",
    date: "20–22 May • BICC, Dhaka",
    title: "Tech Summit",
    highlight: "Bangladesh 2025",
    desc: "Connecting 5,000+ developers, founders, and innovators. Keynotes, workshops, and networking.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
    cta: "Register Now",
    accent: "#605DFF",
  },
  {
    tag: "🎨 Art & Culture",
    date: "5–7 June • National Museum",
    title: "Art Gala",
    highlight: "Dhaka 2025",
    desc: "An immersive exhibition of contemporary South Asian art, live performances, and cultural exchange.",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&auto=format&fit=crop&q=80",
    cta: "Explore Events",
    accent: "#605DFF",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [current]);

  const goTo = (idx: number) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 400);
  };

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "65vh" }}
    >
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          animating ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#0b0b0f] via-[#0b0b0fcc] to-[#0b0b0f55]" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0f] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 max-w-[1290px] mx-auto px-6 sm:px-12 flex flex-col justify-center"
        style={{ minHeight: "65vh", paddingTop: "6rem", paddingBottom: "4rem" }}
      >
        <div className="max-w-2xl space-y-6">
          {/* Tag */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-500 ${
              animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
            style={{
              borderColor: slide.accent,
              color: slide.accent,
              background: `${slide.accent}18`,
            }}
          >
            {slide.tag}
          </div>

          {/* Date */}
          <p
            className={`text-gray-400 text-sm font-medium tracking-wide transition-all duration-500 delay-75 ${
              animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            {slide.date}
          </p>

          {/* Title */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight text-white transition-all duration-500 delay-100 ${
              animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            {slide.title}
            <br />
            <span style={{ color: slide.accent }}>{slide.highlight}</span>
          </h1>

          {/* Description */}
          <p
            className={`text-gray-300 text-base sm:text-lg leading-relaxed max-w-lg transition-all duration-500 delay-150 ${
              animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            {slide.desc}
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-wrap gap-4 pt-2 transition-all duration-500 delay-200 ${
              animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <Link
              href="/events"
              className="px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
              style={{ background: slide.accent }}
            >
              {slide.cta}
            </Link>
            <Link
              href="/events"
              className="px-8 py-3.5 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all"
            >
              Browse All Events
            </Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-3 mt-12">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? "2.5rem" : "0.5rem",
                height: "0.5rem",
                background:
                  i === current ? slide.accent : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
          <span className="ml-2 text-gray-500 text-sm">
            {current + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}