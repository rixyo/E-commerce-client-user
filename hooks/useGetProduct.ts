import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetProduct =  (id: string) => {
    const {data,isLoading}=useQuery({
        queryKey: ["product", id],
        queryFn: async() => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`);
            return data as Product;
        }
    })
    return {
        data,
        isLoading
    }
};
export default useGetProduct;
