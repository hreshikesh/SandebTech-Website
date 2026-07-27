import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
} from "lucide-react";

import "./Navbar.css";
import logo from "../../assets/images/logo/logo.webp";
import { SITE } from "../../constants/site";
import { solutionLinks } from "../../constants/solutionLinks";
import { resourceLinks } from "../../constants/resourceLinks";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout, openLogin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null); // 'solutions' | 'resources' | null

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const closeDrawer = () => {
    setOpen(false);
    setActiveMobileMenu(null);
  };

  const toggleMobileSubmenu = (menuName) => {
    setActiveMobileMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <>
      {/* Top Bar (Desktop Only) */}
      <div className="topbar">
        <div className="container topbar-content">
          <div className="top-left">
            <span>
              <Phone size={14} />
              {SITE.phone}
            </span>
            <span>
              <Mail size={14} />
              {SITE.email}
            </span>
          </div>
          <div className="top-right">
            Simulate • Optimize • Sustain
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="container navbar-wrapper">
          <Link to="/" className="logo" onClick={closeDrawer}>
            <img src={logo} alt="SandebTech Logo" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            <NavLink to="/">Home</NavLink>
           
            <NavLink to="/application">Application</NavLink>
            <NavLink to="/services">Services</NavLink>

            {/* Solutions Dropdown */}
            <div className="dropdown">
              <NavLink to="/solutions" className="dropdown-trigger">
                Solutions
                <ChevronDown size={14} />
              </NavLink>

              <div className="dropdown-menu">
                {solutionLinks.map((category) => (
                  <div key={category.category} className="dropdown-submenu-item">
                    <div className="submenu-trigger">
                      <span>{category.category}</span>
                      <ChevronRight size={14} />
                    </div>

                    <div className="submenu">
                      {category.items.map((item) => (
                        <NavLink key={item.title} to={item.path}>
                          {item.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="dropdown">
              <NavLink to="/resources" className="dropdown-trigger">
                Resources
                <ChevronDown size={14} />
              </NavLink>

              <div className="dropdown-menu">
                {resourceLinks.map((item) => (
                  <NavLink key={item.title} to={item.path}>
                    {item.title}
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink to="/contact">Contact</NavLink>
             <NavLink to="/about">About</NavLink>
          </nav>

          {/* Action Buttons */}
          <div className="navbar-actions">
            {user ? (
              <div className="desktop-user-menu">
                <span className="user-display">
                  <User size={15} />
                  {user.name}
                </span>
                <button
                  className="logout-action-btn"
                  onClick={logout}
                  title="Logout"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button className="login-action-btn" onClick={openLogin}>
                Login
              </button>
            )}

            <Link to="/contact" className="quote-action-btn">
              <span>Get Quote</span>
              <ArrowRight size={15} className="arrow-icon" />
            </Link>

            <button
              className="mobile-btn"
              onClick={() => setOpen(true)}
              aria-label="Toggle Navigation Menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Mobile Drawer Navigation */}
      <aside className={`drawer ${open ? "drawer-show" : ""}`}>
        <div className="drawer-header">
          <img src={logo} alt="Logo" />
          <button onClick={closeDrawer} aria-label="Close Navigation Menu">
            <X size={20} />
          </button>
        </div>

        <nav className="drawer-nav">
          <NavLink to="/" onClick={closeDrawer}>
            Home
          </NavLink>

          <NavLink to="/about" onClick={closeDrawer}>
            About
          </NavLink>

          <NavLink to="/application" onClick={closeDrawer}>
            Application
          </NavLink>

          <NavLink to="/services" onClick={closeDrawer}>
            Services
          </NavLink>

          {/* Mobile Accordion - Solutions */}
          <div className="mobile-solutions-group">
            <div className="mobile-accordion-header">
              <NavLink
                to="/solutions"
                className="mobile-parent-link"
                onClick={closeDrawer}
              >
                Solutions
              </NavLink>
              <button
                type="button"
                className="mobile-toggle-btn"
                onClick={() => toggleMobileSubmenu("solutions")}
                aria-label="Toggle Solutions Menu"
              >
                <ChevronDown
                  size={16}
                  className={`chevron-icon ${
                    activeMobileMenu === "solutions" ? "rotate" : ""
                  }`}
                />
              </button>
            </div>

            {activeMobileMenu === "solutions" && (
              <div className="mobile-accordion-body">
                {solutionLinks.map((category) => (
                  <div key={category.category} className="mobile-subcategory">
                    <span className="mobile-cat-header">{category.category}</span>
                    {category.items.map((item) => (
                      <NavLink
                        key={item.title}
                        to={item.path}
                        className="mobile-sub-link"
                        onClick={closeDrawer}
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Accordion - Resources */}
          <div className="mobile-solutions-group">
            <div className="mobile-accordion-header">
              <NavLink
                to="/resources"
                className="mobile-parent-link"
                onClick={closeDrawer}
              >
                Resources
              </NavLink>
              <button
                type="button"
                className="mobile-toggle-btn"
                onClick={() => toggleMobileSubmenu("resources")}
                aria-label="Toggle Resources Menu"
              >
                <ChevronDown
                  size={16}
                  className={`chevron-icon ${
                    activeMobileMenu === "resources" ? "rotate" : ""
                  }`}
                />
              </button>
            </div>

            {activeMobileMenu === "resources" && (
              <div className="mobile-accordion-body">
                <div className="mobile-subcategory">
                  {resourceLinks.map((item) => (
                    <NavLink
                      key={item.title}
                      to={item.path}
                      className="mobile-sub-link"
                      onClick={closeDrawer}
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/contact" onClick={closeDrawer}>
            Contact
          </NavLink>

          {/* Mobile Drawer Actions */}
          <div className="mobile-drawer-actions">
            <Link
              to="/contact"
              className="drawer-quote-btn"
              onClick={closeDrawer}
            >
              Get Quote
              <ArrowRight size={16} />
            </Link>

            {user ? (
              <div className="user-menu">
                <div className="user-btn">
                  <User size={16} />
                  <span>{user.name}</span>
                </div>
                <button
                  className="logout-btn"
                  onClick={() => {
                    logout();
                    closeDrawer();
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="login-btn"
                onClick={() => {
                  openLogin();
                  closeDrawer();
                }}
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Navbar;