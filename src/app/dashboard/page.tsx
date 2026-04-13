"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";

interface Stats {
  totalUsers: number;
  totalEvents: number;
  totalBookings: number;
  totalReviews: number;
  totalRevenue: number;
}

function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setStats(data.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-[#13131a] rounded-2xl h-32 animate-pulse border border-white/5" />
        ))}
      </div>
    );
  }

  const cards = [
    { label: "Total Users", value: stats?.totalUsers || 0, icon: "👥", accent: "#605DFF", href: "/dashboard/manage-users" },
    { label: "Total Events", value: stats?.totalEvents || 0, icon: "🎪", accent: "#E85D24", href: "/dashboard/manage-events" },
    { label: "Total Bookings", value: stats?.totalBookings || 0, icon: "🎟️", accent: "#0F9F7B", href: "/dashboard/my-bookings" },
    { label: "Total Revenue", value: `৳ ${stats?.totalRevenue?.toLocaleString() || 0}`, icon: "💰", accent: "#F59E0B", href: "/dashboard" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className="p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 block"
            style={{ background: `${card.accent}10` }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{card.icon}</span>
              <span
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{ background: `${card.accent}20`, color: card.accent }}
              >
                Total
              </span>
            </div>
            <p className="text-2xl font-black text-white mb-1">{card.value}</p>
            <p className="text-gray-500 text-sm">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-[#13131a] rounded-2xl border border-white/5 p-6">
        <h3 className="text-white font-black text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Add Event", icon: "➕", href: "/dashboard/manage-events", accent: "#605DFF" },
            { label: "Manage Users", icon: "👥", href: "/dashboard/manage-users", accent: "#E85D24" },
            { label: "View Bookings", icon: "🎟️", href: "/dashboard/my-bookings", accent: "#0F9F7B" },
            { label: "Browse Events", icon: "🔍", href: "/events", accent: "#F59E0B" },
          ].map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 text-center"
              style={{ background: `${action.accent}08` }}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-gray-400 text-xs font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserOverview() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchBookings();
  }, []);

  const cards = [
    { label: "My Bookings", value: bookings.length, icon: "🎟️", accent: "#605DFF" },
    { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, icon: "✅", accent: "#0F9F7B" },
    { label: "Pending", value: bookings.filter((b) => b.status === "pending").length, icon: "⏳", accent: "#F59E0B" },
    { label: "Cancelled", value: bookings.filter((b) => b.status === "cancelled").length, icon: "❌", accent: "#E85D24" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-white/5 transition-all hover:-translate-y-1"
            style={{ background: `${card.accent}10` }}
          >
            <span className="text-2xl block mb-4">{card.icon}</span>
            <p className="text-2xl font-black text-white mb-1">{card.value}</p>
            <p className="text-gray-500 text-sm">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-[#13131a] rounded-2xl border border-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-black text-lg">Recent Bookings</h3>
          <Link href="/dashboard/my-bookings" className="text-[#605DFF] text-sm hover:underline">
            View All →
          </Link>
        </div>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-2">🎟️</p>
            <p className="text-gray-500 text-sm">No bookings yet</p>
            <Link href="/events" className="text-[#605DFF] text-sm hover:underline mt-1 block">
              Browse Events →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5"
              >
                <div>
                  <p className="text-white font-bold text-sm">{booking.itemId?.title}</p>
                  <p className="text-gray-500 text-xs">{booking.itemId?.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">৳ {booking.price}</p>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: booking.status === "confirmed" ? "#0F9F7B20" : booking.status === "pending" ? "#F59E0B20" : "#E85D2420",
                      color: booking.status === "confirmed" ? "#0F9F7B" : booking.status === "pending" ? "#F59E0B" : "#E85D24",
                    }}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="bg-[#13131a] rounded-2xl border border-white/5 p-6">
        <h3 className="text-white font-black text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Browse Events", icon: "🔍", href: "/events", accent: "#605DFF" },
            { label: "My Bookings", icon: "🎟️", href: "/dashboard/my-bookings", accent: "#E85D24" },
            { label: "My Reviews", icon: "⭐", href: "/dashboard/my-reviews", accent: "#0F9F7B" },
          ].map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 text-center"
              style={{ background: `${action.accent}08` }}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-gray-400 text-xs font-medium">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-black text-white">
            Welcome back, {user?.name?.split(" ")[0]}! 👋
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Here's what's happening with your account today.
          </p>
        </div>

        {user?.role === "ADMIN" ? <AdminOverview /> : <UserOverview />}
      </div>
    </DashboardLayout>
  );
}