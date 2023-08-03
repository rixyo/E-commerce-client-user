"use client";
import React, { useCallback, useState } from 'react';
import { User } from '@/hooks/useCurrentUser';
import useGetAllCategories from '@/hooks/useGetAllCategories';
import { usePathname,useRouter } from 'next/navigation';

import {Home,X,AlignJustifyIcon, Smile, Star, Package, LogOut} from "lucide-react"
import AnimatedText from './ui/AnimatedText';
import NavbarAction from './NavbarAction';
import {Button} from '@/components/ui/button';
import MobileMenCategory from './MobileMenCategory';
import MobileWomenCategory from './MobileWomenCategory';
import Link from 'next/link';
import useMobileNaveOpen from '@/hooks/useHandleMobileNav';
import { Input } from './ui/input';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from './ui/menubar';



type MainNavProps = {
  user:User|undefined
};

const MobileNav:React.FC<MainNavProps> = ({user}) => {
  const [search, setSearch] = useState<string>("");
  const navHandle=useMobileNaveOpen()//handle mobile nav or close it
  const title='SignIn/SignUp'.split('')
    const pathname = usePathname();
    const router=useRouter()
    const categoryForMan='Men Collections'
    const sentence='E-commerce'.split('')
  const {data:categories}=useGetAllCategories(
    {gender:'male'}
  )
 const {data:categoriesForWomen}=useGetAllCategories(
  {
    gender:'female'
  }
 )
 const onSearch=useCallback((event:React.FormEvent)=>{
  event.preventDefault()
  navHandle.onClose()
  const encodedSearch=encodeURI(search)
  router.push(`/result?search_query=${encodedSearch}`)
},[search,router,navHandle])
   const gotoProfile=()=>{
      if(user){
        navHandle.onClose()
        if(pathname.includes(`user/${user.id}/${user.displayName}`)) return;
        else router.push(`user/${user?.id}/${user?.displayName}`)
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
      <div className='fixed z-50 w-screen flex justify-between top-0 left-0 p-5   items-center bg-white border-t-[1px] md:hidden'>
        <AlignJustifyIcon onClick={navHandle.onOpen}   className='cursor-pointer ' size={30}/>
      <div className='flex gap-x-2 mx-3'>
        <Link href='/' className='flex gap-x-2 mx-3'>
        {sentence.map((letter,index)=>(
        <AnimatedText className='hover:text-pink-600' key={index}>
            {letter  === " " ? "\u00A0" : letter}
        </AnimatedText>
        ))}
        </Link>
        </div>
        <NavbarAction/>
      </div>
         <div className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transform transition-all duration-300 ease-in-out ${navHandle.isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <Button size={"icon"}   onClick={navHandle.onClose} className='absolute top-0 right-0 hover:bg-white bg-white mt-1'>
           <X size={30} className='text-black'/>
            </Button>
        </div>
           <div className='p-5 w-full mt-7'>
           <form onSubmit={onSearch}>
           <Input   onChange={(e)=>setSearch(e.target.value)}
         value={search} type='search' placeholder='Search' />
              </form>
            </div>
           {categories &&  <MobileMenCategory categories={categories} title={categoryForMan}/> }
           {categoriesForWomen && <MobileWomenCategory categories={categoriesForWomen} title={"Women Collections"}/>}
           {!user && (
              <div className=' mt-3 ml-8' onClick={navHandle.onClose}>
                <Link href='/auth' className='flex space-x-3 ' scroll={false}>
                {title.map((letter,index)=>(
                  <AnimatedText key={index}>
                      {letter  === " " ? "\u00A0" : letter}
                  </AnimatedText>
                ))}
                </Link>
              </div>
           )}
           {user && (
             <Menubar className='mx-5'>
             <MenubarMenu>
               <MenubarTrigger className='text-center hover:cursor-pointer hover:text-red-600 hover:underline text-lg'>{user.displayName} &apos;s Profile</MenubarTrigger>
               <MenubarContent>
                 <MenubarItem className='hover:underline cursor-pointer' onClick={gotoProfile}><Smile className='mr-2'/> Manage My Account</MenubarItem>
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
           </div>
    </>
    )
}
export default MobileNav;