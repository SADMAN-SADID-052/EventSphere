"use client";
import { useState } from "react";

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Discover Events",
    desc: "Browse hundreds of events by category, location, or date. Find exactly what excites you.",
    accent: "#605DFF",
    detail:
      "Use our smart search and filters to find events by city, price range, date, or category. Save favorites and get personalized suggestions.",
  },
  {
    number: "02",
    icon: "🎟️",
    title: "Book Your Tickets",
    desc: "Secure your spot in seconds. Easy payment, instant confirmation — no hassle.",
    accent: "#E85D24",
    detail:
      "Multiple payment options including bKash, Nagad, and card. Get instant e-ticket on your email and phone.",
  },
  {
    number: "03",
    icon: "📅",
    title: "Get Reminders",
    desc: "Never miss an event. We'll remind you before it starts so you're always prepared.",
    accent: "#0F9F7B",
    detail:
      "Receive SMS and email reminders 24 hours and 1 hour before the event. Add to Google Calendar with one click.",
  },
  {
    number: "04",
    icon: "🎉",
    title: "Enjoy & Review",
    desc: "Attend the event, make memories, and share your experience with the community.",
    accent: "#F59E0B",
    detail:
      "After the event, rate and review your experience. Share photos, earn badges, and help others discover great events.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#0b0b0f] py-20 px-6 sm:px-12">
      <div className="max-w-[1290px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#605DFF] font-semibold text-sm tracking-widest uppercase mb-2">
            Simple Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            How It <span className="text-[#605DFF]">Works</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base max-w-xl mx-auto">
            From discovery to experience — EventSphere makes it effortless in
            just 4 steps.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-3 lg:w-1/2">
            {steps.map((step, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="text-left p-5 rounded-2xl border transition-all duration-300 group"
                style={{
                  background: active === i ? `${step.accent}12` : "transparent",
                  borderColor:
                    active === i ? step.accent : "rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-all duration-300"
                    style={{
                      background:
                        active === i
                          ? `${step.accent}25`
                          : "rgba(255,255,255,0.05)",
                    }}
                  >
                    {step.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-black tracking-widest"
                        style={{ color: active === i ? step.accent : "#666" }}
                      >
                        STEP {step.number}
                      </span>
                      {active === i && (
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${step.accent}22`,
                            color: step.accent,
                          }}
                        >
                          Active
                        </span>
                      )}
                    </div>
                    <h3
                      className="font-bold text-base transition-colors"
                      style={{ color: active === i ? "white" : "#aaa" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <span
                    className="text-lg transition-all duration-300 shrink-0"
                    style={{
                      color: active === i ? step.accent : "#333",
                      transform: active === i ? "translateX(4px)" : "none",
                    }}
                  >
                    →
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:w-1/2 flex items-center">
            <div
              className="w-full rounded-3xl p-8 sm:p-10 border transition-all duration-500"
              style={{
                background: `${steps[active].accent}10`,
                borderColor: `${steps[active].accent}33`,
              }}
            >
              <div
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6 mx-auto"
                style={{ background: `${steps[active].accent}20` }}
              >
                {steps[active].icon}
              </div>

              <p
                className="text-center text-xs font-black tracking-widest mb-3"
                style={{ color: steps[active].accent }}
              >
                STEP {steps[active].number}
              </p>

              <h3 className="text-white font-black text-2xl sm:text-3xl text-center mb-4">
                {steps[active].title}
              </h3>

              <p className="text-gray-300 text-base leading-relaxed text-center">
                {steps[active].detail}
              </p>

              <div className="flex justify-center gap-2 mt-8">
                {steps.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? "2rem" : "0.5rem",
                      height: "0.5rem",
                      background:
                        i === active
                          ? steps[active].accent
                          : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
