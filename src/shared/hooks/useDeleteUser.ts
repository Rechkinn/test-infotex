import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiBackend } from "../api/api-client";

const deleteUser = async (userId: string) => {
  const { data } = await apiBackend.delete(`/users/${userId}`);
  return data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
