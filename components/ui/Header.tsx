import React from 'react';
import AnimatedText from './AnimatedText';
import{ChevronLeft} from "lucide-react"

type HeaderProps = {
    title:string;
    description?:string;
};

const Header:React.FC<HeaderProps> = ({title,description}) => {
    
    return(
        <header className="bg-white shadow">
            <ChevronLeft className='w-10 h-10 text-gray-500 cursor-pointer' onClick={()=>window.history.back()}/>
        <div className="max-w-7xl  py-6 px-4 sm:px-6 lg:px-8">
            {title.split('').map((letter,index)=>(
                <AnimatedText key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </AnimatedText>
            ))}
            <p className="hidden md:block text-sm text-gray-500">
            {description}
            </p>
        </div>
        </header>
    )
}
export default Header;