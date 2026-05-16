"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const COLORS = ["#605DFF", "#E85D24", "#0F9F7B", "#F59E0B", "#EC4899", "#06B6D4"];

export default function DashboardCharts() {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/dashboard/chart-data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setChartData(data.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchChartData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-64 bg-[#13131a] rounded-2xl animate-pulse border border-white/5" />
        ))}
      </div>
    );
  }

  // Format bookings per month
  const bookingsPerMonth = chartData?.bookingsPerMonth?.map((item: any) => ({
    month: MONTHS[item._id - 1],
    bookings: item.total,
    revenue: item.revenue,
  })) || [];

  // Format events by category
  const eventsByCategory = chartData?.eventsByCategory?.map((item: any) => ({
    name: item._id,
    value: item.count,
  })) || [];

  // Format bookings by status
  const bookingsByStatus = chartData?.bookingsByStatus?.map((item: any) => ({
    name: item._id,
    value: item.count,
  })) || [];

  return (
    <div className="space-y-6">
      <h3 className="text-white font-black text-xl">📊 Analytics</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart — Bookings Per Month */}
        <div className="bg-[#13131a] rounded-2xl border border-white/5 p-6">
          <h4 className="text-white font-bold text-base mb-4">
            Monthly Bookings
          </h4>
          {bookingsPerMonth.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-500 text-sm">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={bookingsPerMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 12 }} />
                <YAxis tick={{ fill: "#666", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "#13131a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                />
                <Bar dataKey="bookings" fill="#605DFF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Line Chart — Revenue */}
        <div className="bg-[#13131a] rounded-2xl border border-white/5 p-6">
          <h4 className="text-white font-bold text-base mb-4">
            Monthly Revenue (৳)
          </h4>
          {bookingsPerMonth.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-500 text-sm">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={bookingsPerMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 12 }} />
                <YAxis tick={{ fill: "#666", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "#13131a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0F9F7B"
                  strokeWidth={2}
                  dot={{ fill: "#0F9F7B", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie Chart — Events by Category */}
        <div className="bg-[#13131a] rounded-2xl border border-white/5 p-6">
          <h4 className="text-white font-bold text-base mb-4">
            Events by Category
          </h4>
          {eventsByCategory.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-500 text-sm">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={eventsByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {eventsByCategory.map((_: any, index: number) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#13131a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: "#aaa", fontSize: "12px" }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie Chart — Bookings by Status */}
        <div className="bg-[#13131a] rounded-2xl border border-white/5 p-6">
          <h4 className="text-white font-bold text-base mb-4">
            Bookings by Status
          </h4>
          {bookingsByStatus.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-500 text-sm">
              No data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={bookingsByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {bookingsByStatus.map((item: any, index: number) => (
                    <Cell
                      key={index}
                      fill={
                        item.name === "confirmed"
                          ? "#0F9F7B"
                          : item.name === "pending"
                          ? "#F59E0B"
                          : "#E85D24"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#13131a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "white",
                  }}
                />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: "#aaa", fontSize: "12px" }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}