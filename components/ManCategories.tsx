
import React from 'react';
import { Menubar, MenubarMenu, MenubarTrigger } from './ui/menubar';
import AnimatedText from './ui/AnimatedText';

type CategoriesProps = {
    data:Category[] ;

   title:string
    
};

const ManCategories:React.FC<CategoriesProps> = ({data,title}) => {
    const sentence=title.split('')
    return (
      <>
      <div className='flex gap-x-2 ml-10'>

          {sentence.map((letter,index)=>(
            <AnimatedText key={index}>
                {letter === " " ? "\u00A0" : letter}
            </AnimatedText>
           ))}
      </div>
            <div className='hidden md:grid  md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4'>
            {data.map((data,index)=>(
          <div key={index} >
            <Menubar>
              <MenubarMenu>
              <MenubarTrigger>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center  h-10 bg-gray-200 rounded-full w-full">
                     <p className='cursor-pointer hover:underline hover:text-red-600'>{data.name}</p> 
                    </div>
                  </div>
                </div>
              </MenubarTrigger>

              </MenubarMenu>
            </Menubar>
          </div>
          ))}
            </div>

        </>
    )
}
export default ManCategories;