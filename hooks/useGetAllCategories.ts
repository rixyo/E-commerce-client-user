// Purpose: Custom hook to get all categories from the API.
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import qs from "query-string";
import { Category } from "@/type";
interface Query {
    gender: string;
}
const useGetAllCategories = (query:Query) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/category/${process.env.NEXT_PUBLIC_STORE_ID}/client`;
    const url= qs.stringifyUrl({
        url:baseUrl,
        query:{
            gender:query.gender,
        }
    })
    const {data,isLoading,isFetching} = useQuery({
        queryKey:['categories',query],
        queryFn: async () => {
            const {data} = await axios.get(`${url}`);
            return data as Category[];
        }
    })
    return {
        data,
        isLoading,
        isFetching
        
    };
};
export default useGetAllCategories;