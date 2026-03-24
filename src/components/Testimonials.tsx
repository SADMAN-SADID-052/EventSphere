"use client";
import { useState } from "react";

const testimonials = [
  {
    name: "Rafiul Islam",
    role: "Event Organizer",
    avatar: "RI",
    rating: 5,
    text: "EventSphere made organizing our tech conference incredibly easy. Ticket sales, attendee management, everything in one place. We sold out in 3 days!",
    event: "Tech Summit Bangladesh 2025",
    accent: "#605DFF",
  },
  {
    name: "Tasnim Akter",
    role: "Music Enthusiast",
    avatar: "TA",
    rating: 5,
    text: "I discovered Soundwave Festival through EventSphere and it was the best night of my life. The booking process was smooth and the e-ticket worked perfectly.",
    event: "Soundwave Festival 2025",
    accent: "#E85D24",
  },
  {
    name: "Sabbir Hossain",
    role: "Startup Founder",
    avatar: "SH",
    rating: 5,
    text: "We hosted our startup demo day on EventSphere. The dashboard analytics helped us understand our audience better. Highly recommended for any organizer!",
    event: "Startup Demo Day Chittagong",
    accent: "#0F9F7B",
  },
  {
    name: "Nusrat Jahan",
    role: "Art Lover",
    avatar: "NJ",
    rating: 5,
    text: "Found the Art Gala through EventSphere's recommendation. The AI suggested it based on my interests — it was spot on! Will definitely use it again.",
    event: "Art Gala Dhaka 2025",
    accent: "#F59E0B",
  },
  {
    name: "Mehedi Hasan",
    role: "Corporate Manager",
    avatar: "MH",
    rating: 5,
    text: "Booked tickets for our entire team of 50 people. The group booking feature saved us so much time. Great platform with excellent customer support.",
    event: "Leadership Summit 2025",
    accent: "#EC4899",
  },
  {
    name: "Fahmida Sultana",
    role: "University Student",
    avatar: "FS",
    rating: 5,
    text: "As a student, I love the student discount feature. Found so many affordable workshops and seminars on EventSphere. It's my go-to app for events!",
    event: "Design Workshop Dhaka",
    accent: "#06B6D4",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const visible = 3;

  const prev = () =>
    setActive((p) => (p === 0 ? testimonials.length - visible : p - 1));
  const next = () =>
    setActive((p) => (p >= testimonials.length - visible ? 0 : p + 1));

  const shown = testimonials.slice(active, active + visible);

  return (
    <section className="bg-[#0b0b0f] py-20 px-6 sm:px-12">
      <div className="max-w-[1290px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#605DFF] font-semibold text-sm tracking-widest uppercase mb-2">
              What People Say
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Real <span className="text-[#605DFF]">Reviews</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-xl border border-white/10 hover:border-[#605DFF] text-white hover:text-[#605DFF] transition-all flex items-center justify-center text-lg"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-xl border border-white/10 hover:border-[#605DFF] text-white hover:text-[#605DFF] transition-all flex items-center justify-center text-lg"
            >
              →
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-white/5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
              style={{ background: `${t.accent}08` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  `${t.accent}66`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(255,255,255,0.05)";
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-sm">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &quot;{t.text}&quot;
              </p>

              <span
                className="text-xs font-semibold px-3 py-1 rounded-full self-start"
                style={{
                  background: `${t.accent}18`,
                  color: t.accent,
                }}
              >
                {t.event}
              </span>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
                  style={{
                    background: `${t.accent}25`,
                    color: t.accent,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: testimonials.length - visible + 1 }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "2rem" : "0.5rem",
                  height: "0.5rem",
                  background:
                    i === active ? "#605DFF" : "rgba(255,255,255,0.2)",
                }}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
