"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        toast.error(data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data));
      toast.success("Welcome back! Login successful 🎉");
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-white font-black text-3xl">
            Event<span className="text-[#605DFF]">Sphere</span>
          </Link>
          <p className="text-gray-400 mt-2 text-sm">
            Welcome back! Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#13131a] rounded-2xl border border-white/5 p-8">
          {/* Demo Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => handleDemoLogin("user@example.com", "123456")}
              className="flex-1 py-2 rounded-xl text-xs font-bold border border-white/10 text-gray-400 hover:border-[#605DFF] hover:text-[#605DFF] transition-all"
            >
              👤 User Demo
            </button>
            <button
              onClick={() => handleDemoLogin("admin@gmail.com", "123456")}
              className="flex-1 py-2 rounded-xl text-xs font-bold border border-white/10 text-gray-400 hover:border-[#E85D24] hover:text-[#E85D24] transition-all"
            >
              🔑 Admin Demo
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-gray-600 text-xs">or sign in manually</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              style={{ background: "#605DFF" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Google Login */}
          <button className="w-full mt-4 py-3 rounded-xl border border-white/10 text-gray-400 hover:border-white/30 hover:text-white transition-all text-sm font-medium flex items-center justify-center gap-2">
            <span>🌐</span> Continue with Google
          </button>

          {/* Register link */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Do not have an account?{" "}
            <Link
              href="/register"
              className="text-[#605DFF] hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}