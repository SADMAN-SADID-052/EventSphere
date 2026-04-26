"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    bookingConfirmation: true,
    eventReminders: true,
    newsletter: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Password updated successfully! ✅");
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setLoading(false);
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({ ...notifications, [key]: !notifications[key as keyof typeof notifications] });
    toast.success("Notification preference updated!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white">Settings</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Change Password */}
        <div className="bg-[#13131a] rounded-2xl border border-white/5 p-6">
          <h3 className="text-white font-black text-lg mb-5">🔐 Change Password</h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Min. 6 characters"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm font-medium mb-1.5 block">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                required
                placeholder="Repeat new password"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 disabled:opacity-70"
              style={{ background: "#605DFF" }}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className="bg-[#13131a] rounded-2xl border border-white/5 p-6">
          <h3 className="text-white font-black text-lg mb-5">🔔 Notifications</h3>
          <div className="space-y-4">
            {[
              { key: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email" },
              { key: "bookingConfirmation", label: "Booking Confirmation", desc: "Get notified when booking is confirmed" },
              { key: "eventReminders", label: "Event Reminders", desc: "Reminders before your events start" },
              { key: "newsletter", label: "Newsletter", desc: "Receive our weekly newsletter" },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all"
              >
                <div>
                  <p className="text-white font-bold text-sm">{item.label}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleNotificationChange(item.key)}
                  className="relative w-12 h-6 rounded-full transition-all duration-300"
                  style={{
                    background: notifications[item.key as keyof typeof notifications]
                      ? "#605DFF"
                      : "rgba(255,255,255,0.1)",
                  }}
                >
                  <span
                    className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300"
                    style={{
                      left: notifications[item.key as keyof typeof notifications] ? "1.75rem" : "0.25rem",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-[#13131a] rounded-2xl border border-red-500/20 p-6">
          <h3 className="text-red-400 font-black text-lg mb-2">⚠️ Danger Zone</h3>
          <p className="text-gray-500 text-sm mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button
            onClick={() => toast.error("Account deletion is disabled in demo mode.")}
            className="px-6 py-3 rounded-xl font-bold text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all text-sm"
          >
            Delete Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}