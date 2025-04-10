
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, ChevronDown, Phone, User } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import InputMask from 'react-input-mask';

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
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { countries } from '@/lib/countries';
import { useAuth } from '@/contexts/AuthContext';

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
const dateRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  streetAddress: z.string().min(5, { message: 'Street address must be at least 5 characters.' }),
  streetAddressLine2: z.string().optional(),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  stateProvince: z.string().min(2, { message: 'State/Province must be at least 2 characters.' }),
  postalCode: z.string().min(3, { message: 'Postal/Zip code must be at least 3 characters.' }),
  country: z.string({ required_error: 'Please select a country.' }),
  phoneNumber: z.string().regex(phoneRegex, { message: 'Please enter a valid phone number.' }),
  birthday: z.date({ required_error: 'Please select a birth date.' }),
});

type FormValues = z.infer<typeof formSchema>;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [birthdayInputValue, setBirthdayInputValue] = React.useState("");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      streetAddress: '',
      streetAddressLine2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      country: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Show loading toast
      const loadingToast = toast.loading('Creating your account...');
      
      // Here we would typically make an API call to create the user account
      // For demo purposes, we'll simulate this with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call the signup function from AuthContext
      await signup({ 
        email: data.email, 
        name: `${data.firstName} ${data.lastName}`,
        profile: data
      });
      
      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success('Account created successfully!');
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      // Handle errors
      toast.error('Failed to create account. Please try again.');
      console.error('Signup error:', error);
    }
  };

  // Handle direct input for birthday field
  const handleBirthdayInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setBirthdayInputValue(inputValue);
    
    // Only update the form value if the input matches MM-DD-YYYY format
    if (dateRegex.test(inputValue)) {
      const [month, day, year] = inputValue.split('-').map(Number);
      // Month is 0-based in JavaScript Date
      const date = new Date(year, month - 1, day);
      form.setValue('birthday', date, { shouldValidate: true });
    }
  };

  // Update the input field when a date is selected from the calendar
  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      form.setValue('birthday', date, { shouldValidate: true });
      setBirthdayInputValue(format(date, "MM-dd-yyyy"));
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="space-y-1 bg-gradient-to-r from-findmystage-blue to-findmystage-purple">
          <CardTitle className="text-3xl font-bold tracking-tight text-white">Create an account</CardTitle>
          <CardDescription className="text-zinc-100">
            Fill in your details to get started with FindMyStage
          </CardDescription>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-6 p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="streetAddressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address Line 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Apt 4B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stateProvince"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input placeholder="NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal/Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.name}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex">
                        Phone Number <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <InputMask
                            mask="(999) 999-9999"
                            maskChar=" "
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            placeholder="(000) 000-0000"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-sm text-muted-foreground">
                        Please enter a valid phone number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="flex">
                        Birthday <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <div className="flex">
                        <Input
                          placeholder="MM-DD-YYYY"
                          value={birthdayInputValue}
                          onChange={handleBirthdayInput}
                          className="flex-1 rounded-r-none"
                        />
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="rounded-l-none border-l-0"
                            >
                              <CalendarIcon className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="end">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                handleCalendarSelect(date);
                                // Auto-close the popover
                                document.body.click();
                              }}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormDescription className="text-sm text-muted-foreground">
                        Enter your date of birth in MM-DD-YYYY format.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t p-6 bg-slate-50 dark:bg-slate-900">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-findmystage-blue to-findmystage-purple hover:from-findmystage-blue/90 hover:to-findmystage-purple/90"
              >
                Create Account
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
