"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PrivateRoute from "@/components/PrivateRoute";
import toast from "react-hot-toast";

interface Event {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  location: string;
  date: string;
  totalSeats: number;
  availableSeats: number;
  rating: number;
  totalReviews: number;
  status: string;
  createdBy: { name: string; email: string };
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId: { name: string; avatar: string };
  createdAt: string;
}

function EventDetailsContent() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchEvent = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/items/${id}`);
      const data = await res.json();
      if (data.success) setEvent(data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/item/${id}`);
      const data = await res.json();
      if (data.success) setReviews(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEvent();
    fetchReviews();
  }, [id]);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setBooking(true);
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: id, quantity }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Booking confirmed! 🎉");
        fetchEvent();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setBooking(false);
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setSubmittingReview(true);
    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: id, ...reviewForm }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Review submitted! ⭐");
        setReviewForm({ rating: 5, comment: "" });
        fetchReviews();
        fetchEvent();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setSubmittingReview(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-[#605DFF] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <p className="text-white font-bold text-xl">Event not found</p>
          <Link href="/events" className="text-[#605DFF] hover:underline mt-2 block">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const joinedCount = event.totalSeats - event.availableSeats;

  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-20">
      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0f] via-[#0b0b0f80] to-transparent" />
        <div className="absolute bottom-8 left-6 sm:left-12">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#605DFF20] text-[#605DFF] border border-[#605DFF44] mb-3 inline-block">
            {event.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {event.title}
          </h1>
        </div>
      </div>

      <div className="max-w-322.5 mx-auto px-6 sm:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left — Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#13131a] rounded-2xl p-4 border border-white/5 text-center">
                <p className="text-2xl font-black text-[#605DFF]">
                  {event.rating > 0 ? event.rating : "N/A"}
                </p>
                <p className="text-gray-400 text-xs mt-1">⭐ Rating</p>
              </div>
              <div className="bg-[#13131a] rounded-2xl p-4 border border-white/5 text-center">
                <p className="text-2xl font-black text-[#0F9F7B]">
                  {event.totalReviews}
                </p>
                <p className="text-gray-400 text-xs mt-1">📝 Reviews</p>
              </div>
              <div className="bg-[#13131a] rounded-2xl p-4 border border-white/5 text-center">
                <p className="text-2xl font-black text-[#E85D24]">
                  {joinedCount}
                </p>
                <p className="text-gray-400 text-xs mt-1">👥 Joined</p>
              </div>
              <div className="bg-[#13131a] rounded-2xl p-4 border border-white/5 text-center">
                <p className="text-2xl font-black text-[#F59E0B]">
                  {event.availableSeats}
                </p>
                <p className="text-gray-400 text-xs mt-1">💺 Seats Left</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#13131a] rounded-2xl p-6 border border-white/5">
              <h2 className="text-white font-black text-xl mb-4">
                About This Event
              </h2>
              <p className="text-gray-400 leading-relaxed">{event.description}</p>
            </div>

            {/* Key Info */}
            <div className="bg-[#13131a] rounded-2xl p-6 border border-white/5">
              <h2 className="text-white font-black text-xl mb-4">
                Event Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📅</span>
                  <div>
                    <p className="text-gray-500 text-xs">Date</p>
                    <p className="text-white font-medium text-sm">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="text-gray-500 text-xs">Location</p>
                    <p className="text-white font-medium text-sm">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎫</span>
                  <div>
                    <p className="text-gray-500 text-xs">Total Seats</p>
                    <p className="text-white font-medium text-sm">{event.totalSeats}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">👤</span>
                  <div>
                    <p className="text-gray-500 text-xs">Organized By</p>
                    <p className="text-white font-medium text-sm">{event.createdBy?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">📊</span>
                  <div>
                    <p className="text-gray-500 text-xs">Status</p>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        background: event.status === "upcoming" ? "#605DFF20" : "#0F9F7B20",
                        color: event.status === "upcoming" ? "#605DFF" : "#0F9F7B",
                      }}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-[#13131a] rounded-2xl p-6 border border-white/5">
              <h2 className="text-white font-black text-xl mb-6">
                Reviews ({event.totalReviews})
              </h2>

              {reviews.length === 0 ? (
                <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="p-4 rounded-xl border border-white/5 bg-white/2"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#605DFF25] flex items-center justify-center text-xs font-black text-[#605DFF]">
                          {review.userId?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{review.userId?.name}</p>
                          <p className="text-yellow-400 text-xs">
                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                          </p>
                        </div>
                        <span className="ml-auto text-gray-600 text-xs">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Review Form */}
              <div className="border-t border-white/5 pt-6">
                <h3 className="text-white font-bold text-base mb-4">Write a Review</h3>
                <form onSubmit={handleReview} className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="text-2xl transition-transform hover:scale-110"
                        >
                          {star <= reviewForm.rating ? "⭐" : "☆"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Comment</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="Share your experience..."
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#605DFF] transition-all text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 disabled:opacity-70"
                    style={{ background: "#605DFF" }}
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right — Booking */}
          <div className="space-y-4">
            <div className="bg-[#13131a] rounded-2xl p-6 border border-white/5 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-4xl font-black text-white mb-1">
                  {event.price === 0 ? "Free" : `৳ ${event.price}`}
                </p>
                <p className="text-gray-500 text-sm">per ticket</p>
              </div>

              {/* Seats bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>{joinedCount} joined</span>
                  <span>{event.availableSeats} left</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${(joinedCount / event.totalSeats) * 100}%`,
                      background: "#605DFF",
                    }}
                  />
                </div>
              </div>

              {event.availableSeats > 0 ? (
                <>
                  <div className="mb-4">
                    <label className="text-gray-400 text-sm mb-2 block">Quantity</label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-xl border border-white/10 text-white hover:border-[#605DFF] transition-all"
                      >
                        −
                      </button>
                      <span className="text-white font-bold text-lg w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(event.availableSeats, quantity + 1))}
                        className="w-10 h-10 rounded-xl border border-white/10 text-white hover:border-[#605DFF] transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm mb-4 p-3 rounded-xl bg-white/5">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white font-black">
                      {event.price === 0 ? "Free" : `৳ ${event.price * quantity}`}
                    </span>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={booking}
                    className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105 disabled:opacity-70"
                    style={{ background: "#605DFF" }}
                  >
                    {booking ? "Booking..." : "Book Now 🎟️"}
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-red-400 font-bold">Sold Out!</p>
                  <p className="text-gray-500 text-sm mt-1">No seats available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventDetailsPage() {
  return (
    <PrivateRoute>
      <EventDetailsContent />
    </PrivateRoute>
  );
}