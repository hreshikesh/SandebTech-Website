import { useEffect, useState, useCallback } from "react";
import { 
    FaSearch, 
    FaCalendarCheck, 
    FaVideo, 
    FaExternalLinkAlt, 
    FaSpinner,
    FaTimes,
    FaTrash,
    FaCalendarDay
} from "react-icons/fa";
import { getMeetings, updateMeetingStatus, deleteMeeting } from "../service/adminApi";
import "../css/meeting.css";
import "../css/dashboard.css";

function Meetings() {
    const [search, setSearch] = useState("");
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // --- Server-Side Pagination States ---
    const [currentPage, setCurrentPage] = useState(0); // Spring Data is 0-indexed
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const pageSize = 5;

    // --- Filtering States ---
    const [filterDate, setFilterDate] = useState("");
    const [isTodayOnly, setIsTodayOnly] = useState(false);

    // --- State controlling custom remarks modal pipeline ---
    const [statusModal, setStatusModal] = useState({
        isOpen: false,
        meetingId: null,
        targetStatus: "",
        remarks: ""
    });
    const [modalLoading, setModalLoading] = useState(false);

    const loadMeetings = useCallback(async (pageToFetch = 0) => {
        try {
            setError("");
            setLoading(true);
            const response = await getMeetings(pageToFetch, pageSize, "createdAt", "desc");
            const pageData = response.data;
            
            setMeetings(pageData.content || pageData || []);
            setTotalPages(pageData.totalPages || 1);
            setTotalElements(pageData.totalElements || (pageData.content ? pageData.content.length : 0));
        } catch (err) {
            console.error("Failed to load meetings:", err);
            setError("Failed to synchronize server metrics. Please reload.");
        } finally {
            setLoading(false);
        }
    }, [pageSize]);

    useEffect(() => {
        loadMeetings(currentPage);
    }, [currentPage, loadMeetings]);

    // 1. Triggered by action buttons: opens custom modal
    const handleStatusInitiation = (id, status) => {
        setStatusModal({
            isOpen: true,
            meetingId: id,
            targetStatus: status,
            remarks: ""
        });
    };

    // 2. Closes modal and resets internal control buffers
    const handleCloseModal = () => {
        if (modalLoading) return;
        setStatusModal({ isOpen: false, meetingId: null, targetStatus: "", remarks: "" });
    };

    // 3. Dispatches payload asynchronously to the server with loading state
    const handleStatusSubmit = async (e) => {
        e.preventDefault();
        const { meetingId, targetStatus, remarks } = statusModal;

        try {
            setModalLoading(true);
            await updateMeetingStatus(meetingId, targetStatus, remarks);
            handleCloseModal();
            loadMeetings(currentPage);
        } catch (err) {
            console.error("Failed to update meeting status:", err);
            setError("Failed to update meeting status. Please try again.");
        } finally {
            setModalLoading(false);
        }
    };

    // 4. Handles meeting deletion with confirmation
    const handleDeleteMeeting = async (id) => {
        if (!window.confirm("Are you sure you want to delete this meeting record?")) return;
        try {
            setError("");
            await deleteMeeting(id);
            loadMeetings(currentPage);
        } catch (err) {
            console.error("Failed to delete meeting:", err);
            setError("Failed to delete meeting. Please try again.");
        }
    };

    // --- Filtering Logic (Applied on current page view) ---
    const filteredMeetings = meetings.filter(m => {
        const query = search.toLowerCase();
        const matchesSearch = (
            (m.name || "").toLowerCase().includes(query) ||
            (m.purpose || "").toLowerCase().includes(query) ||
            (m.meetingMode || "").toLowerCase().includes(query) ||
            (m.status || "").toLowerCase().includes(query)
        );

        let matchesDate = true;
        if (isTodayOnly) {
            const todayStr = new Date().toISOString().split('T')[0];
            matchesDate = m.meetingDate === todayStr || (m.meetingDate && m.meetingDate.startsWith(todayStr));
        } else if (filterDate) {
            matchesDate = m.meetingDate === filterDate || (m.meetingDate && m.meetingDate.includes(filterDate));
        }

        return matchesSearch && matchesDate;
    });

    if (loading && meetings.length === 0) {
        return (
            <div className="meetings-loading-fallback">
                <FaSpinner className="spinner-loading-icon" />
                <p>Loading Meeting Details...</p>
            </div>
        );
    }

    return (
        <div className="admin-page text-layer-base">
            <div className="meetings-header-block">
                <h2>System Schedule & Meetings</h2>
                <p className="meetings-subtitle">Track, approve, manage, and dispatch live virtual conference room entries.</p>
            </div>

            <div className="meetings-toolbar-row">
                <div className="meetings-search-box">
                    <FaSearch className="search-embedded-icon" />
                    <input
                        type="text"
                        placeholder="Search meetings by name, intent objective, status..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="meetings-filter-group">
                    <button 
                        type="button"
                        className={`filter-btn-pill ${isTodayOnly ? "active" : ""}`}
                        onClick={() => {
                            setIsTodayOnly(!isTodayOnly);
                            if (!isTodayOnly) setFilterDate("");
                        }}
                    >
                        <FaCalendarDay size={12} />
                        <span>Today</span>
                    </button>

                    <div className="date-filter-wrapper">
                        <input
                            type="date"
                            className="date-filter-input"
                            value={filterDate}
                            onChange={(e) => {
                                setFilterDate(e.target.value);
                                setIsTodayOnly(false);
                            }}
                            title="Filter by specific date"
                        />
                    </div>

                    {(filterDate || isTodayOnly || search) && (
                        <button 
                            type="button" 
                            className="action-btn-pill"
                            onClick={() => {
                                setSearch("");
                                setFilterDate("");
                                setIsTodayOnly(false);
                            }}
                        >
                            Reset Filters
                        </button>
                    )}
                </div>
            </div>

            {error && <div className="system-error-banner">{error}</div>}

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

                                            <button
                                                className="action-btn-pill btn-delete-accent"
                                                onClick={() => handleDeleteMeeting(meeting.id)}
                                                title="Delete Meeting"
                                            >
                                                <FaTrash size={12} />
                                            </button>
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

                {/* --- Server-Side Pagination Footer Bar --- */}
                {totalElements > 0 && (
                    <div className="pagination-bar">
                        <span className="pagination-info">
                            Page {currentPage + 1} of {totalPages} (Total: {totalElements} meetings)
                        </span>
                        <div className="pagination-controls">
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                                disabled={currentPage === 0 || loading}
                            >
                                Previous
                            </button>
                            <span className="pagination-page-indicator">
                                {currentPage + 1} / {totalPages}
                            </span>
                            <button
                                className="pagination-btn"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))}
                                disabled={currentPage >= totalPages - 1 || loading}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ==========================================================================
                Modal with Loading State for Remarks/Status Update
               ========================================================================== */}
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
                            <button type="button" className="modal-close-btn" onClick={handleCloseModal} disabled={modalLoading}>
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
                                    disabled={modalLoading}
                                />
                            </div>
                        </div>

                        <div className="modal-footer" style={{ gap: "12px" }}>
                            <button type="button" className="primary-modal-close" onClick={handleCloseModal} disabled={modalLoading}>
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="action-btn btn-resolve"
                                style={{ padding: "10px 20px", display: "inline-flex", alignItems: "center", gap: "8px" }}
                                disabled={modalLoading}
                            >
                                {modalLoading && <FaSpinner className="spinner-loading-icon" style={{ fontSize: "14px" }} />}
                                <span>{modalLoading ? "Saving..." : "Confirm Action"}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Meetings;