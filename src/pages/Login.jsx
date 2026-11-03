import { useState } from "react";

const Login = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log("Form Data: ", formData);
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
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        id="name"
                        placeholder="Name:"
                        className="block w-full rounded border bg-white shadow-sm border-slate-600 p-3"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="Email:"
                        className="block w-full rounded border mt-4 bg-white shadow-sm border-slate-600 p-3"
                    />
                    <button className="bg-blue-600 text-white font-medium px-6 rounded py-2 hover:bg-blue-500 cursor-pointer block mx-auto text-lg mt-5 md:w-fit w-full">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
