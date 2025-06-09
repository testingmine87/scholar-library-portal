import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserRole = 'student' | 'librarian' | 'admin' | 'faculty' | 'guest';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  memberSince: string;
  studentId?: string;
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

// Dummy user data for different roles
const dummyUsers: Record<string, UserData> = {
  'student@test.com': {
    id: '1',
    name: 'Alex Johnson',
    email: 'student@test.com',
    role: 'student',
    department: 'Computer Science',
    memberSince: 'September 2023',
    studentId: 'CS2023001'
  },
  'librarian@test.com': {
    id: '2',
    name: 'Sarah Wilson',
    email: 'librarian@test.com',
    role: 'librarian',
    department: 'Library Services',
    memberSince: 'January 2020'
  },
  'admin@test.com': {
    id: '3',
    name: 'Michael Brown',
    email: 'admin@test.com',
    role: 'admin',
    department: 'Administration',
    memberSince: 'March 2019'
  },
  'faculty@test.com': {
    id: '4',
    name: 'Dr. Emily Davis',
    email: 'faculty@test.com',
    role: 'faculty',
    department: 'Mathematics',
    memberSince: 'August 2018'
  },
  'guest@test.com': {
    id: '5',
    name: 'John Visitor',
    email: 'guest@test.com',
    role: 'guest',
    department: 'Guest Access',
    memberSince: 'December 2024'
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call when backend is ready
      // const userData = await fetchUserProfile();
      
      // For now, keep user logged in if they exist in localStorage
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error('Failed to load user data', err);
      setError('Failed to load user profile. Please try again later.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call when backend is ready
      /*
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
      */
      
      // Dummy authentication logic
      const dummyUser = dummyUsers[email];
      if (dummyUser && password === 'password123' && dummyUser.role === role) {
        setUser(dummyUser);
        localStorage.setItem('currentUser', JSON.stringify(dummyUser));
      } else {
        throw new Error('Invalid credentials');
      }
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
    localStorage.removeItem('currentUser');
  };

  useEffect(() => {
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
