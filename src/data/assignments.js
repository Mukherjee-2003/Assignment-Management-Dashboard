export const initialAssignments = [
    {
        id: "a1",
        title: "Introduction to React Hooks",
        description:
            "Complete the exercises on useState and useEffect to handle local state and side effects.",
        dueDate: "2026-11-15",
        driveLink: "https://google.com",
        createdBy: "u1",
        assignedTo: ["u3", "u4", "u5", "u6", "u7"],
        submissions: {
            u3: {
                status: "SUBMITTED",
                submittedAt: "2026-11-02T14:22:00.000Z",
            },
            u4: {
                status: "SUBMITTED",
                submittedAt: "2026-11-03T09:15:00.000Z",
            },
            u5: { status: "NOT_SUBMITTED", submittedAt: null },
            u6: { status: "NOT_SUBMITTED", submittedAt: null },
            u7: { status: "NOT_SUBMITTED", submittedAt: null },
        },
    },
    {
        id: "a2",
        title: "Advanced State Management",
        description:
            "Build a global store using Context API or Redux Toolkit to manage complex global application states.",
        dueDate: "2026-11-20",
        driveLink: "https://google.com",
        createdBy: "u1",
        assignedTo: ["u3", "u4", "u5"],
        submissions: {
            u3: { status: "NOT_SUBMITTED", submittedAt: null },
            u4: {
                status: "SUBMITTED",
                submittedAt: "2026-11-03T16:45:00.000Z",
            },
            u5: { status: "NOT_SUBMITTED", submittedAt: null },
        },
    },
    {
        id: "a3",
        title: "Database Design & Schema Modeling",
        description:
            "Create an Entity-Relationship diagram and write basic migration scripts for an e-commerce platform application.",
        dueDate: "2026-11-10",
        driveLink: "https://google.com",
        createdBy: "u2", // David
        assignedTo: ["u3", "u4", "u5", "u6", "u7"],
        submissions: {
            u3: {
                status: "SUBMITTED",
                submittedAt: "2026-10-30T11:05:00.000Z",
            },
            u4: {
                status: "SUBMITTED",
                submittedAt: "2026-11-01T18:30:00.000Z",
            },
            u5: {
                status: "SUBMITTED",
                submittedAt: "2026-11-02T10:12:00.000Z",
            },
            u6: {
                status: "SUBMITTED",
                submittedAt: "2026-11-02T22:00:00.000Z",
            },
            u7: { status: "NOT_SUBMITTED", submittedAt: null },
        },
    },
    {
        id: "a4",
        title: "RESTful API Integration",
        description:
            "Connect your frontend React application endpoints to the provided Node.js/Express backend server securely.",
        dueDate: "2026-11-25",
        driveLink: "https://google.com",
        createdBy: "u2",
        assignedTo: ["u6", "u7"],
        submissions: {
            u6: {
                status: "SUBMITTED",
                submittedAt: "2026-11-03T13:10:00.000Z",
            },
            u7: { status: "NOT_SUBMITTED", submittedAt: null },
        },
    },
];
