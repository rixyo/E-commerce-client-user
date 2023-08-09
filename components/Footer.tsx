// this component is for footer
"use client";
import React, { useEffect, useState } from 'react';
import AnimatedText from './ui/AnimatedText';



const Footer:React.FC = () => {
  const [mounted,setIsMounted]=useState<boolean>(false)
  const sentence='© 2023 E-commerce, Inc. All rights reserved.'.split('')
  useEffect(() => {
      setIsMounted(true);
  }, []);
  if(!mounted){
      return null
  }
    
    return (
        <footer className="mb-10 md:mb-1  bg-white border-t text-center">
       {sentence.map((letter,index)=>(
        <AnimatedText key={index}>
            {letter === ' ' ? "\u00A0" : letter}
        </AnimatedText>
       ))}
      </footer>
    )
}
export default Footer;