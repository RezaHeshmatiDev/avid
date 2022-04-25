import { useMutation } from "react-query";
import instance from "./instance";

const editUser = (user, id) => {
  console.log({ user, id });
  return instance.patch(`/users/${id}`, {
    ...user,
  });
};

const useEditUser = () => {
  return useMutation(({ user, id }) => editUser(user, id));
};

export default useEditUser;
