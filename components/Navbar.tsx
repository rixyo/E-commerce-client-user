"use client"

import React from 'react';
import Container from '@/components/ui/container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnimatedText from './ui/AnimatedText';
import MainNav from './MainNav';
import useCurrentUser from '@/hooks/useCurrentUser';
import {Input} from '@/components/ui/input';


import MobileNav from './MobileNav';
import NavbarAction from './NavbarAction';
import UnAuthNav from './UnAuthNav';
const Navbar:React.FC = () => {
  
    const sentence='E-commerce'.split('')
    const currentPath=usePathname()
    const {data:user,isLoading}=useCurrentUser()

    return (
        <Container>
        <div className="hidden md:flex relative px-4 sm:px-6 lg:px-8  h-16 items-center gap-6">
          <Link href="/" className="flex gap-x-2">
           {sentence.map((letter,index)=>(
            <AnimatedText key={index}>
                {letter === " " ? "\u00A0" : letter}
            </AnimatedText>
           ))}
          </Link>
        {user && <MainNav user={user}/>  }
        {!user &&<UnAuthNav/>}
        <NavbarAction/>
        </div>
       {currentPath==='/' &&<MobileNav user={user}/>}   
        {currentPath==='/' && <div className='block md:hidden z-40 w-full p-3 mt-5'>
              <Input type='search' placeholder='Search' />
            </div> }  

      </Container>
    )
}
export default Navbar;