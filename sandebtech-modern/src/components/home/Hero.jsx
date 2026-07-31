import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Settings,
  Cpu,
  Zap,
  Activity,
  CheckCircle2,
} from "lucide-react";
import "./Hero.css";
import heroImage1 from "../../assets/images/hero/hero.webp";
import heroImage2 from "../../assets/images/hero/hero1.webp";
import heroImage3 from "../../assets/images/hero/hero2.webp";
import heroImage4 from "../../assets/images/hero/hero3.webp"

// Updated images to high-resolution maritime & CFD hydrodynamic placeholders.
// Replace these paths with your local public paths (e.g., "/images/hero/hero1.webp") as needed.
const heroImages = [
  {
    src: heroImage1,
    alt: "SHIPFLOW CFD hydrodynamic pressure distribution analysis on hull",
  },
  {
    src: heroImage2,
    alt: "Maritime vessel wave resistance and flow velocity simulation",
  },
  {
    src: heroImage3,
    alt: "Ship propulsion propeller wake field and flow dynamics",
  },
  {
    src: heroImage4,
    alt: "Naval architecture hull optimization and seakeeping engineering",
  },
];

const SLIDE_MS = 5000;

const services = [
  { id: 1, icon: <Zap size={22} />, title: "Hydrodynamics" },
  { id: 2, icon: <Settings size={22} />, title: "RANS CFD" },
  { id: 3, icon: <Cpu size={22} />, title: "Hull Optimization" },
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// Cross-fade with a slow Ken Burns drift for a premium marine HUD feel
const imageVariants = {
  enter: { opacity: 0, scale: 1.08 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

function Hero() {
  const [imageIndex, setImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef(null);

  const goTo = useCallback((i) => setImageIndex(i), []);

  // Preload next slide so cross-fade never shows a blank frame
  useEffect(() => {
    const next = (imageIndex + 1) % heroImages.length;
    const img = new Image();
    img.src = heroImages[next].src;
  }, [imageIndex]);

  // Autoplay - pauses on hover/focus and background tab
  useEffect(() => {
    if (isPaused || prefersReducedMotion || heroImages.length < 2) return;

    const tick = () =>
      setImageIndex((prev) => (prev + 1) % heroImages.length);

    timerRef.current = setInterval(tick, SLIDE_MS);

    const onVisibility = () => {
      if (document.hidden) {
        clearInterval(timerRef.current);
      } else {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(tick, SLIDE_MS);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isPaused, prefersReducedMotion]);

  const current = heroImages[imageIndex];

  return (
    <section className="hero">
      {/* Background Blueprint Grid & Hydro Orbs */}
      <div className="hero-grid-pattern"></div>
      <div className="hero-orb hero-orb-blue"></div>
      <div className="hero-orb hero-orb-orange"></div>

      <div className="container hero-wrapper">
        {/* ========================================================= */}
        {/* LEFT COLUMN: CONTENT, HEADLINE, CTAs & SERVICE STRIP      */}
        {/* ========================================================= */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span className="hero-badge">
              <span className="live-dot"></span>
              Simulate • Optimize • Excel
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants}>
            Accelerate Marine Design <br />
            <span className="hero-gradient-text">Through SHIPFLOW</span>
          </motion.h1>

          <motion.p variants={itemVariants}>
            Engineered for naval architects and hydrodynamicists. SHIPFLOW delivers high-fidelity CFD simulations, automated hull shape optimization, wave resistance predictions, and complex viscous flow analysis.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-buttons">
            <Link to="/products-overview" className="hero-primary">
              <span>Explore Products</span>
              <ArrowRight size={18} className="btn-arrow" />
            </Link>
            <Link to="/how-to-buy" className="hero-secondary">
              Request Consultation
            </Link>
          </motion.div>

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
        {/* RIGHT COLUMN: DYNAMIC IMAGE SLIDESHOW & TELEMETRY CARDS   */}
        {/* ========================================================= */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="visual-frame"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            {/* Corner Decorators */}
            <span className="frame-crosshair top-left">+</span>
            <span className="frame-crosshair top-right">+</span>
            <span className="frame-crosshair bottom-left">+</span>
            <span className="frame-crosshair bottom-right">+</span>

            <div className="hero-image-glow"></div>

            <div className="frame-media">
              <AnimatePresence mode="sync" initial={false}>
                <motion.img
                  key={imageIndex}
                  src={current.src}
                  alt={current.alt}
                  className="hero-main-img"
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    opacity: { duration: 1.1, ease: "easeInOut" },
                    scale: { duration: 6, ease: "linear" },
                  }}
                  loading={imageIndex === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                />
              </AnimatePresence>

              {/* Bottom scrim for readability */}
              <div className="frame-scrim"></div>

              {/* Slide indicators */}
              <div
                className="slide-dots"
                role="tablist"
                aria-label="Hero image slides"
              >
                {heroImages.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    role="tab"
                    aria-selected={i === imageIndex}
                    aria-label={`Show slide ${i + 1}`}
                    className={`slide-dot ${i === imageIndex ? "active" : ""}`}
                    onClick={() => goTo(i)}
                  >
                    <span className="dot-fill"></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Telemetry Badges */}
            <div className="telemetry-card top-telemetry">
              <div className="telemetry-icon blue-bg">
                <Activity size={20} />
              </div>
              <div>
                <span className="telemetry-label">CFD Flow Accuracy</span>
              </div>
            </div>

            <div className="telemetry-card bottom-telemetry">
              <div className="telemetry-icon orange-bg">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <span className="telemetry-label">Optimal Resistance</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;