"use client";
import { useState } from "react";

const faqs = [
  {
    question: "How do I buy tickets for an event?",
    answer:
      "Simply browse events, click on the one you like, and hit 'Buy Tickets'. Choose your ticket type, complete payment via bKash, Nagad, or card — and your e-ticket will be sent instantly.",
    accent: "#605DFF",
  },
  {
    question: "Can I get a refund if I cancel my booking?",
    answer:
      "Yes! Cancellations made 48 hours before the event are fully refunded. Within 48 hours, a 50% refund applies. No refunds for same-day cancellations.",
    accent: "#E85D24",
  },
  {
    question: "How do I create and list my own event?",
    answer:
      "Register as an organizer, go to your dashboard, and click 'Create Event'. Fill in the details, set ticket prices, and publish. Your event goes live immediately after review.",
    accent: "#0F9F7B",
  },
  {
    question: "Is EventSphere free to use?",
    answer:
      "Browsing and attending events is completely free. Organizers pay a small platform fee (5%) only when tickets are sold. No upfront costs.",
    accent: "#F59E0B",
  },
  {
    question: "How does the AI recommendation work?",
    answer:
      "Our AI analyzes your browsing history, past events, and preferences to suggest events you'll love. The more you use EventSphere, the smarter it gets!",
    accent: "#EC4899",
  },
  {
    question: "Can I transfer my ticket to someone else?",
    answer:
      "Yes, tickets can be transferred once before the event. Go to 'My Bookings', select the ticket, and enter the recipient's email. They'll receive the ticket instantly.",
    accent: "#06B6D4",
  },
];

export default function Faq() {
  const [active, setActive] = useState<number | null>(null);

  const toggle = (i: number) => setActive(active === i ? null : i);

  return (
    <section className="bg-[#0d0d12] py-20 px-6 sm:px-12">
      <div className="max-w-[1290px] mx-auto">
        
        <div className="text-center mb-16">
          <p className="text-[#605DFF] font-semibold text-sm tracking-widest uppercase mb-2">
            Got Questions?
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Frequently Asked <span className="text-[#605DFF]">Questions</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base max-w-xl mx-auto">
            Everything you need to know about EventSphere. Can not find the answer? Contact us anytime.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border transition-all duration-300 overflow-hidden"
              style={{
                borderColor: active === i ? `${faq.accent}66` : "rgba(255,255,255,0.07)",
                background: active === i ? `${faq.accent}08` : "#13131a",
              }}
            >
              {/* Question */}
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-all duration-300"
                    style={{
                      background: active === i ? `${faq.accent}25` : "rgba(255,255,255,0.05)",
                      color: active === i ? faq.accent : "#666",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className="font-bold text-sm sm:text-base transition-colors duration-300"
                    style={{ color: active === i ? "white" : "#aaa" }}
                  >
                    {faq.question}
                  </span>
                </div>

                
                <div
                  className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{
                    borderColor: active === i ? faq.accent : "rgba(255,255,255,0.1)",
                    color: active === i ? faq.accent : "#666",
                    transform: active === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </div>
              </button>

              {/* Answer */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: active === i ? "200px" : "0px",
                  opacity: active === i ? 1 : 0,
                }}
              >
                <p className="text-gray-400 text-sm leading-relaxed px-5 pb-5 pl-17">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}