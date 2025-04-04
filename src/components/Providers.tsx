
import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ApiKeyProvider } from '@/contexts/ApiKeyContext';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <ApiKeyProvider>
        {children}
      </ApiKeyProvider>
    </ThemeProvider>
  );
};

export default Providers;
