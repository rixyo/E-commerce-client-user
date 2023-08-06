"use client"
import { format } from 'date-fns';
import Container from '@/components/ui/container';
import useGetOrders from '@/hooks/useGetOrders';
import React from 'react';
import OrderCard from '@/components/ui/order-card';


const OrderPage:React.FC= () => {
    const {data:orders,isLoading}=useGetOrders()
    console.log(orders)

    const product = orders?.map((order,index)=>(
        <OrderCard key={index} data={order}/>
    ))
   
    return (
        <Container>
            <h1 className="text-2xl font-bold">Orders</h1>
            <div className="mt-4">
                {orders?.length === 0 && <p>No orders yet.</p>}
                <div  className='flex-col w-auto md:w-1/2 p-2 items-center justify-center gap-5'>
                {orders?.map((order,index)=>(

                        <OrderCard key={index}  data={order}/>
                        ))}
                        </div>
               
            </div>
        </Container>
    )
}
export default OrderPage;