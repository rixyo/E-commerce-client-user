"use client"
import { User } from '@/hooks/useCurrentUser';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname,useRouter } from 'next/navigation';
import React from 'react';
import { Input } from './ui/input';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import {Smile,Package,Star,LogOut} from "lucide-react"
type MainNavProps = {
    user:User|undefined
};

const MainNav:React.FC<MainNavProps> = ({user}) => {
    const pathname = usePathname();
    const router=useRouter()
    const data=[
        {
            label:"Home",
            href:"/",
            isActive:pathname === "/"
        },
        {
            label:"Signin/Signup",
            href:"/auth",
            isActive:pathname === "/auth"
        } 
    ]
    const handleLogout=()=>{
      localStorage.removeItem('token')
      router.push('/auth')
    }
    const handleProfle=()=>{
      if(pathname.includes(`/${user?.id}/${user?.displayName}`)) return;
      else router.push(`/${user?.id}/${user?.displayName}`)
    }
    return (
        <nav className='hidden md:flex mx-6  justify-between items-center space-x-4 lg:space-x-6 w-full'> 
            <div className='flex justify-center items-center gap-5'>
                {!user && data.map((item)=>(
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
            </div>
            <div className='w-full'>
              <Input type='search' placeholder='Search' />
            </div>
           {user && (
            <Menubar className='w-full'>
            <MenubarMenu>
              <MenubarTrigger className='hover:cursor-pointer hover:text-red-600 hover:underline text-lg'>{user.displayName} &apos;s Profile</MenubarTrigger>
              <MenubarContent>
                <MenubarItem className='hover:underline cursor-pointer' onClick={handleProfle}><Smile className='mr-2'/> Manage My Account</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className='hover:underline cursor-pointer'><Star className='mr-2'/>My Reviews</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className='hover:underline cursor-pointer'><Package className='mr-2'/>My Orders</MenubarItem>
                <MenubarSeparator />
                <MenubarItem className='hover:underline cursor-pointer' onClick={handleLogout}><LogOut className='mr-2'/>Logout</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

           )} 

        </nav>
    )
}
export default MainNav;