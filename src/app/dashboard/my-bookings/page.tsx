"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setBookings(data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Booking cancelled!");
        fetchBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white">My Bookings</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage all your event bookings
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-24 bg-[#13131a] rounded-2xl animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-[#13131a] rounded-2xl border border-white/5">
            <p className="text-5xl mb-4">🎟️</p>
            <p className="text-white font-bold text-xl">No bookings yet</p>
            <p className="text-gray-400 text-sm mt-2 mb-6">
              Browse events and book your first ticket!
            </p>
            <Link
              href="/events"
              className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 inline-block"
              style={{ background: "#605DFF" }}
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-[#13131a] rounded-2xl border border-white/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-white/10 transition-all"
              >
                {/* Event Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-base">
                      {booking.itemId?.title || "Event"}
                    </h3>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background:
                          booking.status === "confirmed"
                            ? "#0F9F7B20"
                            : booking.status === "pending"
                            ? "#F59E0B20"
                            : "#E85D2420",
                        color:
                          booking.status === "confirmed"
                            ? "#0F9F7B"
                            : booking.status === "pending"
                            ? "#F59E0B"
                            : "#E85D24",
                      }}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span>📅 {booking.itemId?.date}</span>
                    <span>📍 {booking.itemId?.location}</span>
                    <span>🎫 {booking.quantity} ticket(s)</span>
                    <span>💰 ৳ {booking.price}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/events/${booking.itemId?._id}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-white/10 text-gray-400 hover:border-[#605DFF] hover:text-[#605DFF] transition-all"
                  >
                    View Event
                  </Link>
                  {booking.status !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}