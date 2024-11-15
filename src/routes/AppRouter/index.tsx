import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/index"; // Adjust the paths as needed
import LoginPage from "../../pages/LoginPage"; // Ensure this path is correct
import SignUpPage from "../../pages/SignUpPage"; // Ensure this path is correct
import TodoPage from "../../pages/HomePage/"; // Ensure you have this page for your Todo list
import AuthProvider from "../../contexts/AuthContext/index"; // Use the correct import for AuthProvider

const AppRouter: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/todos" element={<TodoPage />} /> {/* Your Todo page */}
            </Routes>
        </AuthProvider>
    );
};

export default AppRouter;
