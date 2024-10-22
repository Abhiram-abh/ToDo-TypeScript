// src/containers/SignUpContainer/index.tsx
import React, { useState } from "react";
import FormInput from "../../../Components/base/FormInput/index"; // Adjust the import if needed
import FormButton from "../../../Components/base/FormButton/index"; // Adjust the import if needed
import { app } from "../../../Firebase"; // Ensure this path is correct
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const SignUpContainer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth(app);

    // Check if the email is already in use
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length > 0) {
      setError("This email is already in use. Please log in instead.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home page after successful sign-up
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp}>
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
          buttonName="Sign Up"
          fontSize="text-lg"
        />
        {error && (
          <div className="text-red-500">
            <p>{error}</p>
            <a href="/login" className="text-blue-500">Log in instead</a>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUpContainer;