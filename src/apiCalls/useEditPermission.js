import { useMutation } from "react-query";
import instance from "./instance";

const editPermission = (permission, id) => {
  return instance.patch(`/permissions/${id}`, {
    ...permission,
  });
};

const useEditPermission = () => {
  return useMutation(({ permission, id }) => editPermission(permission, id));
};

export default useEditPermission;
