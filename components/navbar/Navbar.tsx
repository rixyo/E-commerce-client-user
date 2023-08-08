"use client"
// this component is parent of all navigation 
import React from 'react';
import Container from '@/components/ui/container';
import Link from 'next/link';
import AnimatedText from '../ui/AnimatedText';
import DesktopNav from './DesktopNav';
import useCurrentUser from '@/hooks/useCurrentUser';



import MobileNav from './MobileNav';

import UnAuthNav from './UnAuthNav';

const Navbar:React.FC = () => {
  // animate the navbar title
    const sentence='E-commerce'.split('')

    const {data:user}=useCurrentUser()

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
        {user && <DesktopNav user={user}/>  }
        {!user &&<UnAuthNav/>}
        </div>
       <MobileNav user={user}/>
      </Container>
    )
}
export default Navbar;