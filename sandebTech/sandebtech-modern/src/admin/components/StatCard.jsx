import "../css/statcard.css";

function StatCard({
    title,
    value,
    icon,
    trend,       // Expected: e.g., "12.5%" or "4%"
    trendType,   // Expected: "up" or "down"
    description  // Expected: e.g., "vs last month"
}) {
    // Determine the trend class and symbol automatically
    const isUp = trendType === "up";
    
    return (
        <div className="stat-card">
            <div className="stat-info">
                <span className="stat-title">{title}</span>
                <h2 className="stat-value">{value}</h2>
                
                {/* Dashboard Trend Footnote */}
                {trend && (
                    <div className="stat-meta">
                        <span className={`stat-trend ${isUp ? "trend-up" : "trend-down"}`}>
                            {isUp ? "↑" : "↓"} {trend}
                        </span>
                        {description && <span className="stat-desc">{description}</span>}
                    </div>
                )}
            </div>
            
            {/* Soft-glowing wrapper for the graphic icon */}
            <div className="stat-icon-wrapper">
                {icon}
            </div>
        </div>
    );
}

export default StatCard;