
import React, { createContext, useContext, useState } from 'react';
import { AuthContextType, User } from '@/types/auth';
import { useAuthStateListener } from '@/hooks/useAuthStateListener';
import { useAuthFunctions } from '@/hooks/useAuthFunctions';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Set up auth state listener
  useAuthStateListener(setUser, setLoading);
  
  // Set up auth functions
  const { login, signup, googleAuth, logout, updateProfile } = useAuthFunctions(user, setUser, setLoading);

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
