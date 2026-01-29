import { useQuery } from "@tanstack/react-query";
import { apiBackend } from "../api/api-client";

const fetchUsers = async () => {
  const { data } = await apiBackend.get("/users");
  return data;
};

export const useUsers = (options = {}) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    ...options,
  });
};
