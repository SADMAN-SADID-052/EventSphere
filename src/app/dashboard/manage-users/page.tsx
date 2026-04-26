"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import toast from "react-hot-toast";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUsers(data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/role", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, role }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Role updated successfully! ✅");
        fetchUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("User deleted!");
        fetchUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white">Manage Users</h2>
          <p className="text-gray-400 text-sm mt-1">
            View and manage all registered users
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-96 px-4 py-3 rounded-xl bg-[#13131a] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Users", value: users.length, accent: "#605DFF" },
            { label: "Admins", value: users.filter((u) => u.role === "ADMIN").length, accent: "#E85D24" },
            { label: "Regular Users", value: users.filter((u) => u.role === "USER").length, accent: "#0F9F7B" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-white/5 text-center"
              style={{ background: `${stat.accent}10` }}
            >
              <p className="text-2xl font-black" style={{ color: stat.accent }}>
                {stat.value}
              </p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-16 bg-[#13131a] rounded-2xl animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-20 bg-[#13131a] rounded-2xl border border-white/5">
            <p className="text-5xl mb-4">👥</p>
            <p className="text-white font-bold text-xl">No users found</p>
          </div>
        ) : (
          <div className="bg-[#13131a] rounded-2xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-gray-500 text-xs font-bold px-6 py-4 uppercase tracking-wider">User</th>
                    <th className="text-left text-gray-500 text-xs font-bold px-6 py-4 uppercase tracking-wider">Email</th>
                    <th className="text-left text-gray-500 text-xs font-bold px-6 py-4 uppercase tracking-wider">Role</th>
                    <th className="text-left text-gray-500 text-xs font-bold px-6 py-4 uppercase tracking-wider">Joined</th>
                    <th className="text-left text-gray-500 text-xs font-bold px-6 py-4 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-white/5 hover:bg-white/2 transition-all"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-9 h-9 rounded-xl object-cover"
                            />
                          ) : (
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black"
                              style={{ background: "#605DFF25", color: "#605DFF" }}
                            >
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <p className="text-white font-bold text-sm">{user.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{user.email}</td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold border transition-all bg-transparent"
                          style={{
                            borderColor: user.role === "ADMIN" ? "#E85D24" : user.role === "MANAGER" ? "#0F9F7B" : "#605DFF",
                            color: user.role === "ADMIN" ? "#E85D24" : user.role === "MANAGER" ? "#0F9F7B" : "#605DFF",
                          }}
                        >
                          <option value="USER">USER</option>
                          <option value="MANAGER">MANAGER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}