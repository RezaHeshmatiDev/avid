import { useMutation } from "react-query";
import instance from "./instance";

const syncRoles = (userId, roles) => {
  return instance.patch(`/users/${userId}/roles/sync`, {
    roles,
  });
};

const useSyncRoles = () => {
  return useMutation(({ userId, roles }) => syncRoles(userId, roles));
};

export default useSyncRoles;
