import { useContext } from "react";
import AssignmentContext from "../../context/AssignmentContext";
import AuthContext from "../../context/AuthContext";
import { users } from "../../data/users";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const { assignments } = useContext(AssignmentContext);

    const totalCreatedAssignments = assignments.filter(
        (assignment) => assignment.createdBy === user.id,
    ).length;
    const totalStudents = users.filter(
        (user) => user.role === "student",
    ).length;

    const totalSubmissions = assignments
        .filter((assignment) => assignment.createdBy === user.id)
        .reduce((count, assignment) => {
            const submittedCount = Object.values(
                assignment.submissions,
            ).filter((submission) => submission.status === "SUBMITTED").length;

            return count + submittedCount;
        }, 0);

        const pendingSubmissions = assignments
        .filter((assignment) => assignment.createdBy === user.id)
        .reduce((count, assignment) => {
            const submittedCount = Object.values(
                assignment.submissions,
            ).filter((submission) => submission.status === "NOT_SUBMITTED").length;

            return count + submittedCount;
        }, 0);
    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl tracking-tighter font-semibold">
                Admin Dashboard
            </h2>
            <p className="text-slate-600 mt-2">
                Here's your dashboard statistics
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 px-4 w-4/5">
                <div className="border bg-white py-3 px-6 text-center border-slate-800 shadow rounded-lg">
                    <p className="text-sm text-slate-800">Total Assignments</p>
                    <p className="text-5xl font-bold mt-2">
                        {totalCreatedAssignments}
                    </p>
                </div>
                <div className="border bg-white py-3 px-6 text-center border-slate-800 shadow rounded-lg">
                    <p className="text-sm text-slate-800">Total Students</p>
                    <p className="text-5xl font-bold mt-2">{totalStudents}</p>
                </div>
                <div className="border bg-white py-3 px-6 text-center border-slate-800 shadow rounded-lg">
                    <p className="text-sm text-slate-800">Total Submissions</p>
                    <p className="text-5xl font-bold mt-2">
                        {totalSubmissions}
                    </p>
                </div>
                <div className="border bg-white py-3 px-6 text-center border-slate-800 shadow rounded-lg">
                    <p className="text-sm text-slate-800">Pending Submissions</p>
                    <p className="text-5xl font-bold mt-2">{pendingSubmissions}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
