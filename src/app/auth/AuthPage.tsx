'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signIn } from 'next-auth/react';
import { createNewUserAction } from '../actions/UserAction';
import { useRouter } from 'next/navigation';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const registerSchema = z
  .object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Enter a valid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>('login');
  const router = useRouter();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Handle login form submission
  async function onLoginSubmit(data: LoginFormValues) {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
    });

    console.log('Login data:', data);
    console.log('result ', res);
    if (res?.error) {
      alert(res.error);
    }
  }

  // Handle register form submission
  async function onRegisterSubmit(data: RegisterFormValues) {
    const res = await createNewUserAction(data.email, data.password, data.name);

    console.log('Register data:', data);
    console.log('result:', res);
    if (res) {
      const resSignIn = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
      });
    } else {
      alert('Something went wrong');
    }
  }

  return (
    <main className='min-h-screen bg-transparent flex flex-col items-center p-4 w-1/2 self-center'>
      <h2 className='text-2xl text-purple-500 font-bold text-center p-2 mt-10 mb-10 '>
        Welcome to your own treasure bank
      </h2>
      <div className='w-full max-w-md  '>
        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid w-full grid-cols-2 mb-2 border-2 border-background_alt rounded-lg bg-transparent p-0 pl-1 pr-1'>
            <TabsTrigger value='login'>Login</TabsTrigger>
            <TabsTrigger value='register'>Register</TabsTrigger>
          </TabsList>

          <TabsContent value='login'>
            <Card className=' border-2 border-background_alt rounded-lg bg-background'>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials</CardDescription>
              </CardHeader>
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                  <CardContent className='space-y-4'>
                    <FormField
                      control={loginForm.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder='m@example.com' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type='password' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type='submit' className='w-full'>
                      Enter
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          <TabsContent value='register'>
            <Card className=' border-2 border-background_alt rounded-lg bg-background'>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create a new account</CardDescription>
              </CardHeader>
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                  <CardContent className='space-y-4'>
                    <FormField
                      control={registerForm.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder='John Doe' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder='m@example.com' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type='password' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name='confirmPassword'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type='password' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type='submit' className='w-full'>
                      Create Account
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
