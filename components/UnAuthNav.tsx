"use client"
import Link from 'next/link';
import React from 'react';
import {cn} from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Input } from './ui/input';


const UnAuthNav:React.FC= () => {
    const currentPath=usePathname()
    const data=[
        {
            label:"Home",
            href:"/",
            isActive:currentPath=== "/"
        },
        {
            label:"Signin/Signup",
            href:"/auth",
            isActive:currentPath === "/auth"
        } 
    ]
    
    return (
        <nav className='hidden md:block w-full'> 
               <div className='flex justify-center items-center gap-5'>
                { data.map((item)=>(
                       <Link
                       key={item.href}
                       href={item.href}
                       className={cn(
                         'text-sm font-medium transition-colors hover:text-black',
                         item.isActive ? 'text-black' : 'text-neutral-500'
                       )}
                     >
                       {item.label}
                   </Link>
                ))}
                <div className=' w-full p-3'>
              <Input type='search' placeholder='Search' />
            </div>
            </div>
        </nav>
    )
}
export default UnAuthNav;