import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import  localStorageManager  from "../lib/LocalStorageManager";

const useGetOrders = () => {
    const token = localStorageManager.getItemWithExpiration("token");
    const { data, isLoading} = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data as Order[];
        },
    });
    return { data, isLoading};
};
export default useGetOrders;