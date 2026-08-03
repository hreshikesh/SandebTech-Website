import React from "react";
import { ExternalLink, ShieldCheck, Cpu, Award } from "lucide-react";
import lotusImg from "../../assets/images/lotus/lotus.webp";

import "./LotusIntro.css";

const openProduct = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export default function LotusIntro() {
  return (
    <section className="lotus-intro">
      <div className="container">
        <div className="lotus-grid">
          {/* Visual Side */}
          <div className="lotus-image-wrapper">
            <div className="lotus-image">
              <img
                src={lotusImg}
                alt="Lotus Microsystems Silicon & Power Packaging Tech"
              />
            </div>
            
            {/* Quick Metrics Bar */}
            <div className="lotus-highlights">
              <div className="highlight-item">
                <Cpu size={20} />
                <span>DTU Spin-off (2020)</span>
              </div>
              <div className="highlight-item">
                <Award size={20} />
                <span>Nanofabrication Pioneers</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="lotus-content">
            <span className="section-badge">
              ⚡ SEMICONDUCTOR & POWER PACKAGING
            </span>

            <h2>Integrated Power Solutions Engineered at the Nanoscale</h2>

            <p>
              Founded in 2020 by Ph.D. researchers from the Technical University
              of Denmark (DTU), <strong>Lotus Microsystems</strong> is a fabless
              semiconductor leader pioneering the convergence of nanofabrication,
              integrated circuit design, and high-density power electronics.
            </p>

            <p>
              Back-backed by multi-year collaborative research across world-leading
              institutions—including <strong>DTU, Harvard University, Fraunhofer, and IMEC</strong>—Lotus
              delivers silicon-embedded power modules and ultra-thin thermal components
              designed to overcome traditional physical limits in data centers, AI accelerators,
              and micro-electronics.
            </p>

            <div className="lotus-meta-tags">
              <span className="tag"><ShieldCheck size={14} /> Zero-Space Integration</span>
              <span className="tag"><ShieldCheck size={14} /> Ultra-High Efficiency</span>
              <span className="tag"><ShieldCheck size={14} /> Low-Profile Silicon</span>
            </div>

    
            
            
              <button type="button" className="lotus-btn"   onClick={() => openProduct("https://www.lotus-microsystems.com/")}>
                <span>Visit Official Website</span>
                <ExternalLink size={18} />
              </button>
   
          </div>
        </div>
      </div>
    </section>
  );
}