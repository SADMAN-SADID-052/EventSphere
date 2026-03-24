"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: "🎪",
    value: 1200,
    suffix: "+",
    label: "Events Created",
    accent: "#605DFF",
  },
  {
    icon: "👥",
    value: 50000,
    suffix: "+",
    label: "Happy Attendees",
    accent: "#E85D24",
  },
  {
    icon: "🏙️",
    value: 30,
    suffix: "+",
    label: "Cities Covered",
    accent: "#0F9F7B",
  },
  {
    icon: "🎟️",
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    accent: "#F59E0B",
  },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-[#0d0d12] py-20 px-6 sm:px-12">
      <div className="max-w-[1290px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#605DFF] font-semibold text-sm tracking-widest uppercase mb-2">
            Our Impact
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Numbers That <span className="text-[#605DFF]">Speak</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base max-w-xl mx-auto">
            EventSphere is growing every day — powering events across Bangladesh and beyond.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
              style={{
                background: `${stat.accent}10`,
                borderColor: `${stat.accent}30`,
              }}
            >
              <span className="text-4xl mb-4">{stat.icon}</span>
              <h3
                className="text-4xl sm:text-5xl font-black mb-2"
                style={{ color: stat.accent }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}