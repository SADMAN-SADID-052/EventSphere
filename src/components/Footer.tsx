import Link from "next/link";
import { FaFacebook, FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="bg-[#0d0d12] border-t border-white/5 px-6 sm:px-12 pt-16 pb-8">
      <div className="max-w-[1290px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <Link
              href="/"
              className="text-white font-black text-2xl tracking-tight"
            >
              Event<span className="text-[#605DFF]">Sphere</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Discover, create, and manage events effortlessly. Connecting
              communities across Bangladesh.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg border border-white/10 hover:border-[#605DFF] hover:text-[#605DFF] text-gray-500 flex items-center justify-center transition-all"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg border border-white/10 hover:border-[#605DFF] hover:text-[#605DFF] text-gray-500 flex items-center justify-center transition-all"
              >
                <FaXTwitter size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg border border-white/10 hover:border-[#605DFF] hover:text-[#605DFF] text-gray-500 flex items-center justify-center transition-all"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg border border-white/10 hover:border-[#605DFF] hover:text-[#605DFF] text-gray-500 flex items-center justify-center transition-all"
              >
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Create Event
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase">
              Categories
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/events"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Music & Concerts
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Tech & Innovation
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Art & Culture
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Sports & Fitness
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Food & Lifestyle
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  Education & Workshop
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm tracking-widest uppercase">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-base mt-0.5">📍</span>
                <span className="text-gray-500 text-sm">
                  House 12, Road 4, Dhanmondi, Dhaka-1205
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-base">📧</span>
                <a
                  href="mailto:support@eventsphere.com"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  support@eventsphere.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-base">📞</span>
                <a
                  href="tel:+8801700000000"
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  +880 1700-000000
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2025 EventSphere. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-white text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-white text-xs transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/help"
              className="text-gray-600 hover:text-white text-xs transition-colors"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
