"use client";
import { User } from '@/hooks/useCurrentUser';
import { usePathname,useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

import {Home,X,AlignJustifyIcon, Cat} from "lucide-react"
import AnimatedText from './ui/AnimatedText';
import NavbarAction from './NavbarAction';
import useGetAllCategories from '@/hooks/useGetAllCategories';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import CategoryCart from './ui/category-cart';
import MobileMenCategory from './MobileMenCategory';
import MobileWomenCategory from './MobileWomenCategory';



type MainNavProps = {
  user:User|undefined
};

const MobileNav:React.FC<MainNavProps> = ({user}) => {
  const {data:categories}=useGetAllCategories(
    {gender:'male'}
  )
 const {data:categoriesForWomen}=useGetAllCategories(
  {
    gender:'female'
  }
 )
  const categoryForMan='Men Collections'
  const sentence='E-commerce'.split('')
  const [open,setOpen]=useState<boolean>(false);
    const pathname = usePathname();
    const router=useRouter()
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
      <>
      <div onClick={()=>setOpen(!open)} className='fixed z-50 w-full flex justify-between top-0 left-0 p-5  items-center bg-white border-t-[1px] md:hidden'>
        <AlignJustifyIcon size={30}/>
      <div className='flex gap-x-2 ml-10'>
        {sentence.map((letter,index)=>(
        <AnimatedText className='hover:text-pink-600' key={index}>
            {letter  === " " ? "\u00A0" : letter}
        </AnimatedText>
        ))}
        </div>
        <NavbarAction/>
      </div>
         <div className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transform transition-all duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className=' border-2 border-gray-500'>
          <Button size={"icon"}   onClick={()=>setOpen(false)} className='absolute top-0 right-0 bg-white hover:bg-white mt-2'>
           <X size={30} className='text-black'/>
            </Button>
        </div>
           {categories &&  <MobileMenCategory categories={categories} title={categoryForMan}/> }
           {categoriesForWomen && <MobileWomenCategory categories={categoriesForWomen} title={"Women Collections"}/>}

        </div>
    </>
    )
}
export default MobileNav;