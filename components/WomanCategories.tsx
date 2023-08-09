
// this components for Desktop WomanCategories
import React from 'react';

import AnimatedText from './ui/AnimatedText';
import CategoryCard from './ui/category-card';
import { Category } from '@/type';

type CategoriesProps = {
    data:Category[] ;
   title:string
    
};

const WomanCategories:React.FC<CategoriesProps> = ({data,title}) => {
    const [mute, setMute] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        setMute(true)
    } , []);
    if(!mute) return null
    
    const sentence=title.split('')
    return (
      <div>
            <div className='hidden md:flex gap-x-2 '>
        {sentence.map((letter,index)=>(
        <AnimatedText className='hover:text-pink-600' key={index}>
            {letter  === " " ? "\u00A0" : letter}
        </AnimatedText>
        ))}
        </div>
            <div className='hidden md:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4 p-5 mx-3'>
            {data?.map((data,index)=>(
          <div  key={index} >
              <CategoryCard data={data}/>
          </div>
         
          ))}
            </div>

        </div>
    )
}
export default WomanCategories;