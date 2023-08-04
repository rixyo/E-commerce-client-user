"use client"
import React, { useState } from 'react';
import { useForm} from "react-hook-form"
import axios from 'axios';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'react-toastify';
import {EyeIcon,EyeOffIcon} from 'lucide-react'
import Header from './ui/header';
type SignupFormProps = {
    setVariant:()=>void;
};
const formSchema = z.object({
    displayName: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
});
const SignupForm:React.FC<SignupFormProps> = ({setVariant}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordType, setPasswordType] = useState<string>("password");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,data).then(()=>{
                setLoading(false);
                toast('Account created successfully',{
                  type:'success'
                })
               setVariant()
                
                
            })
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Something went wrong')
            
        }
        
    };
    const ShowPassword= () => {
        if (passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }

    };
    
    return (
        <>
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Header
            title="Create an account"
            description='Welcome to the Signup section! Please fill in the form below to create an account.'
           />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input key={field.name} disabled={loading}  placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className='mt-2'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input key={field.name} disabled={loading}  placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className='mt-2'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                    <Input key={field.name} className='relative' disabled={loading} type={passwordType} placeholder="Password" {...field} />
                   {passwordType==="password" && <EyeIcon className='absolute top-1/2 right-1 -translate-y-1/2  cursor-pointer text-gray-400' onClick={ShowPassword}  size={20}/> } 
                    {passwordType==="text" && <EyeOffIcon className='absolute top-1/2 right-1 -translate-y-1/2  cursor-pointer text-gray-400' onClick={ShowPassword}  size={20}/>}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className='flex justify-end items-center mt-5'>

            <Button type='submit'>Sign up</Button>
            </div>
            </form>
            </Form>
            <div className=" flex gap-3 mt-4  p-3">
                <p className='font-bold'>Already have an account?</p>
                
             <p className='underline cursor-pointer hover:text-blue-400'onClick={setVariant}>
                 Signin
                </p>
            </div>
        </>
    )
}
export default SignupForm;