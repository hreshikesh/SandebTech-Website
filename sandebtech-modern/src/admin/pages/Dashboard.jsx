import { useEffect, useState } from "react";
import {
    FaUsers,
    FaCalendarAlt,
    FaEnvelope,
    FaClock,
    FaSpinner
} from "react-icons/fa";
import StatCard from "../components/StatCard";
import { getDashboard } from "../service/adminApi";
import "../css/dashboard.css";

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalMeetings: 0,
        pendingMeetings: 0,
        totalContacts: 0
    });

    useEffect(() => {
        async function loadDashboard() {
            setLoading(true);
            const startTime = Date.now();
            
            try {
                const res = await getDashboard();
                
                // Enforce structural 3-second minimum loading transition sequence
                const elapsedTime = Date.now() - startTime;
                const targetDelay = 3000;
                if (elapsedTime < targetDelay) {
                    await new Promise(resolve => setTimeout(resolve, targetDelay - elapsedTime));
                }
                
                if (res && res.data) {
                    setStats(res.data);
                }
            } catch (err) {
                console.error("Failed to parse administration matrices:", err);
            } finally {
                setLoading(false);
            }
        }
        loadDashboard();
    }, []);

    // Display the matching premium full-screen loader layout during initial server sync
    if (loading) {
        return (
            <div className="premium-loader-container">
                <div className="premium-loader-card">
                    <FaSpinner className="spinner-loading-icon-animated" />
                    <h3>Synchronizing System Analytics</h3>
                    <p>Compiling cross-platform node telemetry and metrics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">
                Dashboard
            </h2>
            <div className="dashboard-grid">
                <StatCard
                    title="Users"
                    value={stats.totalUsers}
                    icon={<FaUsers />}
                />
                <StatCard
                    title="Meetings"
                    value={stats.totalMeetings}
                    icon={<FaCalendarAlt />}
                />
                <StatCard
                    title="Pending"
                    value={stats.pendingMeetings}
                    icon={<FaClock />}
                />
                <StatCard
                    title="Contacts"
                    value={stats.totalContacts}
                    icon={<FaEnvelope />}
                />
            </div>
            
            {/* Google Calendar Premium Embed Wrapper */}
            <div className="calendar-overflow-frame">
                <div className="calendar-header-ribbon">
                    <h3>Operational Synchronized Briefings</h3>
                    <p>Real-time node coordination schedule</p>
                </div>
                <div className="calendar-iframe-body">
                    <iframe 
                        src="https://calendar.google.com/calendar/embed?height=300&wkst=2&ctz=Asia%2FKolkata&showPrint=0&src=YWlsaHJlc2hpa2VzaEBnbWFpbC5jb20&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23ef6c00&color=%230b8043&bgcolor=%23111c2e" 
                        style={{ border: 0 }} 
                        width="100%" 
                        height="500" 
                        frameBorder="0" 
                        scrolling="no"
                        title="Operational Schedule Matrix"
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;