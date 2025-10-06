import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const {user, loading:authLoading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data:role, isLoading:roleLoading, refetch} = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data;
        }
    });

  return {role, loading: authLoading || roleLoading, refetch};
}
export default useUserRole;
