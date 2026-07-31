import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import userService from '../services/userService';
import Cookies from 'js-cookie';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [viewer, setViewer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchViewer = useCallback(async (force = false) => {
    // If already loaded and not forced to refresh, return the cached state
    if (viewer && !force) return viewer;

    const token = Cookies.get('jwt');
    if (!token) {
      setViewer(null);
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await userService.getViewerProfile();
      setViewer(data);
      return data;
    } catch (err) {
      console.error('Failed to fetch viewer profile:', err);
      setError(err);
      // Clear data if authorization issue
      if (err.response?.status === 401 || err.response?.status === 403) {
        setViewer(null);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [viewer]);

  useEffect(() => {
    fetchViewer();
  }, []);

  return (
    <UserContext.Provider value={{ viewer, setViewer, loading, error, fetchViewer }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
