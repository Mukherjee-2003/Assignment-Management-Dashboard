import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const RootRedirect = () => {
    const { user } = useContext(AuthContext);

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
