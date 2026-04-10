"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const team = [
  {
    name: "Sadman Sadid",
    role: "Founder & CEO",
    avatar: "SS",
    bio: "Passionate about connecting communities through meaningful events.",
    accent: "#605DFF",
  },
  {
    name: "Rakib Hossain",
    role: "Head of Design",
    avatar: "RH",
    bio: "Creating beautiful experiences that make events unforgettable.",
    accent: "#E85D24",
  },
  {
    name: "Sajid Hossain",
    role: "Lead Developer",
    avatar: "SH",
    bio: "Building the technology that powers thousands of events.",
    accent: "#0F9F7B",
  },
  {
    name: "Nirob Hossain",
    role: "Community Manager",
    avatar: "NH",
    bio: "Helping organizers and attendees get the most out of EventSphere.",
    accent: "#F59E0B",
  },
];

const stats = [
  { value: 1200, suffix: "+", label: "Events Created", accent: "#605DFF" },
  { value: 50000, suffix: "+", label: "Happy Attendees", accent: "#E85D24" },
  { value: 30, suffix: "+", label: "Cities Covered", accent: "#0F9F7B" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", accent: "#F59E0B" },
];

const values = [
  {
    icon: "🎯",
    title: "Our Mission",
    desc: "To make event discovery and management effortless for everyone — from small community gatherings to large-scale conferences.",
    accent: "#605DFF",
  },
  {
    icon: "👁️",
    title: "Our Vision",
    desc: "A world where every person can easily find and attend events that enrich their lives and expand their horizons.",
    accent: "#E85D24",
  },
  {
    icon: "💎",
    title: "Our Values",
    desc: "We believe in transparency, community, and innovation. Every decision we make puts our users first.",
    accent: "#0F9F7B",
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
      { threshold: 0.3 },
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

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        transition: "all 0.6s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const [activeTeam, setActiveTeam] = useState(0);

  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-20">
      {/* Hero */}
      <div className="relative bg-[#0d0d12] border-b border-white/5 py-24 px-6 sm:px-12 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "#605DFF" }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "#E85D24" }}
        />
        <div className="max-w-322.5 mx-auto text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border mb-6"
            style={{
              borderColor: "#605DFF",
              color: "#605DFF",
              background: "#605DFF18",
            }}
          >
            🌟 Our Story
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-none">
            We Are{" "}
            <span
              className="relative inline-block"
              style={{ color: "#605DFF" }}
            >
              EventSphere
              <span
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
                style={{ background: "#605DFF" }}
              />
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Bangladesh is leading event management platform — connecting
            organizers and attendees to create unforgettable experiences since
            2023.
          </p>
        </div>
      </div>

      <div className="max-w-322.5 mx-auto px-6 sm:px-12 py-20 space-y-24">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div
                className="rounded-2xl p-8 border border-white/5 text-center hover:-translate-y-2 transition-all duration-300 group cursor-default"
                style={{ background: `${stat.accent}10` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    stat.accent;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(255,255,255,0.05)";
                }}
              >
                <p
                  className="text-4xl sm:text-5xl font-black mb-2"
                  style={{ color: "white" }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mission Vision Values */}
        <div>
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-white">
                What We <span className="text-[#605DFF]">Stand For</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div
                  className="rounded-2xl p-8 border border-white/5 hover:-translate-y-2 transition-all duration-300 group cursor-default h-full"
                  style={{ background: `${val.accent}08` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      `${val.accent}66`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "rgba(255,255,255,0.05)";
                  }}
                >
                  <span className="text-5xl mb-5 block group-hover:scale-110 transition-transform duration-300">
                    {val.icon}
                  </span>
                  <h3
                    className="font-black text-xl mb-3 transition-colors duration-300"
                    style={{ color: "white" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLHeadingElement).style.color =
                        val.accent;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLHeadingElement).style.color =
                        "white";
                    }}
                  >
                    {val.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Story */}
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#605DFF] font-semibold text-sm tracking-widest uppercase mb-3">
                Our Story
              </p>
              <h2 className="text-4xl font-black text-white mb-6">
                How It All <span className="text-[#605DFF]">Started</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  EventSphere was born out of frustration. Our founders
                  struggled to find and manage events in Bangladesh — there was
                  no single platform that made it easy for organizers and
                  attendees to connect.
                </p>
                <p>
                  In 2023, we set out to build something different. A platform
                  that puts the community first, with powerful tools for
                  organizers and a seamless experience for attendees.
                </p>
                <p>
                  Today, EventSphere hosts thousands of events across 30+ cities
                  in Bangladesh, from intimate workshops to massive concerts.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
              {[
                {
                  year: "2023",
                  event: "EventSphere Founded",
                  accent: "#605DFF",
                },
                { year: "2023", event: "First 100 Events", accent: "#E85D24" },
                { year: "2024", event: "10,000 Users", accent: "#0F9F7B" },
                { year: "2025", event: "50,000+ Attendees", accent: "#F59E0B" },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 mb-6 relative">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 border-2"
                    style={{
                      background: `${item.accent}20`,
                      borderColor: item.accent,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: item.accent }}
                    />
                  </div>
                  <div className="bg-[#13131a] rounded-xl p-4 border border-white/5 flex-1">
                    <p
                      className="font-black text-lg"
                      style={{ color: item.accent }}
                    >
                      {item.year}
                    </p>
                    <p className="text-gray-300 text-sm">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Team */}
        <div>
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-[#605DFF] font-semibold text-sm tracking-widest uppercase mb-3">
                The People
              </p>
              <h2 className="text-4xl font-black text-white">
                Meet Our <span className="text-[#605DFF]">Team</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Team List */}
            <div className="space-y-3">
              {team.map((member, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTeam(i)}
                  className="w-full text-left p-5 rounded-2xl border transition-all duration-300"
                  style={{
                    background:
                      activeTeam === i ? `${member.accent}12` : "#13131a",
                    borderColor:
                      activeTeam === i
                        ? member.accent
                        : "rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                      style={{
                        background: `${member.accent}25`,
                        color: member.accent,
                      }}
                    >
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-white font-bold">{member.name}</p>
                      <p className="text-sm" style={{ color: member.accent }}>
                        {member.role}
                      </p>
                    </div>
                    <span
                      className="ml-auto transition-all"
                      style={{
                        color: activeTeam === i ? member.accent : "#444",
                        transform:
                          activeTeam === i ? "translateX(4px)" : "none",
                      }}
                    >
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Team Detail */}
            <div
              className="rounded-2xl p-8 border flex flex-col items-center justify-center text-center transition-all duration-300"
              style={{
                background: `${team[activeTeam].accent}10`,
                borderColor: `${team[activeTeam].accent}33`,
              }}
            >
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-black mb-6"
                style={{
                  background: `${team[activeTeam].accent}25`,
                  color: team[activeTeam].accent,
                }}
              >
                {team[activeTeam].avatar}
              </div>
              <h3 className="text-white font-black text-2xl mb-1">
                {team[activeTeam].name}
              </h3>
              <p
                className="font-semibold mb-4"
                style={{ color: team[activeTeam].accent }}
              >
                {team[activeTeam].role}
              </p>
              <p className="text-gray-400 leading-relaxed">
                {team[activeTeam].bio}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <FadeIn>
          <div
            className="rounded-3xl p-12 sm:p-16 text-center border border-[#605DFF]/20 relative overflow-hidden"
            style={{ background: "#605DFF10" }}
          >
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
              style={{ background: "#605DFF" }}
            />
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 relative z-10">
              Ready to Get <span className="text-[#605DFF]">Started?</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
              Join thousands of organizers and attendees on EventSphere today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <Link
                href="/events"
                className="px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{ background: "#605DFF" }}
              >
                Browse Events
              </Link>
              <Link
                href="/register"
                className="px-8 py-3.5 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all"
              >
                Join Now
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
