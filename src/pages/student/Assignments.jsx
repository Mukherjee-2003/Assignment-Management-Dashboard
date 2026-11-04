import { useContext } from "react";
import AssignmentContext from "../../context/AssignmentContext";
import AuthContext from "../../context/AuthContext";

const Assignments = () => {
    const { user } = useContext(AuthContext);
    const { assignments } = useContext(AssignmentContext);

    const myAssignments = assignments.filter((a) =>
        a.assignedTo.includes(user.id),
    );
    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl tracking-tighter font-semibold">
                My Assignments
            </h2>
            <div className="grid mt-6 px-4 grid-cols-2 gap-4">
                {myAssignments.map((assignment) => (
                    <div
                        key={assignment.id}
                        className="border border-slate-800 rounded-lg px-4 py-3"
                    >
                        <h5 className="font-semibold text-xl">
                            Title: {assignment.title}
                        </h5>
                        <p className="mt-2">
                            <span className="text-lg font-medium">
                                Description:
                            </span>{" "}
                            {assignment.description}
                        </p>
                        <a href={assignment.driveLink} target="_blank" className="border rounded bg-blue-200 mt-3 inline-block px-3 py-1">
                            Drive Link
                        </a>
                        <div className="mt-4 flex justify-between items-center">
                            <p className="flex gap-3 items-center">
                                Due Date:{" "}
                                <span className="bg-red-600 text-white py-1 px-2 rounded-md">
                                    {assignment.dueDate}
                                </span>
                            </p>
                            <div
                                className={`font-medium px-2 py-1 rounded-md inline-block ${
                                    assignment.submissions[user.id].status ===
                                    "SUBMITTED"
                                        ? "bg-green-600 text-white"
                                        : "bg-yellow-500"
                                }`}
                            >
                                {assignment.submissions[user.id].status ===
                                "SUBMITTED"
                                    ? "Submitted"
                                    : "Pending"}
                            </div>
                        </div>

                        <div className="flex mt-8 justify-end px-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500">
                                SUBMIT
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Assignments;
