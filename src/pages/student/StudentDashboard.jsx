import { useContext } from "react";
import AssignmentContext from "../../context/AssignmentContext";
import AuthContext from "../../context/AuthContext";

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const { assignments } = useContext(AssignmentContext);

    const total = assignments.filter((a) =>
        a.assignedTo.includes(user.id),
    ).length;

    const submitted = assignments.filter(
        (a) => a.submissions[user.id]?.status === "SUBMITTED",
    ).length;

    const pending = assignments.filter(
        (a) => a.submissions[user.id]?.status === "NOT_SUBMITTED",
    ).length;
    const percentage = Math.trunc((submitted / total) * 100);

    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl font-semibold">
                Welcome Back , {user.name || "User"}!
            </h2>
            <p className="text-slate-600 mt-2">
                Here's your assignment overview
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 px-4 w-4/5">
                <div className="border bg-white py-3 px-6 text-center border-slate-800 shadow rounded-lg">
                    <p className="text-sm text-slate-800">Total Assignments</p>
                    <p className="text-5xl font-bold mt-2">{total}</p>
                </div>
                <div className="border bg-white py-3 px-6 text-center border-slate-800 shadow rounded-lg">
                    <p className="text-sm text-slate-800">Submitted</p>
                    <p className="text-5xl font-bold mt-2">{submitted}</p>
                </div>
                <div className="border bg-white py-3 px-6 text-center border-slate-800 shadow rounded-lg">
                    <p className="text-sm text-slate-800">Pending</p>
                    <p className="text-5xl font-bold mt-2">{pending}</p>
                </div>
                <div className="border bg-white py-3 px-6 text-center border-slate-800 shadow rounded-lg">
                    <p className="text-sm text-slate-800">Completion</p>
                    <p className="text-5xl font-bold mt-2">{percentage}%</p>
                </div>
            </div>

            <div className="mt-7 px-6">
                <h3 className="text-2xl font-semibold">Overall Progress</h3>
                <div className="flex justify-between">
                    <span className="text-slate-800">
                        {submitted} out of {total} completed
                    </span>
                    <span className="text-xl font-semibold">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden mt-3">
                    <div
                        className="bg-blue-600 rounded-full h-4"
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
