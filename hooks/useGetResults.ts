import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetResults = (query:string,page:number) => {
    const { data, isLoading, isFetching} = useQuery(
      {
        queryKey: ["results",query,page],
        queryFn: async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/product/result?search_query=${query}&page=${page}`
            );
            return data as Product[];
        },
      }
    );
    return { data, isLoading, isFetching};
};
export default useGetResults;
