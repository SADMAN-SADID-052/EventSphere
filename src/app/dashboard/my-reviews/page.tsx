"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const res = await fetch(`http://localhost:5000/api/reviews/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setReviews(data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Review deleted!");
        fetchReviews();
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
        <div>
          <h2 className="text-2xl font-black text-white">My Reviews</h2>
          <p className="text-gray-400 text-sm mt-1">
            All reviews you have submitted
          </p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 bg-[#13131a] rounded-2xl animate-pulse border border-white/5"
              />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 bg-[#13131a] rounded-2xl border border-white/5">
            <p className="text-5xl mb-4">⭐</p>
            <p className="text-white font-bold text-xl">No reviews yet</p>
            <p className="text-gray-400 text-sm mt-2 mb-6">
              Attend events and share your experience!
            </p>
            <Link
              href="/events"
              className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 inline-block"
              style={{ background: "#605DFF" }}
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#13131a] rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-white font-bold text-base">
                        {review.itemId?.title || "Event"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-yellow-400 text-sm">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 shrink-0">
                    <Link
                      href={`/events/${review.itemId?._id}`}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10 text-gray-400 hover:border-[#605DFF] hover:text-[#605DFF] transition-all"
                    >
                      View Event
                    </Link>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}