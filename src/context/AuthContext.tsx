import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Register, Login, Logout } from "../types/types";
import { useMutation } from "react-query";

type Props = {
  children: React.ReactNode;
};

type AuthContextProps = {
  user: User | null;
  token: string;
  authError: string;
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
  const [authError, setAuthError] = useState("");
  const [token, setToken] = useState("");
  const apiUrl = "https://tictactoe.aboutdream.io/";

  const registerMutation = useMutation(
    (userData: User) => {
      return fetch(`${apiUrl}register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((response) => {
        if (!response.ok) {
          setAuthError(
            "An error has occured. Please check your data and try again."
          );
          throw new Error(response.statusText);
        } else if (response.status === 200) setUser(userData);
        else return response;
      });
    },
    {
      onError: (error) => {
        console.log(error);
        if (error instanceof Response && error.status === 403) {
          setAuthError(
            "This username is already taken. Please enter a new one."
          );
        } else {
          //console.error('An error occurred:', error.message);
        }
      },
    }
  );

  const loginMutation = useMutation(
    (userData: User) => {
      return fetch(`${apiUrl}login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then(async (response) => {
        if (response.status === 200) {
          const responseData = await response.json();
          setUser(userData);
          setToken(responseData.token); //to save token as a cookie
          console.log(responseData.token)
        } else if (!response.ok) {
          setAuthError(
            "An error has occured. Please check your data and try again."
          );
          throw new Error(response.statusText);
        } else return response;
      });
    },
    {
      onError: (error) => {
        console.log(error);
        if (error instanceof Response && error.status === 401) {
          setAuthError(
            "Authorization failed. Check your username and password and try again."
          );
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
    loginMutation.mutate(userData);
  };

  const logout: Logout = () => { 
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, authError, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
