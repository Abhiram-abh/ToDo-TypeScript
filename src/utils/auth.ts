// src/utils/auth.ts
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { app } from '../firebaseConfig';  // Named import

const auth = getAuth(app);

export const registerUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email: string, password: string) => {
  console.log("login user function @ utils/auth")
  return await signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = async () => {
  console.log("sign in called")
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
