import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/logo.webp"
import useAuth from "../../hooks/useAuth";
import {
    FaHome,
    FaUsers,
    FaCalendarAlt,
    FaEnvelope,
    FaSignOutAlt
} from "react-icons/fa";

import "../css/sidebar.css";

function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <aside className="sidebar">
            {/* Upper Content wrapper to push logout down */}
            <div className="sidebar-top">
                <div className="sidebar-logo">
                    <img 
                        src= {logo}
                        alt="SandebTech Logo" 
                        className="company-logo-img" 
                    />
                    <div className="logo-text-group">
                        <h2>SandebTech</h2>
                        <span>Admin Panel</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {/* Added 'end' so '/' doesn't match nested routes */}
                    <NavLink to="/admin" end>
                        <FaHome className="nav-icon" size={20} />
                        <span className="nav-text">Dashboard</span>
                    </NavLink>

                    <NavLink to="/admin/users">
                        <FaUsers className="nav-icon" size={20} />
                        <span className="nav-text">Users</span>
                    </NavLink>

                    <NavLink to="/admin/meetings">
                        <FaCalendarAlt className="nav-icon" size={20} />
                        <span className="nav-text">Meetings</span>
                    </NavLink>

                    <NavLink to="/admin/contacts">
                        <FaEnvelope className="nav-icon" size={20} />
                        <span className="nav-text">Contacts</span>
                    </NavLink>
                </nav>
            </div>

            {/* Premium Logout Button */}
            <button
                className="logout-btn"
                onClick={handleLogout}
                aria-label="Logout"
            >
                <FaSignOutAlt className="logout-icon" size={20} />
                <span className="logout-text">Logout</span>
            </button>
        </aside>
    );
}

export default Sidebar;