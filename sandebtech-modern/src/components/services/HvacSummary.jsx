import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wind, Flame, Server, ArrowRight, ShieldCheck } from "lucide-react";

import hvacImg from "../../assets/images/havc/havc-cfd.webp"; 
import "./HvacSummary.css";

function HvacSummary() {
  return (
    <section className="service-section">
      <div className="container">
        <div className="service-grid">
          
          {/* Left Side: Image Card */}
          <motion.div 
            className="service-image"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="image-card">
              <img 
                src={hvacImg} 
                alt="HVAC & Fire Safety CFD Simulations" 
              />
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            className="service-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="service-badge">
              <Wind size={16} style={{ marginRight: "8px" }} /> HVAC & LIFE SAFETY CFD
            </span>

            <h2>HVAC Design, Data Center Cooling & Fire Simulation</h2>

            <p>
              We deliver computational fluid dynamics (CFD) modeling to optimize indoor air 
              quality, prevent data center thermal hotspots, and validate life-safety smoke 
              and evacuation systems prior to construction.
            </p>

            <div className="service-features">
              <div className="feature">
                <Wind size={20} />
                <span>HVAC & Thermal Comfort</span>
              </div>
              <div className="feature">
                <Server size={20} />
                <span>Data Center Cooling</span>
              </div>
              <div className="feature">
                <Flame size={20} />
                <span>Fire & Smoke Modeling</span>
              </div>
              <div className="feature">
                <ShieldCheck size={20} />
                <span>ASHRAE / NFPA Standards</span>
              </div>
            </div>

            <div style={{ marginTop: "35px" }}>
              <Link to="/solutions/hvac" className="btn-learn-more">
                <span>Learn More About HVAC & Fire CFD</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default HvacSummary;