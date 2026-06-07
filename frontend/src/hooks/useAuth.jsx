import { createContext, useContext, useState, useCallback } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
  const isAdmin = !!token;

  const login = useCallback(async (username, password) => {
    const res = await api.post('/api/auth/login/', { username, password });
    const t = res.data.token;
    localStorage.setItem('auth_token', t);
    setToken(t);
    return res.data;
  }, []);

  const logout = useCallback(async () => {
    try { await api.post('/api/auth/logout/'); } catch {}
    localStorage.removeItem('auth_token');
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
