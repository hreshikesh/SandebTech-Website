import React, { useState } from "react";
import "./Highlights.css";
import {
  Cpu,
  Zap,
  ShieldCheck,
  Settings,
} from "lucide-react";

const items = [
  {
    id: 1,
    icon: <Zap size={32} />,
    title: "Electrical Engineering",
    desc: "Reliable electrical engineering solutions for industrial and commercial applications.",
  },
  {
    id: 2,
    icon: <Cpu size={32} />,
    title: "Industrial Automation",
    desc: "Automation systems designed to improve productivity and operational efficiency.",
  },
  {
    id: 3,
    icon: <Settings size={32} />,
    title: "Control Panels",
    desc: "Custom-built control panels designed to meet industry standards.",
  },
  {
    id: 4,
    icon: <ShieldCheck size={32} />,
    title: "Quality & Safety",
    desc: "Committed to delivering reliable, safe and high-quality engineering solutions.",
  },
];

function Highlights() {
  const [activeCard, setActiveCard] = useState(null);

  // Spotlight mouse-tracking effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="highlights">
      <div className="container">

        {/* Section Header */}
        <div className="section-head">
          <div className="badge-capsule">
            <span className="badge-dot" />
            <span className="badge-text">OUR EXPERTISE</span>
          </div>

          <h2>
            Engineering Solutions Built
            <br className="desktop-br" />
            {" "}Around Your Business
          </h2>

          <p>
            Delivering dependable engineering services with
            innovation, precision and long-term reliability.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="highlight-grid">
          {items.map((item) => (
            <div
              className={`highlight-card ${activeCard === item.id ? "is-active" : ""}`}
              key={item.id}
              onMouseMove={handleMouseMove}
              onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
            >
              {/* Dynamic Mouse Spotlight Overlay */}
              <div className="card-spotlight" />

              {/* Accent Top Border Bar */}
              <div className="card-accent-line" />

              <div className="highlight-icon-wrapper">
                <div className="highlight-icon">
                  {item.icon}
                </div>
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Highlights;