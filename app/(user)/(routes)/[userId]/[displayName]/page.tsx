"use client"

import React,{useEffect, useState} from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import Link from 'next/link';

import Header from '@/components/ui/Header';

import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
  } from "@/components/ui/card"

  
const Profile:React.FC= () => {
    const {data,isLoading}=useCurrentUser()
    const [mounted,setIsMounted]=useState<boolean>(false)
    useEffect(() => {
        setIsMounted(true);
      }, []);
    if(!mounted){
        return null
    }

    const routes=[{
        name:'Profile',
        path:''
    },{
        name:'Orders',
        path:'orders'  
    },
{
    name:'Settings',
    path:'settings'
}]

   
    return (
        <>
    
        <div className='hidden md:block w-1/2 p-10 mx-10'>

            <Header
            title='Profile Information'
            description='Welcome to the Profile section! 🎉 Here, you&apos;ll find all the essential components that make up your unique and personalized profile.'
            />
            
            <div className='flex justify-between  gap-10'>
                    <Card>
                <CardContent>
                <div className='flex flex-col gap-y-5'>
                        {routes.map((route,index)=>(
                            <Link href={`/${data?.id}/${data?.displayName}/${route.path}`} key={index}>
                            <p className='text-lg font-semibold text-gray-700 hover:text-gray-900 hover:underline'>{route.name}</p>
                            </Link>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <p>Happy Shopping</p>
                </CardFooter>
                </Card>
                <Card>
                <CardContent>
               <CardTitle>Full Name</CardTitle>
                <p className='text-lg font-semibold text-gray-700 mt-2'>{data?.displayName}</p>
                </CardContent>
                </Card>
                <Card>
                <CardContent>
               <CardTitle>Email</CardTitle>
                <p className='text-lg font-semibold text-gray-700 mt-2'>{data?.email}</p>
                </CardContent>
                </Card>
              
            </div>
        </div>
        </>
    )
}
export default Profile;