import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../css/admin.css";

function AdminLayout() {
    return (
        <div className="admin-layout">
            {/* The Sidebar component stays locked to the left wing */}
            <Sidebar />
            
            {/* Dynamic system main track */}
            <div className="admin-main">
                <Topbar />
                
                {/* Scrollable workspace core wrapper */}
                <main className="admin-content-viewport">
                    <div className="admin-content-inner">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;