import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

interface User {
    email: string;
    uid: string;
}

declare module "jwt-decode" {
    interface JwtPayload {
        user_id: string;
        email: string;
        exp?: number; // Use optional property to avoid conflicts
    }

    export function jwtDecode<T = JwtPayload>(token: string): T; // Change to named export
}

interface AuthContextType {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    logIn: (email: string, password: string) => Promise<void>;
    logOut: () => void;
    isAuthenticated: () => boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface JwtPayload {
    user_id: string;
    email: string;
    exp: number;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY; // Fetch API key from environment variables

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const signUp = async (email: string, password: string) => {
        console.log("login succus");
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
                email,
                password,
                returnSecureToken: true,
            });
            handleToken(response.data.idToken, email);
        } catch (error) {
            console.error("Sign-up error:", error);
        }
    };

    const logIn = async (email: string, password: string) => {
        console.log("signIn called")
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
                email,
                password,
            });
            handleToken(response.data.idToken, email);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const logOut = () => {
        Cookies.remove("access_token");
        Cookies.remove("custom_access_token"); // Remove custom access token on logout
        setUser(null);
    };

    const isAuthenticated = () => Boolean(user);

    const handleToken = (token: string, email: string) => {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const isTokenExpired = decodedToken.exp ? decodedToken.exp < Math.floor(Date.now() / 1000) : true;
        
        if (isTokenExpired) {
            console.warn("Token has expired");
            logOut();
        } else {
            Cookies.set("accessToken", token);
            setUser({ email, uid: decodedToken.user_id });
        }
    };

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            try {
                const decodedToken = jwtDecode<JwtPayload>(token);
                if (decodedToken.exp ? decodedToken.exp < Math.floor(Date.now() / 1000) : true) {
                    console.warn("Token is expired");
                    logOut();
                } else {
                    setUser({ email: decodedToken.email, uid: decodedToken.user_id });
                }
            } catch (error) {
                console.error("Failed to auto-login", error);
                logOut();
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
