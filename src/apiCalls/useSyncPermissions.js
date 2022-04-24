import { useMutation } from "react-query";
import instance from "./instance";

const syncPermissions = (userId, permissions) => {
  return instance.patch(`/users/${userId}/permissions/sync`, {
    permissions,
  });
};

const useSyncPermissions = () => {
  return useMutation(({ userId, permissions }) => syncPermissions(userId, permissions));
};

export default useSyncPermissions;
