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

// --- DYNAMIC IMAGE IMPORTS ---
// Webp recommended for performance. Add/remove entries in heroImages below.
import heroImg1 from "../../assets/images/hero/hero.webp";
import heroImg2 from "../../assets/images/hero/hero1.webp";
import heroImg3 from "../../assets/images/hero/hero2.webp";
import heroImg4 from "../../assets/images/hero/hero3.webp";

// Alt text paired with each slide — descriptive alt beats "Slide 3" for
// both screen readers and SEO.
const heroImages = [
  { src: heroImg1, alt: "Engineering simulation of industrial equipment" },
  { src: heroImg2, alt: "CFD analysis visualising internal flow" },
  { src: heroImg3, alt: "Precision automation and control systems" },
  { src: heroImg4, alt: "Industrial infrastructure engineering project" },
];

const SLIDE_MS = 5000;

const services = [
  { id: 1, icon: <Zap size={22} />, title: "Reliability" },
  { id: 2, icon: <Settings size={22} />, title: "Expertise" },
  { id: 3, icon: <Cpu size={22} />, title: "Customer Focus" },
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

// Cross-fade with a slow Ken Burns drift for a more premium feel
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

  // Preload the next slide so the cross-fade never shows a blank frame.
  useEffect(() => {
    const next = (imageIndex + 1) % heroImages.length;
    const img = new Image();
    img.src = heroImages[next].src;
  }, [imageIndex]);

  // Autoplay — pauses on hover/focus and when the tab is hidden, so the
  // slideshow isn't burning cycles or desyncing in a background tab.
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
      {/* Background Engineering Blueprint & Glowing Orbs */}
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
              Simulate • Optimize • Sustain
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants}>
            Accelerate Design Cycles <br />
            <span className="hero-gradient-text">Through Simulation</span>
          </motion.h1>

          <motion.p variants={itemVariants}>
            We design, automate, and optimize critical industrial
            infrastructure. From high-voltage electrical distribution to
            precision PLC automation, SandebTech delivers turnkey engineering
            reliability.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-buttons">
            <Link to="/services" className="hero-primary">
              <span>Explore Services</span>
              <ArrowRight size={18} className="btn-arrow" />
            </Link>
            <Link to="/contact" className="hero-secondary">
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
            {/* Decorators — sit OUTSIDE .frame-media so they are never clipped */}
            <span className="frame-crosshair top-left">+</span>
            <span className="frame-crosshair top-right">+</span>
            <span className="frame-crosshair bottom-left">+</span>
            <span className="frame-crosshair bottom-right">+</span>

            <div className="hero-image-glow"></div>

            {/*
              .frame-media owns the aspect ratio and the overflow clip.
              Keeping the clip on this inner element means the glow,
              crosshairs and telemetry cards can still overhang the edges.
            */}
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

              {/* Bottom scrim keeps the dots readable over bright photos */}
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

            {/* Floating Cards (static over slideshow) */}
            <div className="telemetry-card top-telemetry">
              <div className="telemetry-icon blue-bg">
                <Activity size={20} />
              </div>
              <div>
                <span className="telemetry-label">Innovative solutions</span>
              </div>
            </div>

            <div className="telemetry-card bottom-telemetry">
              <div className="telemetry-icon orange-bg">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <span className="telemetry-label">Cost reduction</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
