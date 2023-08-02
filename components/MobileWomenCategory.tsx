import React from 'react';

import AnimatedText from './ui/AnimatedText';
import Link from 'next/link';
import useMobileNaveOpen from '@/hooks/useHandleMobileNav';

type MobileWomenCategoryProps = {
    categories:Category[]
    title:string
};

const MobileWomenCategory:React.FC<MobileWomenCategoryProps> = ({categories,title}) => {
    const [open,setOpen]=React.useState<boolean>(false)
    const navOpen=useMobileNaveOpen()
    const handleLinkClick = () => {
        navOpen.onClose() //close the mobile nav
        setOpen(false); //close the category menu
      };
    return (
        <>
            <div className='flex  gap-x-2 ml-10 mt-5 ' onClick={()=>setOpen(!open)}>
            {title.split('').map((letter,index)=>(
          <AnimatedText className='hover:text-pink-600' key={index}>
              {letter  === " " ? "\u00A0" : letter}
          </AnimatedText>
          ))}
            </div>
            {open && (
            <div className=' bg-gray-100 z-50' >
                <div className=' ml-8 p-3'>
                    {categories?.map((category,index)=>(
                    <div className='text-lg  font-medium hover:translate-x-5 hover:underline'  key={index}>
                        <Link href={`/category/${category.id}/${category.name}`} scroll={false}>
                        <p onClick={handleLinkClick}>{category.name}</p>
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
            )}
       
       
      </>
    )
}
export default MobileWomenCategory;