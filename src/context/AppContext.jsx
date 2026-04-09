import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const decodeToken = (token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (e) {
      return null;
    }
  };

  // ✅ Initialize state directly from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {
      jwt: null,
      refreshToken: null,
      userId: null,
      userName: null,
      role: null,
    };
  });

  const login = (accessToken, refreshToken) => {
    const decoded = decodeToken(accessToken);
    const newUser = {
      jwt: accessToken,
      refreshToken,
      userId: decoded?.userId ?? null,
      userName: decoded?.userName ?? decoded?.sub ?? null,
      role: decoded?.roles ?? null,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser)); // ✅ save newUser, not stale `user`
  };

  const logout = () => {
    setUser({ jwt: null, refreshToken: null, userId: null, userName: null, role: null });
    localStorage.removeItem("user");
  };

  return (
    <AppContext.Provider value={{ user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};