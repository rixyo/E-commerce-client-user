"use client"

import React from 'react';
import Container from '@/components/ui/container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnimatedText from './ui/AnimatedText';
import MainNav from './MainNav';
import { User } from '@/hooks/useCurrentUser';
import {Input} from '@/components/ui/input';


import MobileNav from './MobileNav';
import NavbarAction from './NavbarAction';
type NavbarProps = {
    user: User | undefined;
}
const Navbar:React.FC<NavbarProps> = ({user}) => {
  
    const sentence='E-commerce'.split('')
    const currentPath=usePathname()
    return (
        <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center gap-6">
          <Link href="/" className="flex gap-x-2">
           {sentence.map((letter,index)=>(
            <AnimatedText key={index}>
                {letter === " " ? "\u00A0" : letter}
            </AnimatedText>
           ))}
          </Link>
        {user && <MainNav user={user}/>  }
          {!user&& <MainNav user={undefined} />}
        <NavbarAction/>
       {currentPath==='/' &&<MobileNav user={user}/>}   
        </div>
        {currentPath==='/' && <div className='block lg:hidden w-full p-3'>
              <Input type='search' placeholder='Search' />
            </div> }  

      </Container>
    )
}
export default Navbar;