import { useEffect, useState } from "react";
import {
    FaSearch,
    FaCalendarCheck,
    FaVideo,
    FaExternalLinkAlt,
    FaSpinner,
    FaTimes
} from "react-icons/fa";
import { getMeetings, updateMeetingStatus } from "../service/adminApi";
import "../css/meeting.css";
import "../css/dashboard.css";

function Meetings() {
    const [search, setSearch] = useState("");
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // --- State controlling the new custom remarks modal pipeline ---
    const [statusModal, setStatusModal] = useState({
        isOpen: false,
        meetingId: null,
        targetStatus: "",
        remarks: ""
    });

    const loadMeetings = async () => {
        try {
            setError("");

            const response = await getMeetings();

            console.log("Meeting API Response:", response.data);

            const data = response.data;

            if (Array.isArray(data)) {
                setMeetings(data);
            } else if (Array.isArray(data.content)) {
                setMeetings(data.content);
            } else {
                setMeetings([]);
            }

        } catch (err) {
            console.error(err);
            setMeetings([]);
            setError("Failed to synchronize server metrics. Please reload.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadMeetings();
    }, []);

    // 1. Triggered by action buttons: opens custom modal instead of prompt()
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
        setStatusModal({ isOpen: false, meetingId: null, targetStatus: "", remarks: "" });
    };

    // 3. Dispatches payload asynchronously to the server
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

    if (loading) {
        return (
            <div className="meetings-loading-fallback">
                <FaSpinner className="spinner-loading-icon" />
                <p>Loading synchronization pipeline...</p>
            </div>
        );
    }

    const filteredMeetings = (Array.isArray(meetings) ? meetings : []).filter((m) => {
        const query = search.toLowerCase();

        return (
            (m.name || "").toLowerCase().includes(query) ||
            (m.purpose || "").toLowerCase().includes(query) ||
            (m.meetingMode || "").toLowerCase().includes(query) ||
            (m.status || "").toLowerCase().includes(query)
        );
    });

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
                        placeholder="Search meetings by name, intent objective, status, or channel mode..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
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

            {/* ==========================================================================
                Premium Remarks Input Lightbox Modal Insertion
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
                            <button
                                type="submit"
                                className="action-btn btn-resolve"
                                style={{ padding: "10px 20px" }}
                            >
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