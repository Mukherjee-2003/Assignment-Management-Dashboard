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

    useEffect(() => {
        const storeAssignments = () => {
            localStorage.setItem("assignments", JSON.stringify(assignments));
        };
        storeAssignments();
    }, [assignments]);
    return (
        <AssignmentContext.Provider value={{ assignments, setAssignments, }}>
            {children}
        </AssignmentContext.Provider>
    );
};

export default AssignmentProvider;
