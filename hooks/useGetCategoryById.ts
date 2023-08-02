import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetCategoryById = (id:string) => {
    const {data,isLoading,isPreviousData,isFetching} = useQuery({
        queryKey: ['category',id],
        queryFn: async () => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`);
            return data as Category;
        }
    });
    return {data,isLoading,isPreviousData,isFetching};
}
export default useGetCategoryById;