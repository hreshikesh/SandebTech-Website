import { useEffect, useState } from "react";
import { 
    FaSearch, 
    FaUserShield, 
    FaTrashAlt, 
    FaEye, 
    FaUserCog, 
    FaSpinner, 
    FaUsers, 
    FaExclamationTriangle,
    FaTimes
} from "react-icons/fa";
import {
    getUsers,
    deleteUser,
    updateUserRole
} from "../service/adminApi";
import "../css/user.css" // Ensure this path matches your directory setup

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    
    // UI state for custom premium user information modal instead of standard window.alert
    const [selectedUser, setSelectedUser] = useState(null);

    const loadUsers = async () => {
        try {
            setError("");
            const response = await getUsers();
            // Fallback checking to keep engine safe regardless of server response envelope shapes
            setUsers(response.data?.content || response.data || []);
        } catch (err) {
            console.error("Failed to load pipeline users:", err);
            setError("Failed to synchronize server matrix variables. Please reload.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const changeRole = async (id, currentRole) => {
        const targetRole = currentRole === "ADMIN" ? "USER" : "ADMIN";
        const confirmToggle = window.confirm(`Elevate/Demote user privileges to [ ${targetRole} ] status?`);
        if (!confirmToggle) return;

        try {
            await updateUserRole(id, targetRole);
            loadUsers();
            if (selectedUser && selectedUser.id === id) {
                setSelectedUser(prev => ({ ...prev, userRole: targetRole }));
            }
        } catch (err) {
            console.error("Role update sequence failed:", err);
        }
    };

    const remove = async (id) => {
        if (!window.confirm("Permanently purge this user account from security databases? This operation is irreversible."))
            return;
        
        try {
            await deleteUser(id);
            if (selectedUser && selectedUser.id === id) setSelectedUser(null);
            loadUsers();
        } catch (err) {
            console.error("Deletion lifecycle failure:", err);
        }
    };

    if (loading) {
        return (
            <div className="users-loading-fallback">
                <FaSpinner className="spinner-loading-icon" />
                <p>Decoding security matrix directory...</p>
            </div>
        );
    }

    // Fully adaptive structural filtration mapping across name, email, and company strings
    const filteredUsers = users.filter(user => {
        const query = search.toLowerCase();
        return (
            (user.name || "").toLowerCase().includes(query) ||
            (user.email || "").toLowerCase().includes(query) ||
            (user.company || "").toLowerCase().includes(query) ||
            (user.userRole || "").toLowerCase().includes(query)
        );
    });

    return (
        <div className="admin-page text-layer-base">
            <div className="users-header-block">
                <h2>Security Directory & Identity Access</h2>
                <p className="users-subtitle">Review authentication privileges, configure authorization bounds, and manage user lifecycles.</p>
            </div>

            {/* Modern Clean Custom Input Control Strip */}
            <div className="users-toolbar-row">
                <div className="users-search-box">
                  
                    <input
                        type="text"
                        placeholder="Search identities by name, communication nodes, role arrays..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {error && (
                <div className="system-error-banner">
                    <FaExclamationTriangle />
                    <span>{error}</span>
                </div>
            )}

            {/* Premium Optimized Overlap Safe Grid Frame */}
            <div className="table-overflow-frame">
                <table className="user-matrix-table container-data-grid">
                    <thead>
                        <tr>
                            <th>Identity Name</th>
                            <th>Communication Terminal (Email)</th>
                            <th>Organizational Unit</th>
                            <th>Security Clearances</th>
                            <th className="action-column-header">Access Controls</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="strong-cell-text">{user.name || "—"}</td>
                                    <td>{user.email || "—"}</td>
                                    <td>{user.company || "—"}</td>
                                    <td>
                                        <span className={`role-pill role-${(user.userRole || "").toLowerCase()}`}>
                                            <FaUserShield size={10} className="pill-decoration-icon" />
                                            {user.userRole || "USER"}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="users-action-cell-group">
                                            <button
                                                className="action-btn-pill btn-view-accent"
                                                onClick={() => setSelectedUser(user)}
                                                title="Inspect Entity"
                                            >
                                                <FaEye />
                                                <span>Inspect</span>
                                            </button>
                                            <button
                                                className="action-btn-pill btn-role-accent"
                                                onClick={() => changeRole(user.id, user.userRole)}
                                                title="Toggle Security Clearances"
                                            >
                                                <FaUserCog />
                                                <span>Mod Role</span>
                                            </button>
                                            <button
                                                className="action-btn-pill btn-del-accent"
                                                onClick={() => remove(user.id)}
                                                title="Purge Identity Profile"
                                            >
                                                <FaTrashAlt />
                                                <span>Purge</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="users-empty-grid-placeholder">
                                    <FaUsers size={36} className="empty-state-icon-svg" />
                                    <h4>No verified profiles match structural criteria</h4>
                                    <p>Try alternate operational tokens or check spelling variations.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Premium Custom Glassmorphic Detailed Inspection Card Modal Overlay */}
            {selectedUser && (
                <div className="identity-overlay-shield" onClick={() => setSelectedUser(null)}>
                    <div className="identity-inspection-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header-ribbon">
                            <h3>Profile Inspection</h3>
                            <button className="modal-close-icon-btn" onClick={() => setSelectedUser(null)}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-profile-payload">
                            <div className="meta-card-row">
                                <span className="meta-card-label">Entity Full Name</span>
                                <span className="meta-card-value">{selectedUser.name || "—"}</span>
                            </div>
                            <div className="meta-card-row">
                                <span className="meta-card-label">Communication Node</span>
                                <span className="meta-card-value">{selectedUser.email || "—"}</span>
                            </div>
                            <div className="meta-card-row">
                                <span className="meta-card-label">Mobile Subsystem</span>
                                <span className="meta-card-value">{selectedUser.phone || "—"}</span>
                            </div>
                            <div className="meta-card-row">
                                <span className="meta-card-label">Organizational Unit</span>
                                <span className="meta-card-value">{selectedUser.company || "—"}</span>
                            </div>
                            <div className="meta-card-row">
                                <span className="meta-card-label">Security Assignment</span>
                                <span className={`role-pill role-${(selectedUser.userRole || "").toLowerCase()}`}>
                                    {selectedUser.userRole || "USER"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;