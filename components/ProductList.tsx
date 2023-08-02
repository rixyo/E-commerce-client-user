
import { use, useEffect, useState } from "react";
import NoResults from "./ui/no-results";
import ProductCart from "./ui/product-card";
import AnimatedText from "./ui/AnimatedText";

interface ProductListProps {
  title: string;
  items: Product[]|undefined;
  isFeatching: boolean;

}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items,
  isFeatching


}) => {
  const [mute, setMute] = useState<boolean>(false);
  useEffect(() => {
    setMute(true)
  }, [mute]);
  if(!mute) return null
  if(isFeatching) return (
    <div className="space-y-4 flex justify-center items-center">
      <h3 className="font-light text-lg">Do you know only human can do shopping</h3>
    </div>
  )
  return (
    <div className="space-y-4">
      <div className="flex gap-x-2">
      {title.split('').map((letter,index)=>(
        <AnimatedText  key={index}>
          {letter === " " ? "\u00A0" : letter}
        </AnimatedText>
      ))}

      </div>
      
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