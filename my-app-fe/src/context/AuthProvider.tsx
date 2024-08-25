import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making HTTP requests

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Replace with your API endpoint for login
      const response = await axios.post("/login", { email, password });
      
      // Example response: { user: { id, email, roles }, token: "jwt-token" }
      const { userId, idToken } = response.data;

      // Store user and token in local storage
      localStorage.setItem("userId", JSON.stringify(user));
      localStorage.setItem("idToken", idToken);

      setUser(user);
      setIsAuthenticated(true);
      navigate("/"); // Redirect to home after login
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("idToken");

    setUser(null);
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
