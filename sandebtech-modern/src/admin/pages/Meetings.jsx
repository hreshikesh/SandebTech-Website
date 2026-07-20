import { useEffect, useState, useCallback } from "react";
import { 
    FaSearch, 
    FaCalendarCheck, 
    FaVideo, 
    FaExternalLinkAlt, 
    FaSpinner,
    FaTimes,
    FaSortAmountDown,
    FaSortAmountUp,
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";
import { getMeetings, updateMeetingStatus } from "../service/adminApi";
import "../css/meeting.css";
import "../css/dashboard.css";

function Meetings() {
    const [search, setSearch] = useState("");
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // --- Pagination & Sorting State ---
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [sortDirection, setSortDirection] = useState("desc"); // 'desc' = Newest, 'asc' = Oldest

    // --- Custom remarks modal control state ---
    const [statusModal, setStatusModal] = useState({
        isOpen: false,
        meetingId: null,
        targetStatus: "",
        remarks: ""
    });

    // Synchronize data fetch with backend pageable structures
    const loadMeetings = useCallback(async () => {
        setLoading(true);
        setError("");
        const startTime = Date.now();

        try {
            // Passes pagination parameters directly matching your Spring Boot controller
            const response = await getMeetings(currentPage, pageSize, "meetingDate", sortDirection);
            const data = response?.data;

            // Enforce strict 3-second spinner visibility rule for smooth UX transitions
            const elapsedTime = Date.now() - startTime;
            const targetDelay = 3000;
            if (elapsedTime < targetDelay) {
                await new Promise(resolve => setTimeout(resolve, targetDelay - elapsedTime));
            }

            if (data && data.content) {
                setMeetings(data.content);
                setTotalPages(data.totalPages || 0);
                setTotalElements(data.totalElements || 0);
            } else {
                // Fallback handle for non-paged direct array responses
                setMeetings(Array.isArray(data) ? data : []);
                setTotalPages(1);
                setTotalElements(Array.isArray(data) ? data.length : 0);
            }
        } catch (err) {
            console.error("Failed to load meetings:", err);
            setError("Failed to synchronize server metrics. Please reload.");
        } finally {
            setLoading(false);
        }
    }, [currentPage, pageSize, sortDirection]);

    useEffect(() => {
        loadMeetings();
    }, [loadMeetings]);

    const handleStatusInitiation = (id, status) => {
        setStatusModal({
            isOpen: true,
            meetingId: id,
            targetStatus: status,
            remarks: ""
        });
    };

    const handleCloseModal = () => {
        setStatusModal({ isOpen: false, meetingId: null, targetStatus: "", remarks: "" });
    };

    const handleStatusSubmit = async (e) => {
        e.preventDefault();
        const { meetingId, targetStatus, remarks } = statusModal;

        try {
            await updateMeetingStatus(meetingId, targetStatus, remarks);
            handleCloseModal();
            loadMeetings();
        } catch (err) {
            console.error("Failed to update meeting status:", err);
        }
    };

    // Client-side quick filter for items loaded inside the current page frame
    const filteredMeetings = meetings.filter(m => {
        const query = search.toLowerCase();
        return (
            (m.name || "").toLowerCase().includes(query) ||
            (m.purpose || "").toLowerCase().includes(query) ||
            (m.meetingMode || "").toLowerCase().includes(query) ||
            (m.status || "").toLowerCase().includes(query)
        );
    });

    if (loading) {
        return (
            <div className="premium-loader-container">
                <div className="premium-loader-card">
                    <FaSpinner className="spinner-loading-icon-animated" />
                    <h3>Synchronizing Schedule Pipeline</h3>
                    <p>Fetching secure virtual conference data structures...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page text-layer-base">
            <div className="meetings-header-block">
                <h2>System Schedule & Meetings</h2>
                <p className="meetings-subtitle">Track, approve, manage, and dispatch live virtual conference room entries.</p>
            </div>

            {/* Premium Interactive Control Bar */}
            <div className="premium-toolbar-card">
                <div className="meetings-search-box">
                    <FaSearch className="search-embedded-icon" />
                    <input
                        type="text"
                        placeholder="Filter current view by name, objective, status..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="toolbar-actions-group">
                    {/* Date Sorting Filter Widget */}
                    <button 
                        type="button"
                        className="premium-filter-btn"
                        onClick={() => setSortDirection(prev => prev === "desc" ? "asc" : "desc")}
                        title={sortDirection === "desc" ? "Sorting: Newest First" : "Sorting: Oldest First"}
                    >
                        {sortDirection === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
                        <span>Date: {sortDirection === "desc" ? "Newest First" : "Oldest First"}</span>
                    </button>

                    {/* Page Size Selector */}
                    <div className="size-selector-wrapper">
                        <select 
                            value={pageSize} 
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setCurrentPage(0); // Reset to page 0 on frame dimension adjustments
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

            {error && <div className="system-error-banner">{error}</div>}

            {/* Responsive Data Grid Frame */}
            <div className="table-overflow-frame">
                <table className="meeting-table container-data-grid">
                    <thead>
                        <tr>
                            <th>Participant Name</th>
                            <th>Calendar Window</th>
                            <th>Time Window</th>
                            <th>Modality</th>
                            <th>Google Meet Reference</th>
                            <th>Status</th>
                            <th className="action-column-header">Control Pipeline</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredMeetings.length > 0 ? (
                            filteredMeetings.map((meeting) => (
                                <tr key={meeting.id}>
                                    <td className="strong-cell-text">{meeting.name || "—"}</td>
                                    <td>{meeting.meetingDate}</td>
                                    <td className="time-window-cell">
                                        {meeting.startTime} – {meeting.endTime}
                                    </td>
                                    <td>
                                        <span className={`mode-pill mode-${(meeting.meetingMode || "").toLowerCase()}`}>
                                            {meeting.meetingMode}
                                        </span>
                                    </td>
                                    <td>
                                        {meeting.googleMeetLink ? (
                                            <a 
                                                href={meeting.googleMeetLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="meet-integration-link"
                                            >
                                                <FaVideo size={12} />
                                                <span>Join Room</span>
                                                <FaExternalLinkAlt size={10} className="external-arrow-offset" />
                                            </a>
                                        ) : (
                                            <span className="inactive-link-placeholder">No link generated</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`status ${(meeting.status || "").toLowerCase()}`}>
                                            {meeting.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="meetings-action-cell-group">
                                            {meeting.status === "PENDING" && (
                                                <>
                                                    <button
                                                        className="action-btn-pill btn-confirm-accent"
                                                        onClick={() => handleStatusInitiation(meeting.id, "CONFIRMED")}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className="action-btn-pill btn-reject-accent"
                                                        onClick={() => handleStatusInitiation(meeting.id, "REJECTED")}
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}

                                            {meeting.status === "CONFIRMED" && (
                                                <>
                                                    <button
                                                        className="action-btn-pill btn-complete-accent"
                                                        onClick={() => handleStatusInitiation(meeting.id, "COMPLETED")}
                                                    >
                                                        Complete
                                                    </button>
                                                    <button
                                                        className="action-btn-pill btn-cancel-accent"
                                                        onClick={() => handleStatusInitiation(meeting.id, "CANCELLED")}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="meetings-empty-grid-placeholder">
                                    <FaCalendarCheck size={36} className="empty-state-icon-svg" />
                                    <h4>No records matched search conditions</h4>
                                    <p>Try structural queries or check system variables.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Premium Responsive Pagination Control Footer */}
            {totalPages > 0 && (
                <div className="premium-pagination-footer">
                    <div className="pagination-metrics">
                        Showing <span className="highlight-metric">{currentPage * pageSize + 1}</span> to{" "}
                        <span className="highlight-metric">
                            {Math.min((currentPage + 1) * pageSize, totalElements)}
                        </span>{" "}
                        of <span className="highlight-metric">{totalElements}</span> system deployment records
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

            {/* Remarks Lightbox Modal */}
            {statusModal.isOpen && (
                <div className="modal-backdrop" onClick={handleCloseModal}>
                    <form 
                        className="modal-card" 
                        onClick={(e) => e.stopPropagation()} 
                        onSubmit={handleStatusSubmit}
                    >
                        <div className="modal-header">
                            <div>
                                <h3>Adjust Meeting Status</h3>
                                <p className="page-subtitle" style={{ margin: 0 }}>
                                    Transitioning workflow target directly to <span className="subject-highlight">{statusModal.targetStatus}</span>
                                </p>
                            </div>
                            <button type="button" className="modal-close-btn" onClick={handleCloseModal}>
                                <FaTimes size={16} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="info-block">
                                <label htmlFor="adminRemarks">Internal Operation Remarks</label>
                                <textarea
                                    id="adminRemarks"
                                    className="message-bubble"
                                    style={{ width: "100%", minHeight: "100px", resize: "vertical", fontFamily: "inherit" }}
                                    placeholder="Enter internal admin remarks for this status adjustment updates..."
                                    value={statusModal.remarks}
                                    onChange={(e) => setStatusModal({ ...statusModal, remarks: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="modal-footer" style={{ gap: "12px" }}>
                            <button type="button" className="primary-modal-close" onClick={handleCloseModal}>
                                Cancel
                            </button>
                            <button type="submit" className="action-btn btn-resolve" style={{ padding: "10px 20px" }}>
                                Confirm Action
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Meetings;