import { useMutation } from "react-query";
import instance from "./instance";

const deletePermission = (permissionId) => {
  return instance.delete(`/permissions/${permissionId}`);
};

const useDeletePermission = () => {
  return useMutation(({ permissionId }) => deletePermission(permissionId));
};

export default useDeletePermission;
