
import React from 'react';
import { Navbar } from './Navbar';
import { useApiKey } from '@/contexts/ApiKeyContext';
import ApiKeyForm from './ApiKeyForm';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { apiKey, isKeyValid } = useApiKey();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {(!apiKey || !isKeyValid) ? (
          <ApiKeyForm />
        ) : (
          children
        )}
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FindMyStage.com - AI-powered speaker profiling
          </p>
        </div>
      </footer>
    </div>
  );
};
