import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";

// Assets
import logo from "../../assets/images/logo/logo.webp";
import msmeLogo from "../../assets/images/about/msme.webp";
import gemLogo from "../../assets/images/about/gem.webp";
import { SITE } from "../../constants/site";
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
        
      

        {/* Main Footer Content Grid */}
        <div className="footer-grid">
          
          {/* Column 1: Brand & Government Recognition */}
          <div className="footer-column company">
            <img src={logo} alt="SandebTech" className="footer-logo" />
            
            <p className="company-desc">
              SandebTech delivers reliable engineering, industrial automation, and CFD solutions backed by quality, innovation, and technical precision.
            </p>

            <div className="footer-social">
              <a
                href="https://www.linkedin.com/company/sandebtech/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-pill"
              >
                <FaLinkedinIn />
              </a>
            </div>

            {/* Government Certification Badge Card */}
            <div className="cert-badge-card">
              <div className="cert-badge-header">
                <ShieldCheck size={15} />
                <span>Government Recognized Enterprise</span>
              </div>
              <div className="footer-certifications">
                <div className="cert-img-wrapper" title="MSME (Udyam) Registered">
                  <img src={msmeLogo} alt="MSME Registered Enterprise" />
                </div>
                <div className="cert-img-wrapper" title="GeM Verified Vendor">
                  <img src={gemLogo} alt="GeM Portal Seller" />
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-column">
            <h3 className="column-title">Navigation</h3>
            <ul className="footer-nav-list">
              {links.map((link) => (
                <li key={link.id}>
                  <Link to={link.path}>
                    <span className="nav-arrow">›</span> {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="footer-column">
            <h3 className="column-title">Solutions</h3>
            <ul className="footer-nav-list">
              <li>
                <Link to="/solutions/shipflow-cfd">
                  <span className="nav-arrow">›</span> SHIPFLOW CFD
                </Link>
              </li>
              <li>
                <Link to="/solutions/caeses">
                  <span className="nav-arrow">›</span> CAESES
                </Link>
              </li>
              <li>
                <Link to="/solutions/turbomachinery">
                  <span className="nav-arrow">›</span> Turbomachinery
                </Link>
              </li>
              <li>
                <Link to="/solutions/lotus-micro">
                  <span className="nav-arrow">›</span> Lotus Microsystems
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="footer-column">
            <h3 className="column-title">Contact Us</h3>
            <div className="contact-list">
              
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={16} />
                </div>
                <span>Bangalore, Karnataka, India</span>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={16} />
                </div>
                <a href={`tel:${SITE?.phone || ""}`}>
                  {SITE?.phone || "+91 XXXXX XXXXX"}
                </a>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={16} />
                </div>
                <a href={`mailto:${SITE?.email || "info@sandebtech.com"}`}>
                  {SITE?.email || "info@sandebtech.com"}
                </a>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Clock size={16} />
                </div>
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} <strong>SandebTech</strong>. All Rights Reserved.
          </p>

          <button
            onClick={scrollTop}
            className="scroll-top-btn"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;