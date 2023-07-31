import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import qs from "query-string"

interface Query {
    page: number;
    isFeatured?: boolean;
    maxPrice?: number;
    minPrice?: number;
    'category[name]'?: string;
  'size[value]'?: string;
  'color[value]'?: string;
  }

const useGetProducts =  (query:Query) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/product`;
    const url = qs.stringifyUrl({
        url: baseUrl,
        query: {
          page: query.page,
          isFeatured: query.isFeatured,
          maxPrice: query.maxPrice,
          minPrice: query.minPrice,
          'category[name]': query['category[name]'],
          'size[value]': query['size[value]'],
          'color[value]': query['color[value]'],
        },
      });
    const {data,isLoading,isPreviousData,isFetching} = useQuery({
        queryKey: ['products',query],
        queryFn: async () => {
            const {data} = await axios.get(`${url}`);
            return data as Product[];
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