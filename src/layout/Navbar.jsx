const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
    return (
        <header>
            <nav className="bg-indigo-300 py-3">
                <div className="max-w-300 mx-auto flex justify-between items-center px-4">
                    <a href="#" className="font-bold text-3xl">
                        Logo
                    </a>
                    <span className="font-medium text-xl bg-indigo-700 py-2 px-3 rounded-lg text-white">Welcome, User</span>
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
