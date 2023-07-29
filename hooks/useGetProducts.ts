import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetProducts =  (page:number,isFeatured?:boolean) => {
    const {data,isLoading,isPreviousData,isFetching} = useQuery({
        queryKey: ['products',page],
        queryFn: async () => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product?page=${page}&isFeatured=${isFeatured}`);
            return data;
        },
    });
    return {
        data,
        isLoading,
        isPreviousData,
        isFetching
        
    };
};
export default useGetProducts;