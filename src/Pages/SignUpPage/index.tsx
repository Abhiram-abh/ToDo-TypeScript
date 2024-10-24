// src/containers/SignUpContainer/index.tsx
import React, { useState } from 'react';
import FormInput from '../../components/base/FormInput/index';
import FormButton from '../../components/base/FormButton/index'; 
import { registerUser } from '../../utils/auth'; 
import "./SignUpPage.css"

const SignUpContainer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      // Handle successful registration (e.g., redirect or update UI)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2 className="h2">Sign Up</h2>
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
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default SignUpContainer;
