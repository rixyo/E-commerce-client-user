"use client"
import React, { useState } from 'react';
import { useForm} from "react-hook-form"
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { toast } from 'react-toastify';
import axios from 'axios';
type SignupFormProps = {
    variant?: "signup" | "signin" | "forgot-password";
    setVariant:()=>void;
   

};
const formSchema = z.object({
    displayName: z.string().min(3).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
});
const SignupForm:React.FC<SignupFormProps> = ({variant,setVariant}) => {
    const [loading, setLoading] = useState<boolean>(false);
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
            await axios.post('http://localhost:5000/auth/signup',data).then(()=>{
                setLoading(false);
                toast('Account created successfully',{
                    type: 'success',
                })
               setVariant()
                
                
            })
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Something went wrong')
            
        }
        
    };
    
    return (
        <>
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold mb-4">Sign up</h1>
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
                    <Input key={field.name} disabled={loading} type='password'  placeholder="Password" {...field} />
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