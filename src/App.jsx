import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import ManageAssignments from "./pages/admin/ManageAssignments";
import StudentDashboard from "./pages/student/StudentDashboard";
import Assignments from "./pages/student/Assignments";
import ProtectedRoute from "./common/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";

const App = () => {
    const { user } = useContext(AuthContext);
    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to={user ? "/dashboard" : "/login"} />}
            />
            <Route path="/login" element={<Login />} />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute allowedRole="admin">
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="assignments" element={<ManageAssignments />} />
                <Route path="students" element={<Students />} />
            </Route>

            <Route
                path="/students"
                element={
                    <ProtectedRoute allowedRole="student">
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="assignments" element={<Assignments />} />
            </Route>
        </Routes>
    );
};

export default App;
