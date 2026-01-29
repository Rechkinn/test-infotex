import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiBackend } from "../api/api-client";
import { TUserData } from "../types/types";

const createUser = async (userData: TUserData) => {
  const { data } = await apiBackend.post("/users", userData);
  return data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
