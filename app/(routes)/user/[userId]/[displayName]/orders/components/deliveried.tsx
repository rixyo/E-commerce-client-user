import React from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/ui/header';

type DeliveredProps = {
    data:Order
    title:string
    
};

const Delivered:React.FC<DeliveredProps> = ({data,title}) => {
    const router = useRouter();
    
    return (
      <>
        <Card className='p-2 border-2 border-gray-200 mb-3'>
        <Header title={title}/>
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
                        <div className='cursor-pointer' onClick={()=>router.push(`/product/${item.product.id}/${item.product.name}/reviews`)}>
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
        <CardFooter>
            {data.deliveredAt && (
                <div className="flex gap-2  items-center">
                    <p>Delivered At:</p>
                    <p>{format(new Date(data.deliveredAt), 'MMMM do, yyyy').toString()}</p>
                </div>
            )}
        </CardFooter>
        </Card>
      </>
    )
}
export default Delivered;