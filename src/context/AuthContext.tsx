import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Register, Login, Logout } from "../types/types";
import { useMutation } from "react-query";

type Props = {
  children: React.ReactNode;
};

type AuthContextProps = {
  user: User | null;
  error: string;
  register: Register;
  login: Login;
  logout: Logout;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('')
  const apiUrl = "https://tictactoe.aboutdream.io/";

  const registerMutation = useMutation(
    (userData: User) => {
      console.log(userData);
      return fetch(`${apiUrl}register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        else if (response.status === 200) setUser(userData)
        else return response
      });
    },
    {
      onError: (error) => {
        if (error instanceof Response && error.status === 403) {
          setError('This username is already taken. Please enter a new one.')
        } else {
          //console.error('An error occurred:', error.message);
        }
      },
    }
  );

  const register: Register = (userData) => {
    registerMutation.mutate(userData);
  };

  const login: Login = (userData) => {
    setUser(userData);
  };

  const logout: Logout = () => {
    setUser(null);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
