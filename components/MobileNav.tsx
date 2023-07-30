"use client"
import clsx from 'clsx';
import { User } from '@/hooks/useCurrentUser';
import { usePathname,useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Home, LayoutList, UserIcon, LogInIcon, ShoppingBag} from "lucide-react"

type MainNavProps = {
  user:User|undefined
};

const MobileNav:React.FC<MainNavProps> = ({user}) => {
    const pathname = usePathname();
    const router=useRouter()
    const routes=[
      {
        label:"Home",
        href:"/",
        icon:<Home size={30}/>,
        isActive:pathname === "/"
      },
      {
        label:"Categories",
        href:"/categories",
        icon:<LayoutList size={30}/>,
        isActive:pathname === "/categories"
      },
     
    ]
   const gotProfile=()=>{
      if(user){
        if(pathname.includes(`/${user?.id}/${user?.displayName}`)) return;
        else router.push(`/${user?.id}/${user?.displayName}`)
      }
   }
   const settings=()=>{
      if(user){
        if(pathname.includes(`/${user?.id}/${user?.displayName}/settings`)) return;
        else router.push(`/${user?.id}/${user?.displayName}/settings`)
      }
   }
   const logout = () => {
    localStorage.removeItem('token');
  };
  const handleLogout=()=>{
    logout();
    window.location.href = '/auth';
  }

    
    return (
      <nav className={`fixed  w-full bottom-0 z-40 flex  ${user?"justify-around":"justify-around"} p-5 items-center bg-white border-t-[1px] md:hidden`}>
      
          {routes.map((route)=>(
            <Link key={route.href} href={route.href} title={route.label} className={clsx(`
            group 
            flex 
            gap-x-3 
            rounded-md 
            p-3 
            text-sm 
            leading-6 
            font-semibold 
            text-sky-400 
            hover:text-black 
            hover:bg-gray-100
          `,
            route.isActive && 'bg-gray-100 text-black'
          )}>
              {route.icon}
            </Link>
          ))}
            <Button size="icon"  className="flex items-center w-auto rounded-full bg-black px-4 py-2">
                <ShoppingBag size={25} className="text-white" />

            </Button>
          {!user &&<LogInIcon size={30} className="text-sky-400" onClick={()=>router.push('/auth')}/>}
         {user && <DropdownMenu>
  <DropdownMenuTrigger>
    <UserIcon size={30} className="text-sky-400"/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem className='hover:underline cursor-pointer' onClick={gotProfile}>Profile</DropdownMenuItem>
    <DropdownMenuItem className='hover:underline cursor-pointer' onClick={gotProfile}>My Orders</DropdownMenuItem>
    <DropdownMenuItem className='hover:underline cursor-pointer' onClick={gotProfile}>My Reviews</DropdownMenuItem>
    <DropdownMenuItem className='hover:underline cursor-pointer' onClick={settings}>Setting</DropdownMenuItem>
    <DropdownMenuItem className='hover:underline cursor-pointer' onClick={handleLogout}>Log out</DropdownMenuItem>
   
  </DropdownMenuContent>
</DropdownMenu>
 }
       
    
        </nav>
    )
}
export default MobileNav;