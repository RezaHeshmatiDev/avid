import { useMutation } from "react-query";
import instance from "./instance";

const editRole = (role, id) => {
  console.log({ role, id });
  return instance.patch(`/roles/${id}`, {
    ...role,
  });
};

const useEditRole = () => {
  return useMutation(({ role, id }) => editRole(role, id));
};

export default useEditRole;
