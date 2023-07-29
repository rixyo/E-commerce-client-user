import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export type Billboard = {
    id: string;
    label: string;
    imageUrl: string;
};
const useGetAllBillboards = () => {
    const {
        data,
        isLoading,
        isError
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
        isError
    };
};
export default useGetAllBillboards;