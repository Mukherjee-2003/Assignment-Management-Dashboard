import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "../pages/Login";

const LoginRedirect = () => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                Loading Session...
            </div>
        );
    }

    if (!user) return <Login />;

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

export default LoginRedirect;
