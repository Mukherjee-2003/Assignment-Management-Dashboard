import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isMenuOpen }) => {
    const { user } = useContext(AuthContext);
    const role = user?.role;

    const navItems =
        role === "admin"
            ? [
                  {
                      name: "DASHBOARD",
                      label: "Dashboard",
                      link: "/admin/dashboard",
                  },
                  {
                      name: "ASSIGNMENTS",
                      label: "Assignments",
                      link: "/admin/assignments",
                  },
              ]
            : [
                  {
                      name: "DASHBOARD",
                      label: "Dashboard",
                      link: "/students/dashboard",
                  },
                  {
                      name: "MY_ASSIGNMENTS",
                      label: "My Assignments",
                      link: "/students/assignments",
                  },
              ];

    const getLinkClass = ({ isActive }) =>
        `block p-2 rounded-xl transition-colors cursor-pointer w-full text-center ${
            isActive
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

            <ul className="space-y-5 mt-5 text-xl font-bold w-4/5 list-none p-0">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <NavLink to={item.link} className={getLinkClass}>
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
