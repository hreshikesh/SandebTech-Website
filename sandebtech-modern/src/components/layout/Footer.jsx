import "./Footer.css";

import { Link } from "react-router-dom";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
} from "lucide-react";

import { FaLinkedinIn } from "react-icons/fa6";

import logo from "../../assets/images/logo/logo.webp";
import { links } from "../../constants/navigation";

function Footer() {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-grid">

          {/* Company */}

          <div className="footer-column company">

            <img
              src={logo}
              alt="SandebTech"
              className="footer-logo"
            />

            <p>
              SandebTech delivers reliable engineering,
              industrial automation and CFD solutions
              with quality, innovation and technical
              excellence.
            </p>

            <div className="footer-social">

              <a
                href="https://www.linkedin.com/company/sandebtech/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div className="footer-column">

            <h3>Quick Links</h3>

            {links.map((link) => (

              <Link
                key={link.id}
                to={link.path}
              >
                {link.title}
              </Link>

            ))}

          </div>

          {/* Solutions */}

          <div className="footer-column">

            <h3>Solutions</h3>

            <Link to="/solutions/shipflow-cfd">
              SHIPFLOW CFD
            </Link>

            <Link to="/solutions/caeses">
              CAESES
            </Link>

            <Link to="/solutions/turbomachinery">
              Turbomachinery
            </Link>

            <Link to="/solutions/lotus-micro">
              Lotus Microsystems
            </Link>

          </div>

          {/* Contact */}

          <div className="footer-column">

            <h3>Contact</h3>

            <div className="contact-item">

              <MapPin size={18} />

              <span>
                Mangalore,
                Karnataka,
                India
              </span>

            </div>

            <div className="contact-item">

              <Phone size={18} />

              <a href="tel:+91XXXXXXXXXX">
                +91 XXXXX XXXXX
              </a>

            </div>

            <div className="contact-item">

              <Mail size={18} />

              <a href="mailto:info@sandebtech.com">
                info@sandebtech.com
              </a>

            </div>

            <div className="contact-item">

              <Clock size={18} />

              <span>
                Mon - Sat
                <br />
                9:00 AM - 6:00 PM
              </span>

            </div>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} SandebTech.
            All Rights Reserved.
          </p>

          <button
            onClick={scrollTop}
            className="scroll-top"
          >

            <ArrowUp size={18} />

          </button>

        </div>

      </div>

    </footer>
  );
}

export default Footer;