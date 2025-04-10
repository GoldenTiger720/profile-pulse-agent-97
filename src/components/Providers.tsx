
import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ApiKeyProvider } from '@/contexts/ApiKeyContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <ApiKeyProvider>
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </ApiKeyProvider>
    </ThemeProvider>
  );
};

export default Providers;
