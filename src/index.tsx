import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import AppRouter from "./routes/AppRouter"; // Use your AppRouter for routing
import AuthProvider from "./contexts/AuthContext"; // Import AuthProvider
import "./style/index.css"; // Ensure this path is correct

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthProvider>  {/* Wrap with AuthProvider */}
        <Router>  {/* Wrap with Router */}
          <AppRouter />  {/* Use AppRouter for routing */}
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Make sure there is an element with id 'root' in your HTML.");
}
