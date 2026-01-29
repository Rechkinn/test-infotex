import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "@/shared/api/api-client";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: { login: string; password: string }) => {
      const response = await authApi.login(credentials);
      const token = response.data[0].token;
      if (token) {
        localStorage.setItem("token", token);
      }
      return response.data;
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authApi.logout,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => {
      localStorage.getItem("token") ? localStorage.getItem("token") : null;
    },
    retry: false,
    enabled: !!localStorage.getItem("token"),
  });
};
