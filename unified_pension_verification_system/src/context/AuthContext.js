import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const defaultRole = 'Central Admin';
const tokenStorageKey = 'upvs_auth_token';

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(defaultRole);
  const [officerId, setOfficerId] = useState('');
  const initialToken = localStorage.getItem(tokenStorageKey) || '';
  const [token, setToken] = useState(initialToken);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(initialToken));

  const login = (payload) => {
    if (typeof payload === 'string') {
      setRole(payload);
      setOfficerId('');
      setToken('');
      setIsAuthenticated(true);
      return;
    }

    setRole(payload.role);
    setOfficerId(payload.officerId);
    const nextToken = payload.token || '';
    setToken(nextToken);
    if (payload.rememberMe && nextToken) {
      localStorage.setItem(tokenStorageKey, nextToken);
    } else {
      localStorage.removeItem(tokenStorageKey);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    setRole(defaultRole);
    setOfficerId('');
    setToken('');
    localStorage.removeItem(tokenStorageKey);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ role, officerId, token, isAuthenticated, login, logout }),
    [role, officerId, token, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
