"use client"
import React, { useState } from 'react';
import {useForm} from "react-hook-form"
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import LocalStorageManager from "@/lib/LocalStorageManager"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'react-toastify';



type SigninFormProps = {
    variant?: "signup" | "signin" | "forgot-password";
    setVariant:()=>void;
};

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
});
const SigninForm:React.FC<SigninFormProps> = ({variant,setVariant}) => {
    const [loading, setLoading] = useState<boolean>(false);
    
    const router = useRouter();
    const form= useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setLoading(true);
     await axios.post('http://localhost:5000/auth/login',data).then((res)=>{
            setLoading(false);
            LocalStorageManager.setItemWithExpiration('token',res.data,60);
            toast('Logged in successfully',{
                type: 'success',
            })
            router.push('/')
     }).catch((err)=>{
            setLoading(false);
            toast.error(err.response.data.message)
     })
    }
    
    return(
        <>
            <h1 className="text-2xl font-semibold">Sign in</h1>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <div className='flex justify-end items-center mt-5 '>
                <Button type="submit"  disabled={form.formState.isSubmitting}>
                    Sign in
                    </Button>
            </div>
            </form>
            </Form>
            <div className="mt-4 flex border-2 p-3  gap-5 w-full">
                <p className='font-bold text-left '>Donot have an Account?</p>
             <p className='underline hover:text-blue-400 cursor-pointer'  onClick={setVariant}>
                 Signup
                </p>
            </div>
        </>
    )
}
export default SigninForm;