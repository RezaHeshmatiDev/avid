import { useMutation } from "react-query";
import instance from "./instance";

const deleteUser = (id) => {
  return instance.delete(`/users/${id}`);
};

const useDeleteUser = () => {
  return useMutation(({ id }) => deleteUser(id));
};

export default useDeleteUser;
