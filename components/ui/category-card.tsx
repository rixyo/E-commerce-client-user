"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card"
  
type categorycartProps = {
    data:Category
};

const CategoryCart:React.FC<categorycartProps> = ({data}) => {

    
    return (
     
    <Link href={`category/${data.id}/${data.name}`}>
    <Card className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4  border-gray-200'>
  <CardHeader>
    <Image src={data.imageUrl}
    width={163.33}
    height={163.33}
          className="aspect-square object-cover rounded-md" alt={data.name} />
  </CardHeader>
  <CardContent>
    <p className='text-md font-medium hover:translate-x-3'>{data.name}</p>
  </CardContent>

    </Card>
    </Link>

        
       
    )
}
export default CategoryCart;