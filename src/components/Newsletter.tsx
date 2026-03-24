"use client";
import { useState } from "react";
import Link from "next/link";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="bg-[#0b0b0f] py-20 px-6 sm:px-12">
      <div className="max-w-[1290px] mx-auto">
    
        <div
          className="rounded-3xl p-10 sm:p-16 mb-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #605DFF15 0%, #E85D2415 100%)",
            border: "1px solid rgba(96,93,255,0.2)",
          }}
        >
          {/* Background decorations */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
            style={{ background: "#605DFF" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10"
            style={{ background: "#E85D24" }}
          />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <p className="text-[#605DFF] font-semibold text-sm tracking-widest uppercase mb-3">
              Stay In The Loop
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Never Miss an <span className="text-[#605DFF]">Event</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Subscribe to our newsletter and get the latest events, exclusive
              deals, and early bird offers delivered straight to your inbox.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                  style={{ background: "#605DFF" }}
                >
                  {loading ? "Subscribing..." : "Subscribe Now"}
                </button>
              </form>
            ) : (
              <div
                className="flex items-center justify-center gap-3 py-4 px-8 rounded-xl mx-auto w-fit"
                style={{ background: "#0F9F7B18", border: "1px solid #0F9F7B44" }}
              >
                <span className="text-2xl">🎉</span>
                <p className="text-[#0F9F7B] font-bold">
                  You are subscribed! Welcome to EventSphere.
                </p>
              </div>
            )}

            <p className="text-gray-600 text-xs mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    
          <div
            className="rounded-3xl p-8 flex flex-col gap-4 border border-white/5 hover:border-[#605DFF]/50 transition-all duration-300 hover:-translate-y-1"
            style={{ background: "#605DFF12" }}
          >
            <span className="text-4xl">🎪</span>
            <h3 className="text-white font-black text-2xl">
              Organize an Event
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Have an event idea? Create and publish your event in minutes.
              Reach thousands of attendees across Bangladesh.
            </p>
            <Link
              href="/register"
              className="self-start px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
              style={{ background: "#605DFF" }}
            >
              Start Organizing →
            </Link>
          </div>

          {/* Attendee CTA */}
          <div
            className="rounded-3xl p-8 flex flex-col gap-4 border border-white/5 hover:border-[#E85D24]/50 transition-all duration-300 hover:-translate-y-1"
            style={{ background: "#E85D2412" }}
          >
            <span className="text-4xl">🎟️</span>
            <h3 className="text-white font-black text-2xl">
              Explore Events
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover hundreds of events near you. Music, tech, art, sports —
              find your next unforgettable experience today.
            </p>
            <Link
              href="/events"
              className="self-start px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
              style={{ background: "#E85D24" }}
            >
              Browse Events →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}