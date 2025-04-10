
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading('Logging in...');
      
      // Call login function from AuthContext
      await login(data.email, data.password);
      
      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Login successful!');
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      // Handle login error
      toast.error('Invalid email or password. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 bg-gradient-to-r from-findmystage-blue to-findmystage-purple">
          <CardTitle className="text-3xl font-bold tracking-tight text-white">Login</CardTitle>
          <CardDescription className="text-zinc-100">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4 p-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-sm text-right">
                <a href="#" className="text-findmystage-blue hover:underline">
                  Forgot password?
                </a>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 border-t p-6 bg-slate-50 dark:bg-slate-900">
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-findmystage-blue to-findmystage-purple hover:from-findmystage-blue/90 hover:to-findmystage-purple/90"
              >
                Sign In
              </Button>
              
              <div className="text-center text-sm">
                Don't have an account?{' '}
                <Button 
                  variant="link" 
                  className="p-0 text-findmystage-blue"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
