import React, { useContext, useEffect, useState } from 'react';
import api from '../config/api';

interface defaultValue {
  user: null;
  loginUser: (user: { username: string; password: string; }) => Promise<void>;
  registerUser: (user: { username: string; password: string; }) => Promise<void>;
  logout: () => void
}

export const UserContext = React.createContext({} as defaultValue);

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    retrieveUser();
  }, [])

  const retrieveUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const { data } = await api.get("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUser(data.user);
  }

  const loginUser = async (user: { username: string, password: string }) => {
    const { data: res } = await api.post<{ token: string }>("/users/login", user);
    localStorage.setItem('token', res.token);
    retrieveUser();
  }

  const registerUser = async (user: { username: string, password: string }) => {
    const { data: res } = await api.post<{ token: string }>("/users/register", user);
    localStorage.setItem('token', res.token);
    retrieveUser();
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  return <UserContext.Provider value={{ user, loginUser, registerUser, logout }}>
    {children}
  </UserContext.Provider>
}