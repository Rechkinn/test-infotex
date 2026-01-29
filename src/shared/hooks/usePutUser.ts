import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiBackend } from "../api/api-client";
import { TUserData } from "../types/types";

const putUser = async (userData: TUserData) => {
  const { id, ...updateData } = userData;
  const { data } = await apiBackend.put(`/users/${id}`, updateData);
  return data;
};

export const usePutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUser,
    onSuccess: (updatedUser, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", variables.id],
      });

      queryClient.setQueryData(["user", variables.id], updatedUser);
    },
  });
};
