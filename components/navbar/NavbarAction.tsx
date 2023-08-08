"use client";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import useCart from "@/hooks/useCart";



const NavbarAction:React.FC = () => {
    const [mounted,setIsMounted]=useState<boolean>(false)
    const cart = useCart();
    const router=useRouter()
    useEffect(() => {
        setIsMounted(true);
        
    }, [mounted])
    if(!mounted){
        return null
    }
    
    return(
        <div className="flex ml-auto  items-center gap-x-4">
            <Button size="icon" onClick={()=>router.push('/cart')}  className="flex items-center w-full rounded-full bg-black px-4 py-2">
                <ShoppingBag size={25} className="text-white" />
                <span className="ml-2 text-sm font-medium text-white">{cart.items.length}</span>

            </Button>

        </div>
    )
}
export default NavbarAction;