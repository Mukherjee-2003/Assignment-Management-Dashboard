import { useEffect, useState } from "react";
import AssignmentContext from "../context/AssignmentContext";
import { initialAssignments } from "../data/assignments";

const AssignmentProvider = ({ children }) => {
    const [assignments, setAssignments] = useState(() => {
        const savedAssignments = localStorage.getItem("assignments");

        return savedAssignments
            ? JSON.parse(savedAssignments)
            : initialAssignments;
    });

    function submitAssignment(assignmentId, userId) {
        setAssignments((prev) =>
            prev.map((assignment) => {
                if (assignment.id !== assignmentId) return assignment;

                if (assignment.submissions[userId]?.status === "SUBMITTED") {
                    return assignment;
                }

                return {
                    ...assignment,
                    submissions: {
                        ...assignment.submissions,
                        [userId]: {
                            status: "SUBMITTED",
                            submittedAt: new Date().toISOString(),
                        },
                    },
                };
            }),
        );
    }

    useEffect(() => {
        const storeAssignments = () => {
            localStorage.setItem("assignments", JSON.stringify(assignments));
        };
        storeAssignments();
    }, [assignments]);
    return (
        <AssignmentContext.Provider
            value={{ assignments, setAssignments, submitAssignment }}
        >
            {children}
        </AssignmentContext.Provider>
    );
};

export default AssignmentProvider;
