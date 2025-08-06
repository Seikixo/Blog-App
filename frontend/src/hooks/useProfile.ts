import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "../services/userService";

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfile,
  });

  const { mutate: update, isPending: isUpdating, error: updateError } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error("Update failed", error);
    },
  });

  return {
    profile,
    isLoading,
    isError,
    error,
    update,
    isUpdating,
    updateError,
  };
};
