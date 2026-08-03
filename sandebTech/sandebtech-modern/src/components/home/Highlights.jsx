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
    title: "Maritime ,Ship-Design & Turbomachinery",
   
  },
  {
    id: 2,
    icon: <Cpu size={32} />,
    title: "Solutions for Built in Environment",
  
  },
  {
    id: 3,
    icon: <Settings size={32} />,
    title: "Electronics Cooling And Product Support ",
  
  },
  {
    id: 4,
    icon: <ShieldCheck size={32} />,
    title: "Fire Safety and Evacuation Training",
   
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

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Highlights;