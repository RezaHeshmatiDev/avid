import { useMutation } from "react-query";
import instance from "./instance";

const deleteRole = (roleId) => {
  return instance.delete(`/roles/${roleId}`);
};

const useDeleteRole = () => {
  return useMutation(({ roleId }) => deleteRole(roleId));
};

export default useDeleteRole;
