import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { 
    FaSearch, 
    FaBell, 
    FaCog, 
    FaUserCircle, 
    FaClock, 
    FaCalendarAlt, 
    FaWifi 
} from "react-icons/fa";
import "../css/topbar.css";

function Topbar() {
    const { user } = useAuth();
    const [systemTime, setSystemTime] = useState(new Date());

    // Live execution loop for the chronological display panel
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setSystemTime(new Date());
        }, 1000);
        return () => clearInterval(timeInterval);
    }, []);

    const timeString = systemTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = systemTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <header className="topbar">
            {/* Left Wing: Dynamic Context Title */}
            <div className="topbar-left">
                <div className="title-stack">
                    <h1>Dashboard</h1>
                    <span className="topbar-breadcrumb">Overview / Analytics</span>
                </div>

            </div>

          

            {/* Right Wing: Telemetry Matrix & Profiles */}
            <div className="topbar-right">
              

                {/* Clock Hub */}
                <div className="topbar-metric-pill">
                    <FaClock />
                    <span className="monospace-numerical-display">{timeString}</span>
                </div>

                {/* Date Hub */}
                <div className="topbar-metric-pill">
                    <FaCalendarAlt />
                    <span>{dateString}</span>
                </div>


                {/* Dynamic Authenticated Account Profile Anchor */}
                
            </div>
        </header>
    );
}

export default Topbar;