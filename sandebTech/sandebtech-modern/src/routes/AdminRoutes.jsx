import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
function AdminRoute({ children }) {
    const { user } = useAuth();

    // Not logged in
    if (!user) {
        return <Navigate to="/404" replace />;
    }

    // Logged in but not admin
    if (user.role !== "ADMIN") {
        return <Navigate to="/404" replace />;
    }

    return children;
}

export default AdminRoute;