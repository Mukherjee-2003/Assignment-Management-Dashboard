import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const result = login(email);

        if (!result.success) {
            setError(result.error);
            return;
        }
        result.data.role === "admin"
            ? navigate("/admin/dashboard")
            : navigate("/students/dashboard");
    }
    return (
        <div className="max-w-300 mx-auto h-screen flex justify-center items-center px-2">
            <div className="w-full max-w-md border border-slate-800 px-8 py-10 rounded-sm bg-white shadow-xl">
                <h1 className="text-center text-4xl font-bold tracking-tighter">
                    Login
                </h1>
                <p className="text-center text-slate-400 text-sm mt-2">
                    Welcome Back! Please Enter your Details
                </p>
                <form className="mt-6 w-full" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Email:"
                        className="block w-full rounded border mt-4 bg-white shadow-sm border-slate-600 p-3"
                        required
                    />
                    <button className="bg-blue-600 text-white font-medium px-6 rounded py-2 hover:bg-blue-500 cursor-pointer block mx-auto text-lg mt-5 md:w-fit w-full">
                        Login
                    </button>
                </form>
                {error && (
                    <div className="text-center bg-red-200 p-2 rounded mt-3 text-red-800 font-medium">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
