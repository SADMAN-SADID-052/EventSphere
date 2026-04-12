"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const userMenus = [
  { icon: "📊", label: "Overview", href: "/dashboard" },
  { icon: "👤", label: "My Profile", href: "/dashboard/profile" },
  { icon: "🎟️", label: "My Bookings", href: "/dashboard/my-bookings" },
  { icon: "⭐", label: "My Reviews", href: "/dashboard/my-reviews" },
  { icon: "⚙️", label: "Settings", href: "/dashboard/settings" },
];

const adminMenus = [
  { icon: "📊", label: "Overview", href: "/dashboard" },
  { icon: "👤", label: "My Profile", href: "/dashboard/profile" },
  { icon: "🎪", label: "Manage Events", href: "/dashboard/manage-events" },
  { icon: "👥", label: "Manage Users", href: "/dashboard/manage-users" },
  { icon: "🎟️", label: "My Bookings", href: "/dashboard/my-bookings" },
  { icon: "⭐", label: "My Reviews", href: "/dashboard/my-reviews" },
  { icon: "⚙️", label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#605DFF] border-t-transparent animate-spin" />
      </div>
    );
  }

  const menus = user.role === "ADMIN" ? adminMenus : userMenus;

  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-16 flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-[#0d0d12] border-r border-white/5 z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* User Info */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
              style={{ background: "#605DFF25", color: "#605DFF" }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">{user.name}</p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: user.role === "ADMIN" ? "#E85D2420" : "#605DFF20",
                  color: user.role === "ADMIN" ? "#E85D24" : "#605DFF",
                }}
              >
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: pathname === menu.href ? "#605DFF20" : "transparent",
                color: pathname === menu.href ? "#605DFF" : "#888",
                borderLeft: pathname === menu.href ? "3px solid #605DFF" : "3px solid transparent",
              }}
            >
              <span>{menu.icon}</span>
              {menu.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* Dashboard Navbar */}
        <div className="bg-[#0d0d12] border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-white"
          >
            ☰
          </button>
          <h1 className="text-white font-bold text-lg">
            {menus.find((m) => m.href === pathname)?.label || "Dashboard"}
          </h1>

          {/* Navbar Right */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
              style={{ background: "#605DFF25", color: "#605DFF" }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}