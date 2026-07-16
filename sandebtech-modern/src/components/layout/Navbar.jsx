import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

import "./Navbar.css";
import logo from "../../assets/images/logo/logo.webp";
import { SITE } from "../../constants/site";
import { links } from "../../constants/navigation";
import { solutionLinks } from "../../constants/solutionLinks";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, logout, openLogin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      {/* Top Bar */}
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
            Engineering • Automation • Electrical Solutions
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="container navbar-wrapper">
          <Link to="/" className="logo">
            <img src={logo} alt="SandebTech" />
          </Link>

          <nav className="desktop-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Services</NavLink>

            <div className="dropdown">
              <NavLink to="/solutions" className="dropdown-trigger">
                Solutions
                <ChevronDown size={14} />
              </NavLink>
              <div className="dropdown-menu">
                {solutionLinks.map((item) => (
                  <NavLink key={item.title} to={item.path}>
                    {item.title}
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink to="/contact">Contact</NavLink>
          </nav>

          {/* Action Area (Desktop Auth & Button Actions) */}
          <div className="navbar-actions">
            {user ? (
              <div className="desktop-user-menu">
                <span className="user-display">
                  <User size={15} />
                  {user.name}
                </span>
                <button className="logout-action-btn" onClick={logout} title="Logout">
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

            <button className="mobile-btn" onClick={() => setOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation */}
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`drawer ${open ? "drawer-show" : ""}`}>
        <div className="drawer-header">
          <img src={logo} alt="Logo" />
          <button onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav>
          {links.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </NavLink>
          ))}

          <NavLink to="/solutions" onClick={() => setOpen(false)}>
            Solutions
          </NavLink>

          {solutionLinks.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              className="mobile-sub-link"
              onClick={() => setOpen(false)}
            >
              {item.title}
            </NavLink>
          ))}

          {/* Mobile CTA and Auth Area */}
          <div className="mobile-drawer-actions">
            <Link 
              to="/contact" 
              className="drawer-quote-btn"
              onClick={() => setOpen(false)}
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
                    setOpen(false); 
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
                  setOpen(false); 
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