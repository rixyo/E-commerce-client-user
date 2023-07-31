import React from 'react';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './ui/menubar';
import AnimatedText from './ui/AnimatedText';
import Link from 'next/link';

type MobileWomenCategoryProps = {
    categories:Category[]
    title:string
};

const MobileWomenCategory:React.FC<MobileWomenCategoryProps> = ({categories,title}) => {
    const [open,setOpen]=React.useState<boolean>(false)
    
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
                    <div className='text-lg  font-medium hover:translate-x-5 hover:underline' key={index}>
                        <Link href={`/category/${category.name}`}>
                        <p>{category.name}</p>
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