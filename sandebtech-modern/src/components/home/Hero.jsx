import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Settings,
  Cpu,
  Zap,
  Activity,
  CheckCircle2,
  Sliders,
} from "lucide-react";

import "./Hero.css";
import heroImage from "../../assets/images/hero/Hero.webp";

const services = [
  {
    id: 1,
    icon: <Zap size={22} />,
    title: "Reliability",
   
  },
  {
    id: 2,
    icon: <Settings size={22} />,
    title: "Expertise",

  },
  {
    id: 3,
    icon: <Cpu size={22} />,
    title: "Customer Focus",

  },
];

// Motion animation variants for entry sequence
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function Hero() {
  return (
    <section className="hero">
      {/* Background Engineering Blueprint & Glowing Orbs */}
      <div className="hero-grid-pattern"></div>
      <div className="hero-orb hero-orb-blue"></div>
      <div className="hero-orb hero-orb-orange"></div>

      <div className="container hero-wrapper">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: CONTENT, HEADLINE, CTAs & SERVICE STRIP     */}
        {/* ========================================================= */}
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section Tag Badge */}
          <motion.div variants={itemVariants}>
            <span className="hero-badge">
              <span className="live-dot"></span>
             Simulate • Optimize • Sustain
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants}>
            Accelerate Design Cycles <br />
            <span className="hero-gradient-text">Through Simulation</span>
          </motion.h1>

          {/* Subtext Paragraph */}
          <motion.p variants={itemVariants}>
            We design, automate, and optimize critical industrial infrastructure. From high-voltage electrical distribution to precision PLC automation, SandebTech delivers turnkey engineering reliability.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="hero-buttons">
            <Link to="/services" className="hero-primary">
              <span>Explore Services</span>
              <ArrowRight size={18} className="btn-arrow" />
            </Link>

            <Link to="/contact" className="hero-secondary">
              Request Consultation
            </Link>
          </motion.div>

          {/* 3-Card Quick Services Strip */}
          <motion.div variants={itemVariants} className="hero-cards">
            {services.map((item) => (
              <div key={item.id} className="hero-card">
                <div className="card-icon">{item.icon}</div>
                <div className="card-text">
                  <h4>{item.title}</h4>
            
                </div>
              </div>
            ))}
          </motion.div>

        </motion.div>


        {/* ========================================================= */}
        {/* RIGHT COLUMN: HIGH-TECH VISUAL STACK & TELEMETRY CARDS    */}
        {/* ========================================================= */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Engineering Blueprint Frame Decorators */}
          <div className="visual-frame">
            <span className="frame-crosshair top-left">+</span>
            <span className="frame-crosshair top-right">+</span>
            <span className="frame-crosshair bottom-left">+</span>
            <span className="frame-crosshair bottom-right">+</span>

            <div className="hero-image-glow"></div>

            {/* Main Industrial Image */}
            <img
              src={heroImage}
              alt="SandebTech Industrial Engineering & Automation"
              className="hero-main-img"
            />

            {/* Floating Telemetry Card Top-Left */}
            <div className="telemetry-card top-telemetry">
              <div className="telemetry-icon blue-bg">
                <Activity size={20} />
              </div>
              <div>
                <span className="telemetry-label">Innovative solutions</span>
              </div>
            </div>

            {/* Floating Metric Card Bottom-Right */}
            <div className="telemetry-card bottom-telemetry">
              <div className="telemetry-icon orange-bg">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <span className="telemetry-label">Cost reduction</span>
              </div>
            </div>

            {/* Tech Badge Overlay */}
            <div className="tech-spec-tag">
              <Sliders size={14} />
              <span>ISO 9001:2015 CERTIFIED</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;