import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import ManageAssignments from "./pages/admin/ManageAssignments";
import StudentDashboard from "./pages/student/StudentDashboard";
import Assignments from "./pages/student/Assignments";
import ProtectedRoute from "./common/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";
import RootRedirect from "./common/RootRidirect";
import LoginRedirect from "./common/LoginRedirect";




const App = () => {
    return (
        <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/login" element={<LoginRedirect />} />
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
