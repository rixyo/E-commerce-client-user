"use client"
import clsx from 'clsx';
import { User } from '@/hooks/useCurrentUser';
import { usePathname,useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

import {
  Menubar,
 
  MenubarContent,
 
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"



import {Home, LayoutList, UserIcon, LogInIcon, ShoppingBag,AlignJustifyIcon} from "lucide-react"
import AnimatedText from './ui/AnimatedText';
import NavbarAction from './NavbarAction';

type MainNavProps = {
  user:User|undefined
};

const MobileNav:React.FC<MainNavProps> = ({user}) => {
  const sentence='E-commerce'.split('')
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
 
      <div className={`fixed  w-full top-0 z-40 flex p-5 items-center bg-white border-t-[1px] md:hidden`}>
    
          <Link href="/" className="flex gap-x-2 ml-10">
           {sentence.map((letter,index)=>(
            <AnimatedText key={index}>
                {letter === " " ? "\u00A0" : letter}
            </AnimatedText>
           ))}
          </Link>
          <NavbarAction/>
           <Button variant="ghost" className="absolute top-4 left-2 inline-flex items-center peer justify-center rounded-md p-2   hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
            <AlignJustifyIcon className='text-gray-400' size={30}/>
           </Button>
        

           <div className="p-6 w-1/2 h-screen bg-gray-300 z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200" >
           {/* DropDownMenue */}
      

   
          {routes.map((route,index)=>(
          <div key={index} >
            <Menubar>
              <MenubarMenu>
              <MenubarTrigger>
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full ">
                      {route.label}
                    </div>
                  </div>
                </div>
              </MenubarTrigger>

              </MenubarMenu>
            </Menubar>
          </div>
          ))}
          
             </div>
     
        
       </div>

       
    )
}
export default MobileNav;