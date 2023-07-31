"use client"
import React from 'react';
import Image from 'next/image';
import IconButton from './icon-button';
import { Expand, ShoppingCart } from "lucide-react";
import Currency from './currency';

type productcartProps = {
    data:Product;
    
};

const ProductCart:React.FC<productcartProps> = ({data}) => {
    return (
        <div className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4'>
            {/* Images And Action*/}
            <div className='aspect-square rounded-xl bg-gray-100 relative'>
            <Image 
          src={data.Images?.[0]?.url} 
          alt="E-commerce" 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="aspect-square object-cover rounded-md"
        />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
            <div className='flex gap-x-6 justify-center'>
            <IconButton 
              onClick={() => {}} 
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={() => {}} 
              icon={<ShoppingCart size={20} className="text-gray-600" />} 
            />
            </div>
        </div>
            </div>
            <div>
            <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
            </div>
              {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
        <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1">
             {data?.reviews?.length > 0 && (
                <>
                    <p className="text-sm text-gray-500">{data?.reviews?.length}</p>
                </>
             )}
            </div>
        </div>
      </div>

        </div>
    )
}
export default ProductCart;