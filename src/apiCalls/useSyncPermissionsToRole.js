import { useMutation } from "react-query";
import instance from "./instance";

const syncPermissionsToRole = (roleId, permissions) => {
  return instance.patch(`/roles/${roleId}/permissions/sync`, {
    permissions,
  });
};

const useSyncPermissionsToRole = () => {
  return useMutation(({ roleId, permissions }) => syncPermissionsToRole(roleId, permissions));
};

export default useSyncPermissionsToRole;
