"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const categories = [
  "All",
  "Music",
  "Technology",
  "Art & Culture",
  "Sports",
  "Food & Lifestyle",
  "Education",
  "Business",
  "Theatre",
];

interface Event {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  location: string;
  date: string;
  availableSeats: number;
  rating: number;
  totalReviews: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 8;

  const fetchEvents = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/api/items?page=${page}&limit=${limit}&sort=${sort}`;
      if (search) url += `&search=${search}`;
      if (category !== "All") url += `&category=${category}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setEvents(data.data);
        setTotal(data.meta.total);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEvents();
  }, [search, category, sort, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-20">
      {/* Header */}
      <div className="bg-[#0d0d12] border-b border-white/5 py-12 px-6 sm:px-12">
        <div className="max-w-322.5 mx-auto">
          <p className="text-[#605DFF] font-semibold text-sm tracking-widest uppercase mb-2 text-center">
            Discover
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 text-center">
            All <span className="text-[#605DFF]">Events</span>
          </h1>
          <p className="text-gray-400 text-base  text-center">
            Browse and find events that match your interests.
          </p>
        </div>
      </div>

      <div className="max-w-322.5 mx-auto px-6 sm:px-12 py-10">
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 px-5 py-3 rounded-xl bg-[#13131a] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
          />
          <select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            className="px-5 py-3 rounded-xl bg-[#13131a] border border-white/10 text-gray-300 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
          >
            <option value="-createdAt">Newest First</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: category === cat ? "#605DFF" : "#13131a",
                color: category === cat ? "white" : "#888",
                border: category === cat ? "1px solid #605DFF" : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-gray-500 text-sm mb-6">
          Showing <span className="text-white font-bold">{events.length}</span> of{" "}
          <span className="text-white font-bold">{total}</span> events
        </p>

        {/*All  Events */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#13131a] rounded-2xl h-80 animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-white font-bold text-xl">No events found</p>
            <p className="text-gray-400 text-sm mt-2">Try different search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="group bg-[#13131a] rounded-2xl overflow-hidden border border-white/5 hover:border-[#605DFF]/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#13131a] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-[#605DFF20] text-[#605DFF] border border-[#605DFF44]">
                    {event.category}
                  </span>
                  {event.availableSeats === 0 && (
                    <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
                      Sold Out
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-white font-bold text-base leading-tight group-hover:text-[#605DFF] transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="space-y-1.5">
                    <p className="text-gray-400 text-xs flex items-center gap-2">
                      <span>📅</span> {event.date}
                    </p>
                    <p className="text-gray-400 text-xs flex items-center gap-2">
                      <span>📍</span> {event.location}
                    </p>
                    {event.rating > 0 && (
                      <p className="text-yellow-400 text-xs flex items-center gap-1">
                        ★ {event.rating} ({event.totalReviews} reviews)
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-white font-bold text-sm">
                      {event.price === 0 ? "Free" : `৳ ${event.price}`}
                    </span>
                    <Link
                      href={`/events/${event._id}`}
                      className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-[#605DFF] hover:bg-[#4f4cd4] transition-all hover:scale-105"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:border-[#605DFF] hover:text-[#605DFF] transition-all disabled:opacity-30 text-sm"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className="w-9 h-9 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: page === i + 1 ? "#605DFF" : "#13131a",
                  color: page === i + 1 ? "white" : "#888",
                  border: page === i + 1 ? "1px solid #605DFF" : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:border-[#605DFF] hover:text-[#605DFF] transition-all disabled:opacity-30 text-sm"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}