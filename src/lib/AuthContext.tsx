
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
      // For demo purposes, set a default guest user
      setUser({
        id: 'guest',
        name: 'Guest User',
        email: 'guest@example.com',
        role: 'guest',
        department: 'N/A',
        memberSince: new Date().toLocaleDateString()
      });
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
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, logout, refreshUser }}>
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
