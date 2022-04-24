import { useMutation } from "react-query";
import instance from "./instance";

const editUser = (user, id) => {
  return instance.patch(`/users/${id}`, {
    ...user,
  });
};

const useEditUser = (user, id) => {
  return useMutation(() => editUser(user, id));
};

export default useEditUser;
