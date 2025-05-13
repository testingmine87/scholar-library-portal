
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserProfile } from './api';

export type UserRole = 'guest' | 'student' | 'faculty';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  memberSince: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await fetchUserProfile();
      setUser(userData);
    } catch (err) {
      console.error('Failed to load user data', err);
      setError('Failed to load user profile. Please try again later.');
      // For demo purposes, we don't set a default user
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, we would send a request to the server
      // For demo purposes, we'll simulate a successful login
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      // After successful login, load the user profile
      await loadUser();
    } catch (err) {
      console.error('Login failed', err);
      setError('Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    await loadUser();
  };

  const logout = () => {
    setUser(null);
    // In a real app, we would clear tokens, cookies, etc.
  };

  useEffect(() => {
    // On initial load, check if user is already logged in
    // In a real app, we would check for tokens, cookies, etc.
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, logout, refreshUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
