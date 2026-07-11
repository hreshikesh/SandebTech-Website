import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

import "./Navbar.css";
import logo from "../../assets/images/logo/logo.webp";

const links = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "About", path: "/about" },
  { id: 3, title: "Services", path: "/services" },
  { id: 4, title: "Contact", path: "/contact" },
];

const solutionLinks = [
  {
    title: "SHIPFLOW CFD",
    path: "/solutions/shipflow-cfd",
  },
  {
    title: "CAESES",
    path: "/solutions/caeses",
  },
  {
    title: "Lotus Microsystems",
    path: "solutions/lotus-marine",
  },
  {
    title: "Turbomachinery",
    path: "/solutions/turbomachinery",
  },
];

function Navbar() {

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

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
              <Phone size={15} />
              +91 XXXXX XXXXX
            </span>

            <span>
              <Mail size={15} />
              info@sandebtech.com
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

          <Link
            to="/"
            className="logo"
          >
            <img
              src={logo}
              alt="SandebTech"
            />
          </Link>

          <nav className="desktop-nav">

            <NavLink to="/">
              Home
            </NavLink>

            <NavLink to="/about">
              About
            </NavLink>

            <NavLink to="/services">
              Services
            </NavLink>

            <div className="dropdown">

              <NavLink
                to="/solutions"
                className="dropdown-trigger"
              >
                Solutions

                <ChevronDown size={16} />

              </NavLink>

              <div className="dropdown-menu">

                {solutionLinks.map((item) => (

                  <NavLink
                    key={item.title}
                    to={item.path}
                  >
                    {item.title}
                  </NavLink>

                ))}

              </div>

            </div>

            <NavLink to="/contact">
              Contact
            </NavLink>

          </nav>

          <Link
            to="/contact"
            className="quote-btn"
          >
            Get Quote

            <ArrowRight size={18} />

          </Link>

          <button
            className="mobile-btn"
            onClick={() => setOpen(true)}
          >
            <Menu size={30} />
          </button>

        </div>

      </header>

      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <aside className={`drawer ${open ? "drawer-show" : ""}`}>

        <div className="drawer-header">

          <img
            src={logo}
            alt=""
          />

          <button onClick={() => setOpen(false)}>
            <X />
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

          <NavLink
            to="/solutions"
            onClick={() => setOpen(false)}
          >
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

          <Link
            to="/contact"
            className="drawer-btn"
          >
            Get Quote
          </Link>

        </nav>

      </aside>

    </>
  );
}

export default Navbar;