import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = window.localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const login = (username) => {
    window.localStorage.setItem('username', username);
    setUsername(username);
  };

  const logout = () => {
    window.localStorage.removeItem('username');
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
