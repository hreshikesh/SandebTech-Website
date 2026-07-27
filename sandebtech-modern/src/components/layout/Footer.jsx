import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  ShieldCheck,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";

// Assets & Constants
import logo from "../../assets/images/logo/logo.webp";
import msmeLogo from "../../assets/images/about/msme.webp";
import gemLogo from "../../assets/images/about/gem.webp";
import { SITE } from "../../constants/site";
import * as navigation from "../../constants/navigation";

function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // 1. Get primary navigation links
  const navLinks = navigation.links || [];

  // 2. Extract Solutions/Services sub-links from Navbar data if available
  const solutionsMenuItem = navLinks.find(
    (item) =>
      item.title?.toLowerCase().includes("solution") ||
      item.title?.toLowerCase().includes("service")
  );

  const solutions =
    navigation.solutionsLinks ||
    solutionsMenuItem?.subLinks ||
    solutionsMenuItem?.children || [
      { id: "shipflow", title: "SHIPFLOW CFD", path: "/solutions/shipflow-cfd" },
      { id: "caeses", title: "CAESES", path: "/solutions/caeses" },
      { id: "lotus-micro", title: "Lotus Microsystems", path: "/solutions/lotus-micro" },
      {id:"cloud-cae",title:"Cloud-CAE Solutiond",path:"/solutions/cloud-cae"}
    ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content Grid */}
        <div className="footer-grid">
          
          {/* Column 1: Brand & Government Recognition */}
          <div className="footer-column company">
            <Link to="/" className="footer-logo-link">
              <img src={logo} alt="SandebTech" className="footer-logo" />
            </Link>

            <p className="company-desc">
              SandebTech delivers reliable engineering, industrial automation,
              and CFD solutions backed by quality, innovation, and technical
              precision.
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
                <span>Government Registered Enterprise</span>
              </div>
              <div className="footer-certifications">
                <div
                  className="cert-img-wrapper"
                  title="MSME (Udyam) Registered"
                >
                  <img src={msmeLogo} alt="MSME Registered Enterprise" />
                </div>
                <div className="cert-img-wrapper" title="GeM Verified Vendor">
                  <img src={gemLogo} alt="GeM Portal Seller" />
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (Mirrors Navbar main items) */}
          <div className="footer-column">
            <h3 className="column-title">Quick Links</h3>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.id || link.path || link.title}>
                  <Link to={link.path || "#"}>
                    <span className="nav-arrow">›</span> {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solutions (Mirrors Navbar sub-items / dropdown) */}
          <div className="footer-column">
            <h3 className="column-title">Solutions</h3>
            <ul className="footer-nav-list">
              {solutions.map((item) => (
                <li key={item.id || item.path || item.title}>
                  <Link to={item.path || "#"}>
                    <span className="nav-arrow">›</span> {item.title}
                  </Link>
                </li>
              ))}
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
                <span>
                  SANDEB TECH PVT LTD
                  <br />
                  166 5th Cross KEB Layout Sanjaynagar
                  <br />
                  Bangalore(Bengaluru) - 560094, India
                </span>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={16} />
                </div>
                <a href={`tel:${+919108994209  || ""}`}>
                  +91 9108994209 
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
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
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
            <ArrowUp size={15} className="top-arrow-icon" />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;