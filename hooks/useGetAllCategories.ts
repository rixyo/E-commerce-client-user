
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import qs from "query-string";
interface Query {
    gender?: string;
}
const useGetAllCategories = (query?:Query) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/category`;
    const url= qs.stringifyUrl({
        url:baseUrl,
        query:{
            gender:query?.gender,
        }
    })
    const {data,isLoading} = useQuery({
        queryKey:['categories',query],
        queryFn: async () => {
            const {data} = await axios.get(`${url}`);
            return data as Category[];
        }
    })
    return {
        data,
        isLoading,
    };
};
export default useGetAllCategories;