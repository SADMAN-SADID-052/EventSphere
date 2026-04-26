"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import toast from "react-hot-toast";

const categories = [
  "Music",
  "Technology",
  "Art & Culture",
  "Sports",
  "Food & Lifestyle",
  "Education",
  "Business",
  "Theatre",
  "Other",
];

const emptyForm = {
  title: "",
  description: "",
  image: "",
  price: "",
  category: "",
  location: "",
  date: "",
  totalSeats: "",
  availableSeats: "",
};

export default function ManageEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/items");
      const data = await res.json();
      if (data.success) setEvents(data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const url = editId
        ? `http://localhost:5000/api/items/${editId}`
        : "http://localhost:5000/api/items";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          totalSeats: Number(formData.totalSeats),
          availableSeats: Number(formData.availableSeats),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editId ? "Event updated! ✅" : "Event created! 🎉");
        setFormData(emptyForm);
        setShowForm(false);
        setEditId(null);
        fetchEvents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setSubmitting(false);
  };

  const handleEdit = (event: any) => {
    setFormData({
      title: event.title,
      description: event.description,
      image: event.image,
      price: event.price,
      category: event.category,
      location: event.location,
      date: event.date,
      totalSeats: event.totalSeats,
      availableSeats: event.availableSeats,
    });
    setEditId(event._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Event deleted!");
        fetchEvents();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Manage Events</h2>
            <p className="text-gray-400 text-sm mt-1">
              Create, edit and delete events
            </p>
          </div>
          <button
            onClick={() => {
              setFormData(emptyForm);
              setEditId(null);
              setShowForm(!showForm);
            }}
            className="px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
            style={{ background: showForm ? "#E85D24" : "#605DFF" }}
          >
            {showForm ? "✕ Cancel" : "+ Add Event"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-[#13131a] rounded-2xl border border-white/5 p-6">
            <h3 className="text-white font-black text-lg mb-5">
              {editId ? "Edit Event" : "Create New Event"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Event title"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0b0f] border border-white/10 text-gray-300 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Event location"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    placeholder="12-14 April 2025"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Price (৳)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Total Seats</label>
                  <input
                    type="number"
                    name="totalSeats"
                    value={formData.totalSeats}
                    onChange={handleChange}
                    required
                    placeholder="100"
                    min="1"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Available Seats</label>
                  <input
                    type="number"
                    name="availableSeats"
                    value={formData.availableSeats}
                    onChange={handleChange}
                    required
                    placeholder="100"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 block">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Event description..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 disabled:opacity-70"
                style={{ background: "#605DFF" }}
              >
                {submitting ? "Saving..." : editId ? "Update Event" : "Create Event"}
              </button>
            </form>
          </div>
        )}

        {/* Events Table */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-[#13131a] rounded-2xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-[#13131a] rounded-2xl border border-white/5">
            <p className="text-5xl mb-4">🎪</p>
            <p className="text-white font-bold text-xl">No events yet</p>
            <p className="text-gray-400 text-sm mt-2">Create your first event!</p>
          </div>
        ) : (
          <div className="bg-[#13131a] rounded-2xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-gray-500 text-xs font-bold px-6 py-4 uppercase tracking-wider">Event</th>
                    <th className="text-left text-gray-500 text-xs font-bold px-6 py-4 uppercase tracking-wider">Category</th>
                    <th className="text-left text-gray-500 text-xs font-bold px-6 py-4 uppercase tracking-wider">Date</th>
                    <th className="text-left text-gray-500 text-xs font-bold px-6 py-4 uppercase tracking-wider">Price</th>
                    <th className="text-left text-gray-500 text-xs font-bold px-6 py-4 uppercase tracking-wider">Seats</th>
                    <th className="text-left text-gray-500 text-xs font-bold px-6 py-4 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr
                      key={event._id}
                      className="border-b border-white/5 hover:bg-white/2 transition-all"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <p className="text-white font-bold text-sm truncate max-w-[150px]">
                            {event.title}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#605DFF20] text-[#605DFF]">
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">{event.date}</td>
                      <td className="px-6 py-4 text-white font-bold text-sm">
                        {event.price === 0 ? "Free" : `৳ ${event.price}`}
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {event.availableSeats}/{event.totalSeats}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-[#605DFF]/30 text-[#605DFF] hover:bg-[#605DFF]/10 transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event._id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
                          >
                            Delete
                          </button>
                        </div>
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