// src/containers/LoginContainer/index.tsx
import React, { useState } from "react";
import FormInput from "../../Components/base/FormInput/index"; // Adjust the import if needed
import FormButton from "../../Components/base/FormButton/index"; // Adjust the import if needed
import { loginUser } from "../../utils/auth"; // Ensure this path is correct
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./LoginPage.css"; // Add your CSS file for styling

const LoginContainer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/"); // Redirect to home page after successful login
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <FormInput
          type="email"
          placeholder="Email"
          text={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          placeholder="Password"
          text={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormButton
          type="submit"
          variant="primary"
          buttonName="Login"
          fontSize="text-lg"
        />
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default LoginContainer;
