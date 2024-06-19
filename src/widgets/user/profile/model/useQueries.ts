import { UserQueryKeys } from "@/shared/api";
import { UserService } from "@/shared/lib";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetProfile = () => {
   return useQuery({
      queryFn: UserService.getProfile,
      queryKey: [UserQueryKeys.PROFILE],
   });
};
export const useChangeProfile = () => {
   return useMutation({
      mutationFn: (data: FormData) => {
         return UserService.changeProfile(data);
      },
      mutationKey: [UserQueryKeys.PROFILE],
      onSuccess: (data) => {
         if (data) {
            toast.success("Вы успешно редактировали профиль!");
         }
      },
   });
};
