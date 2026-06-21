import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('ara_token');
    const storedUser = localStorage.getItem('ara_user');
    if (stored && storedUser) {
      setToken(stored);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${stored}`;
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });
    const { token: t, user: u } = res.data.data;
    setToken(t);
    setUser(u);
    api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    localStorage.setItem('ara_token', t);
    localStorage.setItem('ara_user', JSON.stringify(u));
    return u;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('ara_token');
    localStorage.removeItem('ara_user');
  }, []);

  const role = user?.role?.name || user?.role || null;

  return (
    <AuthContext.Provider value={{ user, token, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
