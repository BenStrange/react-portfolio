// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    // Update Axios auth header when authToken changes
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authToken]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_DJANGO_API_URL}token/`, { email, password });
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setAuthToken(access);
      // No need to set axios.defaults.headers.common['Authorization'] here due to the useEffect hook
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthToken(null);
    // The useEffect hook will handle removing the Authorization header
  };

  return { authToken, login, logout };
};

export default useAuth;