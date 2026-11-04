import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider.jsx";
import AssignmentProvider from "./provider/AssignmentProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <AssignmentProvider>
                    <App />
                </AssignmentProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
