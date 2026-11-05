import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
    const { logout } = useContext(AuthContext);
    return (
        <header>
            <nav className="bg-indigo-300 py-3">
                <div className="max-w-300 mx-auto flex justify-between items-center px-4">
                    <a href="#" className="font-bold text-3xl">
                        Logo
                    </a>
                    <button
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                        onClick={logout}
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="cursor-pointer text-2xl block md:hidden"
                    >
                        ☰
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
