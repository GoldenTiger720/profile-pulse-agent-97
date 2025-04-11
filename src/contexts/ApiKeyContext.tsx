
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyContextType {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  isKeyValid: boolean;
  checkKeyValidity: (key?: string) => Promise<boolean>;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

// This is the API key we'll use for OpenAI
const OPENAI_API_KEY = "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";

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | null>(OPENAI_API_KEY);
  const [isKeyValid, setIsKeyValid] = useState<boolean>(true); // Assume valid initially
  const { toast } = useToast();

  useEffect(() => {
    // No need to check localStorage since we're using a hardcoded key
    if (apiKey) {
      checkKeyValidity(apiKey);
    }
  }, []);

  const checkKeyValidity = async (key: string = apiKey || ''): Promise<boolean> => {
    if (!key) return false;
    
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        }
      });
      
      const valid = response.status === 200;
      setIsKeyValid(valid);
      
      if (!valid) {
        toast({
          title: "Invalid API Key",
          description: "The provided OpenAI API key is invalid.",
          variant: "destructive"
        });
      }
      
      return valid;
    } catch (error) {
      console.error('Error checking API key validity:', error);
      setIsKeyValid(false);
      toast({
        title: "API Key Check Failed",
        description: "Failed to verify your OpenAI API key.",
        variant: "destructive"
      });
      return false;
    }
  };

  const saveApiKey = (key: string) => {
    setApiKey(key);
  };

  return (
    <ApiKeyContext.Provider value={{ 
      apiKey, 
      setApiKey: saveApiKey, 
      isKeyValid, 
      checkKeyValidity 
    }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = (): ApiKeyContextType => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey must be used within an ApiKeyProvider');
  }
  return context;
};
