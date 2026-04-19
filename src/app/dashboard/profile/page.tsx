"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData({
        name: parsed.name || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        avatar: parsed.avatar || "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        const updatedUser = { ...user, ...formData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        window.dispatchEvent(new Event("storage"));
        toast.success("Profile updated successfully! ✅");
        setEditing(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white">My Profile</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage your personal information
          </p>
        </div>

        {/* Avatar + Info */}
        <div className="bg-[#13131a] rounded-2xl border border-white/5 p-6">
          <div className="flex items-center gap-6 mb-6">
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt={formData.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
            ) : (
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black"
                style={{ background: "#605DFF25", color: "#605DFF" }}
              >
                {formData.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="text-white font-black text-xl">{formData.name}</h3>
              <p className="text-gray-400 text-sm">{formData.email}</p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block"
                style={{
                  background: user?.role === "ADMIN" ? "#E85D2420" : "#605DFF20",
                  color: user?.role === "ADMIN" ? "#E85D24" : "#605DFF",
                }}
              >
                {user?.role}
              </span>
            </div>
          </div>

          {!editing ? (
            <div className="space-y-4">
              {[
                { label: "Full Name", value: formData.name, icon: "👤" },
                { label: "Email", value: formData.email, icon: "📧" },
                { label: "Phone", value: formData.phone || "Not set", icon: "📞" },
                { label: "Avatar URL", value: formData.avatar || "Not set", icon: "🖼️" },
              ].map((field, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/5"
                >
                  <span className="text-lg">{field.icon}</span>
                  <div>
                    <p className="text-gray-500 text-xs">{field.label}</p>
                    <p className="text-white text-sm font-medium truncate">
                      {field.value}
                    </p>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setEditing(true)}
                className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                style={{ background: "#605DFF" }}
              >
                Edit Profile ✏️
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+880 1700-000000"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                  Avatar URL
                </label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 disabled:opacity-70"
                  style={{ background: "#605DFF" }}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-gray-400 border border-white/10 hover:border-white/30 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}