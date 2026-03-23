"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0b0f]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1290px] mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white font-black text-xl tracking-tight">
          Event<span className="text-[#605DFF]">Sphere</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-300 hover:text-white text-sm font-medium transition">Home</Link>
          <Link href="/events" className="text-gray-300 hover:text-white text-sm font-medium transition">Events</Link>
          <Link href="/about" className="text-gray-300 hover:text-white text-sm font-medium transition">About</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white text-sm font-medium transition">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-gray-300 hover:text-white text-sm font-medium transition px-4 py-2">
            Login
          </Link>
          <Link href="/register" className="bg-[#605DFF] hover:bg-[#4f4cd4] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0b0b0f] border-t border-white/10 px-6 py-4 space-y-4">
          <Link href="/" className="block text-gray-300 hover:text-white text-sm font-medium">Home</Link>
          <Link href="/events" className="block text-gray-300 hover:text-white text-sm font-medium">Events</Link>
          <Link href="/about" className="block text-gray-300 hover:text-white text-sm font-medium">About</Link>
          <Link href="/contact" className="block text-gray-300 hover:text-white text-sm font-medium">Contact</Link>
          <div className="flex gap-3 pt-2">
            <Link href="/login" className="text-gray-300 text-sm font-medium">Login</Link>
            <Link href="/register" className="bg-[#605DFF] text-white text-sm font-bold px-4 py-2 rounded-xl">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}