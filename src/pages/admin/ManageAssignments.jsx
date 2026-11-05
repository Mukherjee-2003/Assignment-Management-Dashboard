import { useContext, useState } from "react";
import AssignmentContext from "../../context/AssignmentContext";
import AuthContext from "../../context/AuthContext";
import { users } from "../../data/users";

const ManageAssignments = () => {
    const { user } = useContext(AuthContext);
    const { assignments, setAssignments } = useContext(AssignmentContext);

    console.log("Admin: ",assignments);

    const students = users.filter((user) => user.role === "student");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        driveLink: "",
    });

    const [selectedStudents, setSelectedStudents] = useState([]);

    const [editingId, setEditingId] = useState(null);

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

        const studentId = Number(value);

        setSelectedStudents((prev) =>
            checked ? [...prev, value] : prev.filter((id) => id !== studentId),
        );
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (selectedStudents.length === 0) {
            alert("Please select at least one student.");
            return;
        }

        if (editingId) {
            setAssignments((prev) =>
                prev.map((assignment) =>
                    assignment.id === editingId
                        ? {
                              ...assignment,
                              ...formData,
                              assignedTo: selectedStudents,
                          }
                        : assignment,
                ),
            );

            setEditingId(null);
        } else {
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
        }

        setFormData({
            title: "",
            description: "",
            dueDate: "",
            driveLink: "",
        });
        setSelectedStudents([]);
    }

    function handleEdit(id) {
        const assignment = assignments.find(
            (assignment) => assignment.id === id,
        );

        if (!assignment) return;

        setEditingId(assignment.id);

        setFormData({
            title: assignment.title,
            description: assignment.description,
            dueDate: assignment.dueDate,
            driveLink: assignment.driveLink,
        });

        setSelectedStudents(assignment.assignedTo);
    }

    function handleDelete(id) {
        const userConfirmed = window.confirm(
            "Are you sure you want to delete this assignment ?",
        );

        if (userConfirmed) {
            setAssignments((prev) =>
                prev.filter((assignment) => assignment.id !== id),
            );
        } else {
            console.log("Action Cancelled");
        }
    }

    const totalCreatedAssignments = assignments.filter(
        (assignment) => assignment.createdBy === user.id,
    );

    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl font-semibold tracking-tighter">
                Manage Assignments
            </h2>

            <div className="border rounded px-4 py-3 mt-4">
                <h3 className="text-xl font-semibold">Create Assignment</h3>
                <form
                    className="mt-4 md:w-4/5 w-full space-y-4"
                    onSubmit={handleSubmit}
                >
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

            <div className="mt-6 grid grid-cols-1 gap-4">
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
                            <div className="mt-5">
                                <h4 className="font-semibold text-lg mb-3">
                                    Student Submissions ({assignedStudents})
                                </h4>

                                <div className="space-y-3">
                                    {assignment.assignedTo.map((studentId) => {
                                        const student = students.find(
                                            (student) =>
                                                student.id === studentId,
                                        );

                                        const submission =
                                            assignment.submissions[studentId];

                                        return (
                                            <div
                                                key={studentId}
                                                className="flex justify-between items-center border rounded-lg px-3 py-2"
                                            >
                                                <div>
                                                    <p className="font-medium">
                                                        {student?.name ||
                                                            "Unknown Student"}
                                                    </p>
                                                    <p className="text-sm text-slate-500">
                                                        {submission?.submittedAt
                                                            ? new Date(
                                                                  submission.submittedAt,
                                                              ).toLocaleString()
                                                            : "Not submitted yet"}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                                                        submission?.status ===
                                                        "SUBMITTED"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                    {submission?.status ===
                                                    "SUBMITTED"
                                                        ? "Submitted"
                                                        : "Pending"}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

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
                            <div className="mt-4 flex items-center gap-3">
                                <button
                                    onClick={() => handleEdit(assignment.id)}
                                    className="bg-yellow-500 text-black px-5 py-2 rounded-md hover:bg-yellow-600 cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(assignment.id)}
                                    className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ManageAssignments;
