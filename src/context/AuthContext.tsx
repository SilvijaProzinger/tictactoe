import React, { createContext, useContext, useState } from "react";
import { User, Register, Login, Logout } from "../types/types";

type Props = {
  children: React.ReactNode;
};

type AuthContextProps = {
  user: User | null;
  register: Register;
  login: Login;
  logout: Logout;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const register: Register = (userData) => {
    setUser(userData);
  };

  const login: Login = (userData) => {
    setUser(userData);
  };

  const logout: Logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
