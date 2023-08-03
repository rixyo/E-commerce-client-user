"use client";

import { ShoppingCart } from "lucide-react";

import Currency  from "@/components/ui/currency";
import { Button } from "./ui/button";


interface InfoProps {
  data: Product
};

const Info: React.FC<InfoProps> = ({ data }) => {
 
  return ( 
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div className="">
            {data.Sizes.map((size,index) => (
                <span className="text-gray-900 p-2" key={index}>{size.value}</span>

            ))}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          {data.Colors.map((color,index) => (
            <div className="h-6 w-6 rounded-full border border-gray-600" style={{ backgroundColor: color.value }} key={index} />
          ))}
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button  className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
        <div className="mt-3">
            <h3 className="font-semibold text-black">Description:</h3>
            <p className="text-gray-900">{data.description}</p>
        </div>
    </div>
  );
}
 
export default Info;