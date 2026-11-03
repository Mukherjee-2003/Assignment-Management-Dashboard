import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const DashboardLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="flex min-h-screen">
            {isMenuOpen && (
                <div
                    className="bg-black/40 fixed md:hidden inset-0 z-40"
                    onClick={() => setIsMenuOpen(false)}
                ></div>
            )}
            <Sidebar isMenuOpen={isMenuOpen} />
            <div className=" flex-1">
                <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <MainContent />
            </div>
        </div>
    );
};

export default DashboardLayout;
