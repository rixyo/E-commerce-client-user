import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetAllSizes = () => {
    const { data, isLoading, isFetching } = useQuery(
        {
            queryKey: ["sizes"],
            queryFn: async () => {
                const { data } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/size`
                );
                return data as ProductSize[];
            }
        }
    );
    return { data, isLoading, isFetching };
};
export default useGetAllSizes;