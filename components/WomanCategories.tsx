
import React from 'react';

import AnimatedText from './ui/AnimatedText';
import CategoryCart from './ui/category-cart';


type CategoriesProps = {
    data:Category[] ;

   title:string
    
};

const WomanCategories:React.FC<CategoriesProps> = ({data,title}) => {
    const sentence=title.split('')
    return (
      <div>
            <div className='hidden md:flex gap-x-2 ml-10'>
        {sentence.map((letter,index)=>(
        <AnimatedText className='hover:text-pink-600' key={index}>
            {letter  === " " ? "\u00A0" : letter}
        </AnimatedText>
        ))}
        </div>
            <div className='hidden md:grid  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
            {data.map((data,index)=>(
          <div  key={index} >
              <CategoryCart data={data}/>
          </div>
         
          ))}
            </div>

        </div>
    )
}
export default WomanCategories;