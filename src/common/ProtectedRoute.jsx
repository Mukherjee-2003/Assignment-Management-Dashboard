import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                Loading Session...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== allowedRole) {
        return (
            <div className="p-5 text-red-600 font-bold">
                You are unauthorized to access this page
            </div>
        );
    }

    return children;
};
export default ProtectedRoute;
