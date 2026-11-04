import { useContext, useState } from "react";
import AssignmentContext from "../../context/AssignmentContext";
import AuthContext from "../../context/AuthContext";
import { users } from "../../data/users";

const ManageAssignments = () => {
    const { user } = useContext(AuthContext);
    const { assignments, setAssignments } = useContext(AssignmentContext);

    const students = users.filter((user) => user.role === "student");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        driveLink: "",
    });

    const [selectedStudents, setSelectedStudents] = useState([]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSelectAll(e) {
        setSelectedStudents(
            e.target.checked ? students.map((student) => student.id) : [],
        );
    }

    function handleStudentSelection(e) {
        const { value, checked } = e.target;
        setSelectedStudents((prev) =>
            checked ? [...prev, value] : prev.filter((id) => id !== value),
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (selectedStudents.length === 0) {
            alert("Please select at least one student.");
            return;
        }

        const newAssignment = {
            id: crypto.randomUUID(),
            ...formData,
            createdBy: user.id,
            assignedTo: selectedStudents,
            submissions: Object.fromEntries(
                selectedStudents.map((studentId) => [
                    studentId,
                    {
                        status: "NOT_SUBMITTED",
                        submittedAt: null,
                    },
                ]),
            ),
        };

        setAssignments((prev) => [newAssignment, ...prev]);

        // Reset Form
        setFormData({
            title: "",
            description: "",
            dueDate: "",
            driveLink: "",
        });
        setSelectedStudents([]);
    }

    const totalCreatedAssignments = assignments.filter(
        (assignment) => assignment.createdBy === user.id,
    );

    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl font-semibold tracking-tighter">
                Manage Assignments
            </h2>

            {/* Create Assignment Form */}
            <div className="border rounded px-4 py-3 mt-4">
                <h3 className="text-xl font-semibold">Create Assignment</h3>
                <form className="mt-4 w-4/5 space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange} /* Fixed */
                        id="title"
                        placeholder="Title: "
                        className="block w-full p-3 border border-slate-400"
                    />

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange} /* Fixed */
                        id="description"
                        placeholder="Description: "
                        className="block w-full p-3 border border-slate-400"
                    ></textarea>

                    <label
                        htmlFor="dueDate"
                        className="flex items-center gap-3 w-full p-3 border border-slate-400"
                    >
                        Due Date:{" "}
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange} /* Fixed */
                            id="dueDate"
                        />
                    </label>

                    <label
                        htmlFor="driveLink"
                        className="flex items-center gap-3 w-full p-3 border border-slate-400"
                    >
                        Drive Link:{" "}
                        <input
                            type="url"
                            name="driveLink"
                            value={formData.driveLink}
                            onChange={handleChange} /* Fixed */
                            id="driveLink"
                            className="w-1/2"
                        />
                    </label>

                    <div className="border p-4 rounded">
                        <h4 className="font-semibold mb-3">Assign To</h4>
                        <label className="flex gap-2 items-center mb-3">
                            <input
                                type="checkbox"
                                checked={
                                    students.length > 0 &&
                                    selectedStudents.length === students.length
                                }
                                onChange={handleSelectAll}
                            />
                            All Students
                        </label>

                        <div className="space-y-2">
                            {students.map((student) => (
                                <label
                                    key={student.id}
                                    className="flex gap-2 items-center"
                                >
                                    <input
                                        type="checkbox"
                                        value={student.id}
                                        checked={selectedStudents.includes(
                                            student.id,
                                        )}
                                        onChange={handleStudentSelection}
                                    />
                                    {student.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white text-lg px-7 py-2 rounded cursor-pointer"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                {totalCreatedAssignments.map((assignment) => {
                    let assignedStudents = assignment.assignedTo.length;
                    const submittedCount = Object.values(
                        assignment.submissions,
                    ).filter(
                        (submission) => submission.status === "SUBMITTED",
                    ).length;

                    let percentage = assignedStudents
                        ? Math.trunc((submittedCount / assignedStudents) * 100)
                        : 0;

                    return (
                        <div
                            key={assignment.id}
                            className="border border-slate-800 rounded-lg px-4 py-3"
                        >
                            <h5 className="font-semibold text-xl">
                                Title: {assignment.title}
                            </h5>
                            <p className="mt-2">
                                <span className="text-lg font-medium">
                                    Description:{" "}
                                </span>{" "}
                                {assignment.description}
                            </p>
                            <a
                                href={assignment.driveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="border rounded bg-blue-200 mt-3 inline-block px-3 py-1"
                            >
                                Drive Link
                            </a>
                            <p className="flex gap-3 items-center mt-4">
                                Due Date:{" "}
                                <span className="bg-red-600 text-white py-1 px-2 rounded-md">
                                    {assignment.dueDate}
                                </span>
                            </p>
                            <p className="mt-4">
                                Assigned Students: {assignedStudents}
                            </p>

                            {/* Progress Bar */}
                            <div className="mt-5">
                                <div className="flex justify-between items-center">
                                    <span>Total Submissions: </span>
                                    <p className="font-semibold text-lg">
                                        {percentage}%
                                    </p>
                                </div>
                                <div className="w-full rounded-full h-4 bg-gray-300 overflow-hidden mt-2">
                                    <div
                                        className="bg-blue-600 rounded-full h-4"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ManageAssignments;
