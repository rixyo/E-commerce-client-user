import { useState } from "react";
import NoResults from "./ui/no-results";
import ProductCart from "./ui/product-cart";
import { Button } from "./ui/button";



interface ProductListProps {
  title: string;
  items: Product[]|undefined;
  nextPage: () => void;
  isProductLoading:boolean
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items,
  isProductLoading

}) => {
  if(isProductLoading){
    return <div className="flex justify-center item-center h-full text-xl">Loading......</div>
  }
 
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
     {items?.length === 0 && <NoResults/>}
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {items?.map((item) => (
          <div key={item.id}>
            <ProductCart data={item} />
          </div>
        ))}
      </div>
    </div>
   );
}
 
export default ProductList;