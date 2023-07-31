import React from 'react';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
type categorycartProps = {
    data:Category
};

const CategoryCart:React.FC<categorycartProps> = ({data}) => {
    
    return (
     
    <Card className='cursor-pointer'>
  <CardHeader>
    <Image src={data.imageUrl}
    width={163.33}
    height={163.33}
          className="aspect-square object-cover rounded-md" alt={data.name} />
  </CardHeader>
  <CardContent>
    <p className='text-xl font-bold hover:underline'>{data.name}</p>
  </CardContent>
    </Card>

        
       
    )
}
export default CategoryCart;