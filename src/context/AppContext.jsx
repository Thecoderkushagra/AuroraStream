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

  const [user, setUser] = useState({
    jwt: null,
    refreshToken: null,
    userId: null,
    userName: null,
    role: null,
  });

  const login = (accessToken, refreshToken) => {
    const decoded = decodeToken(accessToken);
    setUser({
      jwt: accessToken,
      refreshToken,
      userId: decoded?.userId ?? null,
      userName: decoded?.userName ?? decoded?.sub ?? null,
      role: decoded?.roles ?? null,  
    });
  };

  const logout = () => {
    setUser({ jwt: null, refreshToken: null, userId: null, userName: null, role: null });
  };

  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};