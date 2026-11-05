import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const RootRedirect = () => {
    const { user ,isLoading} = useContext(AuthContext);

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

    return (
        <Navigate
            to={
                user.role === "admin"
                    ? "/admin/dashboard"
                    : "/students/dashboard"
            }
            replace
        />
    );
};

export default RootRedirect;
