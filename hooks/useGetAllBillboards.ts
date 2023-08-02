import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetAllBillboards = () => {
    const {
        data,
        isLoading,
        isError,
        isFetching
    } = useQuery({
        queryKey: ['billboards'],
        queryFn: async () => {
        const {
            data
        } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/billboard`);
        return data as Billboard[];
        }
    });
    return {
        data,
        isLoading,
        isError,
        isFetching
    };
};
export default useGetAllBillboards;