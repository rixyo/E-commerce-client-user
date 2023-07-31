
import React from 'react';
import AnimatedText from './ui/AnimatedText';
import CategoryCart from './ui/category-cart';


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
            <div className='hidden md:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4 p-5 mx-3'>
            {data.map((data,index)=>(
          <div  key={index} >
              <CategoryCart data={data}/>
          </div>
          ))}
            </div>

        </>
    )
}
export default ManCategories;