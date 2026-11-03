import { useState } from "react";

const Sidebar = ({ isMenuOpen }) => {
    const [activeItem, setActiveItem] = useState("DASHBOARD");
    const role = "STUDENT";

    const navItems =
        role === "ADMIN"
            ? [
                  { name: "DASHBOARD", label: "Dashboard" },
                  { name: "ASSIGNMENTS", label: "Assignments" },
                  { name: "STUDENTS", label: "Students" },
                  { name: "PROFILE", label: "Profile" },
              ]
            : [
                  { name: "DASHBOARD", label: "Dashboard" },
                  { name: "MY_ASSIGNMENTS", label: "My Assignments" },
                  { name: "PROFILE", label: "Profile" },
              ];

    const getItemClass = (itemName) =>
        `p-2 rounded-xl transition-colors cursor-pointer ${
            activeItem === itemName
                ? "bg-indigo-600 text-white"
                : "text-indigo-800 hover:bg-indigo-300"
        }`;

    return (
        <div
            className={`h-screen w-64 bg-indigo-200 flex flex-col gap-3 items-center py-5 rounded fixed inset-y-0 left-0 z-50 md:static md:translate-x-0 transition-transform duration-300 ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <a
                href="#"
                className="text-4xl text-indigo-600 font-bold tracking-tighter italic"
            >
                EduTech
            </a>

            <ul className="space-y-5 text-center mt-5 text-xl font-bold w-4/5">
                {navItems.map((item) => (
                    <li
                        key={item.key}
                        className={getItemClass(item.name)}
                        onClick={() => setActiveItem(item.name)}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
