
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  profile?: any;
}

interface SignupData {
  email: string;
  name: string;
  profile?: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('findmystage_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call for demo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, we'll just create a user object with the email
    // In a real app, you would validate credentials with a backend
    const loggedInUser = {
      name: email.split('@')[0],
      email
    };
    
    // Store user in localStorage
    localStorage.setItem('findmystage_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const signup = async (data: SignupData) => {
    // Simulate API call for demo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create user object
    const newUser = {
      name: data.name,
      email: data.email,
      profile: data.profile
    };
    
    // Store user in localStorage
    localStorage.setItem('findmystage_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('findmystage_user');
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
