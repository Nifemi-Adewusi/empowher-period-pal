
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  lastPeriod?: Date;
  cycleLength?: number;
  periodLength?: number;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  googleAuth: () => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock authentication functions for now - would connect to a real auth system like Firebase, Auth0, etc
  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('empowher_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock login
    const mockUser = {
      id: '1',
      name: 'Jane Doe',
      email: email,
      lastPeriod: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
      cycleLength: 28,
      periodLength: 5
    };
    
    setUser(mockUser);
    localStorage.setItem('empowher_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock signup
    const mockUser = {
      id: '1',
      name: name,
      email: email,
    };
    
    setUser(mockUser);
    localStorage.setItem('empowher_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const googleAuth = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock Google authentication
    const mockUser = {
      id: '1',
      name: 'Jane Google',
      email: 'jane.google@example.com',
      photoURL: 'https://via.placeholder.com/150',
    };
    
    setUser(mockUser);
    localStorage.setItem('empowher_user', JSON.stringify(mockUser));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('empowher_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('empowher_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, googleAuth, logout, updateProfile }}>
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
