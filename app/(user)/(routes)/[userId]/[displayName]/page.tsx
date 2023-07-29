"use client"

import React,{useEffect, useState} from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';

import Image from 'next/image';

import Header from '@/components/ui/Header';
import { useParams, usePathname } from 'next/navigation';

import { Card, CardContent} from "@/components/ui/card"
import Link from 'next/link';


  
const Profile:React.FC= () => {
    const {data,isLoading}=useCurrentUser()
    const [mounted,setIsMounted]=useState<boolean>(false)
    const params=useParams()
    const pathname=usePathname()
    const routes=[
        {
            href:`/${params.userId}/${params.displayName}/settings`,
            label:'Settings',
            isActive:pathname.includes('settings')

        },
    ]
 
    useEffect(() => {
        setIsMounted(true);
      }, []);
    if(!mounted){
        return null
    }
    return (
        <>
        <div className=' p-10 mx-10'>
            <Header
            title='Profile Information'
            description='Welcome to the Profile section! 🎉 Here, you&apos;ll find all the essential components that make up your unique and personalized profile.'
            />    
            <div className='flex flex-col md:flex-row'>
                <div className='flex flex-col w-full md:w-1/3'>
                    <Card>
                        <CardContent>
                          
                            <div className='flex flex-col items-center'>
                                <div className='w-32 h-32 relative'>
                   {data?.avatarUrl &&<Image src={data.avatarUrl} height={100} width={100} alt={'profile'}  className='rounded-full'/> } 
                                </div>
                            </div>
                            <div className='flex items-center justify-center gap-20'>
                            <div className='flex flex-col items-center'>
                                <h1 className='text-2xl font-semibold'>Name</h1>
                                <p className='text-md font-semibold'>{data?.displayName}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <h1 className='text-2xl font-semibold'>Email</h1>
                                <p className='text-md font-normal'>{data?.email}</p>
                            </div>

                            </div>
                
                        </CardContent>
                        </Card>
                      
                            <div className='hidden md:flex justify-center  gap-10 hover:underline cursor-pointer'>
                          {routes.map((route,index)=>(
                              <Link href={route.href} key={index}>
                                    <p className={`text-lg font-semibold ${route.isActive ? 'text-blue-500' : 'text-gray-500'}`}>{route.label}</p>
                              </Link>
                          ))}

                            </div>
                </div>
            </div>
               
             </div>
        </>
    )
}
export default Profile;