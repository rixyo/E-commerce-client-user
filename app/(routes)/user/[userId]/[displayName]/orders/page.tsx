"use client"

import Container from '@/components/ui/container';
import useGetOrders from '@/hooks/useGetPendingOrders';
import React, { useState } from 'react';


import {Truck, CheckCheck} from "lucide-react"
import Pandding from './components/pandding-card';
import Delivered from './components/deliveried';
import useGetDeliveredOrders from '@/hooks/useGetDeliveredOrders';

type Vairant="pending" | "delivered";
  
const OrderPage:React.FC= () => {
    const [variant, setVariant] = useState<Vairant>("pending")
    const {data:pendingsData,isLoading}=useGetOrders()
    const {data:deliveredData}=useGetDeliveredOrders()
    const handleVariant=(name:Vairant)=>{
        setVariant(name)
    }


  const variantVar = [
    {
      name: 'pending',
      color: 'bg-blue-500',
      icon: <Truck className='text-white' />,
    },
    {
      name: 'delivered',
      color: 'bg-green-500',
      icon: <CheckCheck className='text-white' />,
    },
  ];
 

  return (
    <Container>
      <h1 className="text-2xl font-bold">Orders</h1>
      <div className="mt-4">
        <div className='flex justify-center gap-5 border-b-2 border-gray-300 mb-2 p-2 cursor-pointer mt-12 md:mt-0'>
          {variantVar.map((item, index) => (
            <div
              key={index}
                onClick={() => handleVariant(item.name as Vairant)}
              className={`flex items-center justify-center space-x-2 ${item.color} p-2 rounded-md cursor-pointer`}
            >
              {item.icon}
              <p className='text-white'>{item.name}</p>
            </div>
          ))}
        </div>
        <div className='mt-5'>
            {variant==="pending"  && pendingsData?.map((item,index)=>(
                <div key={index} className='flex items-center justify-center'>

                    <Pandding title='Pending Orders'  data={item}/>
                </div>
            ))}
               {variant==="delivered"  && deliveredData?.map((item,index)=>(
                <div key={index} className='flex items-center justify-center'>

                    <Delivered title='Delivered Orders'  data={item}/>
                </div>
            ))}
           
        </div>
      </div>
    </Container>
  );
};
export default OrderPage;