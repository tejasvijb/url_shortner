import { authQueryOptions } from "@/api-config/queryOptions/authQueries";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
    // Implementation of authentication hook
    const {
        data: currentUserData,
        isLoading: isCurrentUserLoading,
        isSuccess: isCurrentUserAuthenticated,
    } = useQuery({
        queryFn: authQueryOptions.fetchCurrentUserOptions.queryFn,
        queryKey: authQueryOptions.fetchCurrentUserOptions.queryKey,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
        retry: false,
    });

    return {
        currentUserData,
        isCurrentUserLoading,
        isCurrentUserAuthenticated,
    };
};
