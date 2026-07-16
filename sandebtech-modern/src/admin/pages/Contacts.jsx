import { useEffect, useState } from "react";
import { FaSearch, FaEye, FaTrash, FaPlay, FaCheck, FaTimes, FaInbox } from "react-icons/fa";
import { getContacts, updateContactStatus, deleteContact } from "../service/adminApi";
import "../css/contact.css"

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    
    // Modal state management for viewing the deep inquiry details
    const [selectedContact, setSelectedContact] = useState(null);

    const loadContacts = async () => {
        try {
            const response = await getContacts();
            setContacts(response.data.content || []);
        } catch (error) {
            console.error("Failed to load contacts", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const changeStatus = async (id, status) => {
        await updateContactStatus(id, status);
        loadContacts();
    };

    const remove = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this inquiry?")) return;
        await deleteContact(id);
        loadContacts();
    };

    // Render loading placeholders with a modern premium skeleton structure
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

    const filteredContacts = contacts.filter(c =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.subject?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="page-header-row">
                <div>
                    <h2>Contact Inquiries</h2>
                    <p className="page-subtitle">Manage, track, and process incoming support and sales request threads.</p>
                </div>
            </div>

            {/* Premium Action Toolbar Controls */}
            <div className="table-toolbar">
                <div className="search-wrapper">
                    <FaSearch className="search-icon-field" />
                    <input
                        type="text"
                        placeholder="Search inquiries by name, email, or subject keywords..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Data Grid Framework */}
            <div className="table-responsive-container">
                <table className="premium-data-table">
                    <thead>
                        <tr>
                            <th>Sender Info</th>
                            <th>Subject</th>
                            <th>Status Badge</th>
                            <th className="text-right">Management Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>
                                        <div className="identity-cell">
                                            <span className="cell-primary-name">{contact.name}</span>
                                            <span className="cell-secondary-email">{contact.email}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="cell-subject-text">{contact.subject}</span>
                                    </td>
                                    <td>
                                        <span className={`status-badge status-${contact.status?.toLowerCase()}`}>
                                            {contact.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-button-group">
                                            {contact.status === "NEW" && (
                                                <button
                                                    className="action-btn btn-start"
                                                    title="Mark In Progress"
                                                    onClick={() => changeStatus(contact.id, "IN_PROGRESS")}
                                                >
                                                    <FaPlay size={12} /> <span>Start</span>
                                                </button>
                                            )}
                                            {contact.status === "IN_PROGRESS" && (
                                                <button
                                                    className="action-btn btn-resolve"
                                                    title="Mark Resolved"
                                                    onClick={() => changeStatus(contact.id, "RESOLVED")}
                                                >
                                                    <FaCheck size={12} /> <span>Resolve</span>
                                                </button>
                                            )}
                                            <button
                                                className="action-btn btn-view"
                                                title="View Message Details"
                                                onClick={() => setSelectedContact(contact)}
                                            >
                                                <FaEye size={13} /> <span>View</span>
                                            </button>
                                            <button
                                                className="action-btn btn-delete"
                                                title="Delete Inquiry Record"
                                                onClick={() => remove(contact.id)}
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="empty-state-cell">
                                    <div className="empty-state">
                                        <FaInbox size={40} />
                                        <h3>No records found</h3>
                                        <p>Adjust your search query or check back later for new messages.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Premium Details Lightbox Modal Overlay */}
            {selectedContact && (
                <div className="modal-backdrop" onClick={() => setSelectedContact(null)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <h3>Inquiry Profile</h3>
                                <span className={`status-badge status-${selectedContact.status?.toLowerCase()}`}>
                                    {selectedContact.status}
                                </span>
                            </div>
                            <button className="modal-close-btn" onClick={() => setSelectedContact(null)}>
                                <FaTimes size={16} />
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="info-grid-row">
                                <div className="info-block">
                                    <label>Full Name</label>
                                    <p>{selectedContact.name || "—"}</p>
                                </div>
                                <div className="info-block">
                                    <label>Email Reference</label>
                                    <p className="selectable-link">{selectedContact.email || "—"}</p>
                                </div>
                            </div>

                            <div className="info-grid-row">
                                <div className="info-block">
                                    <label>Phone Number</label>
                                    <p>{selectedContact.phone || "—"}</p>
                                </div>
                                <div className="info-block">
                                    <label>Company / Corporate Affiliate</label>
                                    <p>{selectedContact.company || "—"}</p>
                                </div>
                            </div>

                            <div className="info-block full-width-block">
                                <label>Subject Line</label>
                                <p className="subject-highlight">{selectedContact.subject || "—"}</p>
                            </div>

                            <div className="info-block full-width-block message-payload-container">
                                <label>Transmitted Content Message</label>
                                <div className="message-bubble">
                                    {selectedContact.message || "No body content transmitted inside this request structure."}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="primary-modal-close" onClick={() => setSelectedContact(null)}>
                                Complete Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contacts;