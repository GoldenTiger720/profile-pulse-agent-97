
import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ApiKeyProvider } from '@/contexts/ApiKeyContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Create a query client instance
const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ApiKeyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </ApiKeyProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
