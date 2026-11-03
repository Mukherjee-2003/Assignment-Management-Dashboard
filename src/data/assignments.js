export const assignments = [
    {
        id: "a1",
        title: "Introduction to React Hooks",
        description: "Complete the exercises on useState and useEffect.",
        createdBy: "u1", // Created by Admin 1
        assignedTo: ["u3", "u4", "u5", "u6", "u7"], // Assigned to ALL students
        dueDate: "2026-11-15",
        submissions: [
            {
                studentId: "u3",
                status: "submitted",
                submittedAt: "2026-11-02",
                grade: null,
            },
            {
                studentId: "u4",
                status: "submitted",
                submittedAt: "2026-11-03",
                grade: "A",
            },
            {
                studentId: "u5",
                status: "pending",
                submittedAt: null,
                grade: null,
            },
            {
                studentId: "u6",
                status: "pending",
                submittedAt: null,
                grade: null,
            },
            {
                studentId: "u7",
                status: "pending",
                submittedAt: null,
                grade: null,
            },
        ],
    },
    {
        id: "a2",
        title: "Advanced State Management",
        description: "Build a global store using Context API or Redux.",
        createdBy: "u1", // Created by Admin 1
        assignedTo: ["u3", "u4", "u5"], // Assigned to SELECTED students
        dueDate: "2026-11-20",
        submissions: [
            {
                studentId: "u3",
                status: "pending",
                submittedAt: null,
                grade: null,
            },
            {
                studentId: "u4",
                status: "submitted",
                submittedAt: "2026-11-03",
                grade: null,
            },
            {
                studentId: "u5",
                status: "pending",
                submittedAt: null,
                grade: null,
            },
        ],
    },
    {
        id: "a3",
        title: "Database Design & Schema Modeling",
        description:
            "Create an Entity-Relationship diagram for an e-commerce platform.",
        createdBy: "u2", // Created by Admin 2
        assignedTo: ["u3", "u4", "u5", "u6", "u7"], // Assigned to ALL students
        dueDate: "2026-11-10",
        submissions: [
            {
                studentId: "u3",
                status: "submitted",
                submittedAt: "2026-10-30",
                grade: "B+",
            },
            {
                studentId: "u4",
                status: "submitted",
                submittedAt: "2026-11-01",
                grade: "A-",
            },
            {
                studentId: "u5",
                status: "submitted",
                submittedAt: "2026-11-02",
                grade: "B",
            },
            {
                studentId: "u6",
                status: "submitted",
                submittedAt: "2026-11-02",
                grade: "A",
            },
            {
                studentId: "u7",
                status: "pending",
                submittedAt: null,
                grade: null,
            },
        ],
    },
    {
        id: "a4",
        title: "RESTful API Integration",
        description:
            "Connect your frontend application to the provided Express backend.",
        createdBy: "u2", // Created by Admin 2
        assignedTo: ["u6", "u7"], // Assigned to SELECTED students
        dueDate: "2026-11-25",
        submissions: [
            {
                studentId: "u6",
                status: "submitted",
                submittedAt: "2026-11-03",
                grade: null,
            },
            {
                studentId: "u7",
                status: "pending",
                submittedAt: null,
                grade: null,
            },
        ],
    },
];
