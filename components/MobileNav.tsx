"use client"
import { User } from '@/hooks/useCurrentUser';
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
    user:User
};

const MobileNav:React.FC<MainNavProps> = ({user}) => {
    const pathname = usePathname();
    const router=useRouter()
    
    return (
        <nav className='mx-6 flex justify-between items-center space-x-4 lg:space-x-6 w-full'> 
    
            <div className='w-full'>
              <Input type='search' placeholder='Search' />
            </div>
        <Menubar className='w-full'>
        <MenubarMenu>
          <MenubarTrigger className='hover:cursor-pointer hover:text-red-600 hover:underline text-lg'>{user?.displayName} &apos;s Profile</MenubarTrigger>
          <MenubarContent>
            <MenubarItem className='hover:underline cursor-pointer' onClick={()=>router.push(`${user?.displayName}/${user?.displayName}`)}><Smile className='mr-2'/> Manage My Account</MenubarItem>
            <MenubarSeparator />
            <MenubarItem className='hover:underline cursor-pointer'><Star className='mr-2'/>My Reviews</MenubarItem>
            <MenubarSeparator />
            <MenubarItem className='hover:underline cursor-pointer'><Package className='mr-2'/>My Orders</MenubarItem>
            <MenubarSeparator />
            <MenubarItem className='hover:underline cursor-pointer'><LogOut className='mr-2'/>Logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

  
        </nav>
    )
}
export default MobileNav;