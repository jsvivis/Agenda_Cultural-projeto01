// BIBLIOTECAS
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Criação do contexto
const AuthContext = createContext();

// Provedor do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Função de login
  const login = async (Email, Password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', { Email, Password });
      if (response.status === 200) {
        setUser(response.data.user);
        return true;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  // Função de logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);
