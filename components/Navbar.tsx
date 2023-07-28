"use client"
import useCurrentUser from '@/hooks/useCurrentUser';
import React from 'react';
import Container from '@/components/ui/container';
import Link from 'next/link';
import AnimatedText from './ui/AnimatedText';
import MainNav from './MainNav';
import { User } from '@/hooks/useCurrentUser';
import UserNavbar from './MobileNav';
type NavbarProps = {
    user: User | undefined;
}
const Navbar:React.FC<NavbarProps> = ({user}) => {
  
    const sentence='E-commerce'.split('')
   
    
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
        </div>
      </Container>
    )
}
export default Navbar;