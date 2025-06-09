// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour accéder facilement au contexte
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialisation via localStorage (évite un effet secondaire inutile)
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Synchroniser localStorage quand l'utilisateur change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    if (!userData || typeof userData !== 'object') return;
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
