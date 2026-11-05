import { useContext, useState } from "react";
import AssignmentContext from "../../context/AssignmentContext";
import AuthContext from "../../context/AuthContext";

const Assignments = () => {
    const { user } = useContext(AuthContext);
    const { assignments, submitAssignment } = useContext(AssignmentContext);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
    const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);

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
                        <a
                            href={assignment.driveLink}
                            target="_blank"
                            className="border rounded bg-blue-200 mt-3 inline-block px-3 py-1"
                        >
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
                            {assignment.submissions[user.id]?.status !==
                                "SUBMITTED" && (
                                <button
                                    onClick={() =>
                                        setSelectedAssignmentId(assignment.id)
                                    }
                                    className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-500"
                                >
                                    SUBMIT
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {selectedAssignmentId && !showFinalConfirmation && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-11/12 max-w-md">
                        <h3 className="text-xl font-semibold">
                            Have you submitted this assignment?
                        </h3>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setSelectedAssignmentId(null)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => setShowFinalConfirmation(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Yes, I have submitted
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {selectedAssignmentId && showFinalConfirmation && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-11/12 max-w-md">
                        <h3 className="text-xl font-semibold">Are you sure?</h3>

                        <p className="mt-2 text-slate-600">
                            This will mark your assignment as submitted.
                        </p>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowFinalConfirmation(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Go Back
                            </button>

                            <button
                                onClick={() => {
                                    submitAssignment(
                                        selectedAssignmentId,
                                        user.id,
                                    );
                                    setSelectedAssignmentId(null);
                                    setShowFinalConfirmation(false);
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assignments;
