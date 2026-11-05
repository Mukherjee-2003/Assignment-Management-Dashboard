import { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = () => {
            try {
                const storedUser = JSON.parse(
                    localStorage.getItem("loggedInUser"),
                );

                console.log("Stored User: ", storedUser);

                if (storedUser) {
                    setUser(storedUser);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    function login(email) {
        const loggedInUser = users.find((user) => user.email === email);

        if (!loggedInUser) {
            return { success: false, error: "User not found" };
        }
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

        setUser(loggedInUser);

        return { success: true, data: loggedInUser };
    }

    function logout() {
        localStorage.removeItem("loggedInUser");
        navigate("/login", { replace: true });
        setUser("null");
    }

    return (
        <AuthContext.Provider value={{ user, login, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
