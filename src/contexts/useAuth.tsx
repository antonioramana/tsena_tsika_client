import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Try to load the token and user from localStorage when the app initializes
  const storedToken = localStorage.getItem("token");
  const storedUser = storedToken ? JSON.parse(localStorage.getItem("user") || "null") : null;

  const [user, setUser] = useState<User | null>(storedUser);
  const [token, setToken] = useState<string | null>(storedToken);

  // Login function
  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token); // Save token to localStorage for persistence
    localStorage.setItem("user", JSON.stringify(user)); // Save user data to localStorage
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
