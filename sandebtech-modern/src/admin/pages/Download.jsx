import { useEffect, useState, useCallback } from "react";
import { 
    FaSearch, 
    FaEye, 
    FaInbox,
    FaSortAmountDown,
    FaSortAmountUp,
    FaChevronLeft,
    FaChevronRight,
    FaTimes,
    FaDownload,
    FaCalendarDay
} from "react-icons/fa";
import { getDownloadData } from "../service/adminApi";
import "../css/contact.css";

function Downloads() {
    const [downloads, setDownloads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [selectedDownload, setSelectedDownload] = useState(null);

    // --- Today Filter State ---
    const [showTodayOnly, setShowTodayOnly] = useState(false);

    // --- Pagination & Sorting State ---
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [sortDirection, setSortDirection] = useState("desc");

    const loadDownloads = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getDownloadData(currentPage, pageSize, "downloadedAt", sortDirection);
            const data = response?.data;
            
            if (data && data.content) {
                setDownloads(data.content);
                setTotalPages(data.totalPages || 0);
                setTotalElements(data.totalElements || 0);
            } else {
                setDownloads(Array.isArray(data) ? data : []);
                setTotalPages(1);
                setTotalElements(Array.isArray(data) ? data.length : 0);
            }
        } catch (error) {
            console.error("Failed to load download records", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize, sortDirection]);

    useEffect(() => {
        loadDownloads();
    }, [loadDownloads]);

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    };

    const isToday = (dateString) => {
        if (!dateString) return false;
        const itemDate = new Date(dateString);
        const today = new Date();

        return (
            itemDate.getDate() === today.getDate() &&
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getFullYear() === today.getFullYear()
        );
    };

    const filteredDownloads = downloads.filter(item => {
        const matchesSearch = 
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.phone?.includes(search);

        const matchesToday = !showTodayOnly || isToday(item.downloadedAt);

        return matchesSearch && matchesToday;
    });

    if (loading) {
        return (
            <div className="admin-page-loading">
                <div className="skeleton title-skeleton"></div>
                <div className="skeleton search-skeleton"></div>
                <div className="table-skeleton-group">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="skeleton row-skeleton"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="page-header-row">
                <div>
                    <h2>Download Records</h2>
                    <p className="page-subtitle">Track and review user software/content download logs and inquiries.</p>
                </div>
            </div>

            {/* Action Toolbar Controls */}
            <div className="table-toolbar" style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center" }}>
                <div className="search-wrapper" style={{ flexGrow: 1, maxWidth: "450px" }}>
                    <FaSearch className="search-icon-field" />
                    <input
                        type="text"
                        placeholder="Search by user name, email, or phone number..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="toolbar-actions-group" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    {/* Today Filter Toggle */}
                    <button 
                        type="button"
                        className={`premium-filter-btn ${showTodayOnly ? "active-filter-btn" : ""}`}
                        onClick={() => setShowTodayOnly(prev => !prev)}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            backgroundColor: showTodayOnly ? "rgba(79, 70, 229, 0.12)" : "transparent",
                            color: showTodayOnly ? "#4f46e5" : "inherit",
                            border: showTodayOnly ? "1px solid #4f46e5" : "1px solid rgba(209, 213, 219, 0.8)",
                            borderRadius: "8px",
                            padding: "8px 14px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                        title={showTodayOnly ? "Show All Records" : "Show Today's Downloads Only"}
                    >
                        <FaCalendarDay style={{ color: showTodayOnly ? "#4f46e5" : "inherit" }} />
                        <span>Today Only</span>
                    </button>

                    {/* Date Sorting Filter Toggle */}
                    <button 
                        type="button"
                        className="premium-filter-btn"
                        onClick={() => setSortDirection(prev => prev === "desc" ? "asc" : "desc")}
                        title={sortDirection === "desc" ? "Sorting: Newest First" : "Sorting: Oldest First"}
                    >
                        {sortDirection === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
                        <span>Date: {sortDirection === "desc" ? "Newest First" : "Oldest First"}</span>
                    </button>

                    {/* Page Size Selection */}
                    <div className="size-selector-wrapper">
                        <select 
                            value={pageSize} 
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setCurrentPage(0);
                            }}
                            className="premium-dropdown"
                        >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={25}>25 per page</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Data Table Framework */}
            <div className="table-responsive-container">
                <table className="premium-data-table">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>User Details</th>
                            <th>Phone Number</th>
                            <th>Downloaded At</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDownloads.length > 0 ? (
                            filteredDownloads.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{currentPage * pageSize + index + 1}</td>
                                    <td>
                                        <div className="identity-cell">
                                            <span className="cell-primary-name">{item.name}</span>
                                            <span className="cell-secondary-email">{item.email}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="cell-subject-text">{item.phone || "—"}</span>
                                    </td>
                                    <td>
                                        <span>{formatDate(item.downloadedAt)}</span>
                                    </td>
                                    <td>
                                        <div className="action-button-group" style={{ justifyContent: "flex-end" }}>
                                            <button
                                                className="action-btn btn-view"
                                                title="View Download Log Details"
                                                onClick={() => setSelectedDownload({ ...item, serialNo: currentPage * pageSize + index + 1 })}
                                            >
                                                <FaEye size={13} /> <span>View</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="empty-state-cell">
                                    <div className="empty-state">
                                        <FaInbox size={40} />
                                        <h3>No records found</h3>
                                        <p>
                                            {showTodayOnly 
                                                ? "No downloads logged today. Try switching off the 'Today Only' filter." 
                                                : "Adjust your search query or check back later for new download activity."}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Transparent Pagination Footer */}
            {totalPages > 0 && (
                <div 
                    className="premium-pagination-footer"
                    style={{
                        background: "transparent",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        borderTop: "1px solid rgba(229, 231, 235, 0.4)",
                        backdropFilter: "none",
                        padding: "16px 8px"
                    }}
                >
                    <div className="pagination-metrics">
                        Showing <span className="highlight-metric">{currentPage * pageSize + 1}</span> to{" "}
                        <span className="highlight-metric">
                            {Math.min((currentPage + 1) * pageSize, totalElements)}
                        </span>{" "}
                        of <span className="highlight-metric">{totalElements}</span> entries
                    </div>
                    
                    <div className="pagination-controls">
                        <button
                            type="button"
                            className="pagination-nav-btn"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                        >
                            <FaChevronLeft size={12} />
                            <span>Previous</span>
                        </button>

                        <div className="pagination-pages-list">
                            {[...Array(totalPages).keys()].map((pageIndex) => (
                                <button
                                    key={pageIndex}
                                    type="button"
                                    className={`pagination-page-node ${currentPage === pageIndex ? "active-node" : ""}`}
                                    onClick={() => setCurrentPage(pageIndex)}
                                >
                                    {pageIndex + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="pagination-nav-btn"
                            disabled={currentPage >= totalPages - 1}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                        >
                            <span>Next</span>
                            <FaChevronRight size={12} />
                        </button>
                    </div>
                </div>
            )}

            {/* Details Modal Overlay */}
            {selectedDownload && (
                <div className="modal-backdrop" onClick={() => setSelectedDownload(null)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <FaDownload style={{ color: "#4f46e5" }} />
                                <h3>Download Record #{selectedDownload.serialNo}</h3>
                            </div>
                            <button className="modal-close-btn" onClick={() => setSelectedDownload(null)}>
                                <FaTimes size={16} />
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="info-grid-row">
                                <div className="info-block">
                                    <label>Full Name</label>
                                    <p>{selectedDownload.name || "—"}</p>
                                </div>
                                <div className="info-block">
                                    <label>Email Address</label>
                                    <p className="selectable-link">{selectedDownload.email || "—"}</p>
                                </div>
                            </div>

                            <div className="info-grid-row">
                                <div className="info-block">
                                    <label>Phone Number</label>
                                    <p>{selectedDownload.phone || "—"}</p>
                                </div>
                                <div className="info-block">
                                    <label>Timestamp</label>
                                    <p>{formatDate(selectedDownload.downloadedAt)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="primary-modal-close" onClick={() => setSelectedDownload(null)}>
                                Close Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Downloads;