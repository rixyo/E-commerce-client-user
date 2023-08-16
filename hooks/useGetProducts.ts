// this hook is used to get products from the server with pagination and filter
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import qs from "query-string"
import { Product } from "@/type";
interface Query {
    page: number;
    isFeatured?: boolean;
    maxPrice?: number;
    minPrice?: number;
    'category[name]'?: string;
  }

const useGetProducts =  (query:Query) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/product/${process.env.NEXT_PUBLIC_STORE_ID}/filter`;
    const url = qs.stringifyUrl({
        url: baseUrl,
        query: {
          page: query.page,
          isFeatured: query.isFeatured,
          maxPrice: query.maxPrice,
          minPrice: query.minPrice,
          'category[name]': query['category[name]'],
         
        },
      });
    const {data,isLoading,isPreviousData,isFetching} = useQuery({
      
        queryKey: ['products',query.page,query.isFeatured,query['category[name]']],
        queryFn: async () => {
            const {data} = await axios.get(`${url}`);
            return data as Product[];
        },
        keepPreviousData: true,
    });
    return {
        data,
        isLoading,
        isPreviousData,
        isFetching
        
    };
};
export default useGetProducts;