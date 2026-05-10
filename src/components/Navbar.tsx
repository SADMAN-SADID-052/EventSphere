"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    toast.success("Logged out successfully!");
    router.push("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0b0f]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1290px] mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white font-black text-xl tracking-tight">
          Event<span className="text-[#605DFF]">Sphere</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-300 hover:text-white text-sm font-medium transition"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="text-gray-300 hover:text-white text-sm font-medium transition"
          >
            Events
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-white text-sm font-medium transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-300 hover:text-white text-sm font-medium transition"
          >
            Contact
          </Link>
          {user && (
            <>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white text-sm font-medium transition"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/my-bookings"
                className="text-gray-300 hover:text-white text-sm font-medium transition"
              >
                My Bookings
              </Link>
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-9 h-9 rounded-xl border border-white/10 hover:border-[#605DFF] text-gray-400 hover:text-[#605DFF] flex items-center justify-center transition-all"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:border-[#605DFF] transition-all"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#605DFF] flex items-center justify-center text-xs font-black">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-white text-sm font-medium">
                  {user.name}
                </span>
                <span className="text-gray-400 text-xs">
                  {dropdownOpen ? "▲" : "▼"}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-[#13131a] border border-white/10 rounded-2xl overflow-hidden shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-white text-sm font-bold">{user.name}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                      style={{
                        background:
                          user.role === "ADMIN" ? "#E85D2420" : "#605DFF20",
                        color: user.role === "ADMIN" ? "#E85D24" : "#605DFF",
                      }}
                    >
                      {user.role}
                    </span>
                  </div>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                  >
                    👤 Profile
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                  >
                    📊 Dashboard
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                  >
                    ⚙️ Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/5 text-sm transition-all border-t border-white/5"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:text-white text-sm font-medium transition px-4 py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#605DFF] hover:bg-[#4f4cd4] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0b0b0f] border-t border-white/10 px-6 py-4 space-y-4">
          <Link
            href="/"
            className="block text-gray-300 hover:text-white text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/events"
            className="block text-gray-300 hover:text-white text-sm font-medium"
          >
            Events
          </Link>
          <Link
            href="/about"
            className="block text-gray-300 hover:text-white text-sm font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-gray-300 hover:text-white text-sm font-medium"
          >
            Contact
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="block text-gray-300 hover:text-white text-sm font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block text-red-400 text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="text-gray-300 text-sm font-medium">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#605DFF] text-white text-sm font-bold px-4 py-2 rounded-xl"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
