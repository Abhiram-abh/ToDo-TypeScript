import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/HomePage/index"; // Adjust the paths as needed
import LoginPage from "../../Pages/LoginPage"; // Ensure this path is correct
import SignUpPage from "../../Pages/SignUpPage"; // Ensure this path is correct
import TodoPage from "../../Pages/HomePage/"; // Ensure you have this page for your Todo list

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/todos" element={<TodoPage />} /> {/* Your Todo page */}
    </Routes>
  );
};

export default AppRouter;
