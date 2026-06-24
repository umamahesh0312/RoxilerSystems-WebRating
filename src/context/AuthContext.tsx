import React, { createContext, useState, useCallback, useEffect } from 'react';
import { User, AuthContextType, LoginFormData, SignupFormData } from '@/types';
import { storage } from '@/utils/storage';
import authService from '@/services/authService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = storage.getToken();
    const storedUser = storage.getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      setToken(response.token);
      setUser(response.user);
      storage.setToken(response.token);
      storage.setUser(response.user);
    } catch (error) {
      storage.clear();
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.signup(data);
      setToken(response.token);
      setUser(response.user);
      storage.setToken(response.token);
      storage.setUser(response.user);
    } catch (error) {
      storage.clear();
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    storage.clear();
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
