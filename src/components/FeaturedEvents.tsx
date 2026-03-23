"use client";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "Soundwave Festival 2025",
    category: "Music",
    date: "12-14 April 2025",
    location: "Dhaka Stadium",
    price: "৳ 1,500",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&auto=format&fit=crop&q=80",
    accent: "#E85D24",
  },
  {
    id: 2,
    title: "Tech Summit Bangladesh",
    category: "Technology",
    date: "20–22 May 2025",
    location: "BICC, Dhaka",
    price: "৳ 2,000",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
    accent: "#605DFF",
  },
  {
    id: 3,
    title: "Art Gala Dhaka 2025",
    category: "Art & Culture",
    date: "5–7 June 2025",
    location: "National Museum",
    price: "৳ 800",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&auto=format&fit=crop&q=80",
    accent: "#0F9F7B",
  },
  {
    id: 4,
    title: "Startup Demo Day",
    category: "Business",
    date: "15 July 2025",
    location: "GPH, Chittagong",
    price: "Free",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&auto=format&fit=crop&q=80",
    accent: "#F59E0B",
  },
];

export default function FeaturedEvents() {
  return (
    <section className="bg-[#0b0b0f] py-20 px-6 sm:px-12">
      <div className="max-w-[1290px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[#605DFF] font-semibold text-sm tracking-widest uppercase mb-2">
              Do not Miss Out
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
              Featured <span className="text-[#605DFF]">Events</span>
            </h2>
          </div>
          <Link
            href="/events"
            className="text-gray-400 hover:text-white text-sm font-medium border border-white/10 hover:border-white/30 px-5 py-2.5 rounded-xl transition-all"
          >
            View All Events →
          </Link>
        </div>

        {/* Cards*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="group bg-[#13131a] rounded-2xl overflow-hidden border border-white/5  transition-all duration-300 hover:-translate-y-1"
              style={{
                color: "white",
                border: `1px solid ${event.accent}44`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.border =
                  `1px solid ${event.accent}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.border =
                  `1px solid ${event.accent}44`;
              }}
            >
            
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#13131a] via-transparent to-transparent" />
            
                <span
                  className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    background: `${event.accent}`,
                    color: "white",
                    border: `1px solid ${event.accent}44`,
                  }}
                >
                  {event.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h3 className="text-white font-bold text-base leading-tight group-hover:text-[#605DFF] transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-1.5">
                  <p className="text-gray-400 text-xs flex items-center gap-2">
                    <span>📅</span> {event.date}
                  </p>
                  <p className="text-gray-400 text-xs flex items-center gap-2">
                    <span>📍</span> {event.location}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-white font-bold text-sm">
                    {event.price}
                  </span>
                  <Link
                    href={`/events/${event.id}`}
                    className="text-xs font-semibold px-4 py-1.5 rounded-lg transition-all hover:scale-105 border-1 border-[#605DFF]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
