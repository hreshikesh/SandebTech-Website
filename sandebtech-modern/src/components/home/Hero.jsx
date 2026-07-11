import { Link } from "react-router-dom";
import {
  ArrowRight,
  Settings,
  Cpu,
  Zap,
} from "lucide-react";

import "./Hero.css";

import heroImage from "../../assets/images/hero/hero.webp";

const services = [
  {
    id: 1,
    icon: <Zap size={22} />,
    title: "Electrical Systems",
  },
  {
    id: 2,
    icon: <Settings size={22} />,
    title: "Industrial Automation",
  },
  {
    id: 3,
    icon: <Cpu size={22} />,
    title: "Control Panels",
  },
];

function Hero() {
  return (
    <section className="hero">

      <div className="container hero-wrapper">

        {/* LEFT */}

        <div className="hero-content">

          <span className="hero-badge">
            ENGINEERING • AUTOMATION • ELECTRICAL
          </span>

          <h1>
            Powering Industries
            <span> Through Reliable</span>
            <br />
            Engineering Solutions
          </h1>

          <p>
            We provide professional engineering services,
            industrial automation solutions, electrical
            systems, and control panel solutions with
            quality, safety and reliability at every stage.
          </p>

          <div className="hero-buttons">

            <Link
              to="/services"
              className="hero-primary"
            >
              Our Services

              <ArrowRight size={18} />

            </Link>

            <Link
              to="/contact"
              className="hero-secondary"
            >
              Contact Us
            </Link>

          </div>

          <div className="hero-cards">

            {services.map((item) => (

              <div
                key={item.id}
                className="hero-card"
              >

                <div className="card-icon">
                  {item.icon}
                </div>

                <h4>{item.title}</h4>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-image">

          <img
            src={heroImage}
            alt="Industrial Engineering"
          />

         

        </div>

      </div>

    </section>
  );
}

export default Hero;