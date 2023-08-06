"use client"    
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Container from './container';

type OrderCard= {
    data:Order
    
};

const OrderCard:React.FC<OrderCard> = ({data}) => {
    const [mounted,setMounted]=useState<boolean>(false)
    useEffect(() => {
        setMounted(true);
    }, [])
    if(!mounted) return null
    console.log(data)
    
    return (
        <Container>
            <div className='flex items-center justify-center mt-10 md:mt-0' >
            <Card className='p-2'>
        <CardHeader>
            <CardTitle>{data.id}</CardTitle>
        </CardHeader>
            <CardDescription className='text-center text-lg font-medium mb-2'>Order Detail</CardDescription>
            
        <CardContent>
         {data.orderItems.map((item,index)=>(
                <div key={index}>
                <div className="flex items-center gap-x-6">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <Image src={item.product.Images[0].url} width={50} height={50} alt={item.product.name}/>
                        </div>
                        <div>
                            <p>{item.product.name}</p>
                        </div>
                    </div>
                    <div>
                       <p>{item.quantity}</p>
                    </div>
                    <div>
                        <p>{item.size}</p>
                    </div>
                    <div>
                    <div key={index} className="h-6 w-6 rounded-full border" style={{ backgroundColor: item.color}} />
                    </div>
                </div>
                <hr className="my-2"/>
                </div>
         ))}

        </CardContent>
        </Card>

            </div>
        </Container>
    )
}
export default OrderCard;