// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch current user on mount
  useEffect(() => {
    axios
      .get('http://localhost:5555/me', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const login = async (credentials) => {
    const res = await axios.post('http://localhost:5555/login', credentials, {
      withCredentials: true,
    });
    setUser(res.data);
  };

  const logout = async () => {
    await axios.delete('http://localhost:5555/logout', {
      withCredentials: true,
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
