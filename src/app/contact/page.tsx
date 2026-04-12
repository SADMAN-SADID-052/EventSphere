"use client";
import { useState } from "react";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: "📍",
    title: "Address",
    value: "House 12, Road 4, Dhanmondi, Dhaka-1205",
    accent: "#605DFF",
  },
  {
    icon: "📧",
    title: "Email",
    value: "support@eventsphere.com",
    accent: "#E85D24",
  },
  {
    icon: "📞",
    title: "Phone",
    value: "+880 1700-000000",
    accent: "#0F9F7B",
  },
  {
    icon: "🕐",
    title: "Working Hours",
    value: "Sat – Thu, 9AM – 6PM",
    accent: "#F59E0B",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent successfully! We'll get back to you soon. 🎉");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-20">
      {/* Hero */}
      <div className="relative bg-[#0d0d12] border-b border-white/5 py-20 px-6 sm:px-12 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "#605DFF" }}
        />
        <div className="max-w-322.5 mx-auto text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border mb-6"
            style={{
              borderColor: "#605DFF",
              color: "#605DFF",
              background: "#605DFF18",
            }}
          >
            💬 Get In Touch
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
            Contact <span className="text-[#605DFF]">Us</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a question or need help? We had love to hear from you. Send us a
            message and we'll respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="max-w-322.5 mx-auto px-6 sm:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left — Contact Info */}
          <div className="space-y-4">
            <h2 className="text-white font-black text-2xl mb-6">
              Let's Talk
            </h2>

            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 transition-all duration-300 hover:-translate-y-1"
                style={{ background: `${info.accent}08` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${info.accent}66`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: `${info.accent}20` }}
                >
                  {info.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium mb-1">
                    {info.title}
                  </p>
                  <p className="text-white text-sm font-medium">{info.value}</p>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-gray-500 text-sm mb-4">Follow us on</p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", icon: "FB", accent: "#605DFF" },
                  { label: "Twitter", icon: "TW", accent: "#E85D24" },
                  { label: "Instagram", icon: "IG", accent: "#0F9F7B" },
                  { label: "YouTube", icon: "YT", accent: "#F59E0B" },
                ].map((s) => (
                  <button
                    key={s.label}
                    className="w-10 h-10 rounded-xl border border-white/10 text-gray-500 flex items-center justify-center text-xs font-black transition-all duration-300 hover:-translate-y-1"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = s.accent;
                      (e.currentTarget as HTMLButtonElement).style.color = s.accent;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLButtonElement).style.color = "#666";
                    }}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#13131a] rounded-2xl border border-white/5 p-8">
              <h2 className="text-white font-black text-2xl mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0b0f] border border-white/10 text-gray-300 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Issue</option>
                    <option value="event">Event Management</option>
                    <option value="payment">Payment Problem</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: "#605DFF" }}
                >
                  {loading ? "Sending..." : "Send Message 🚀"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}