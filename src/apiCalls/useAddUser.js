import { useMutation } from "react-query";
import instance from "./instance";

const addUser = (user) => {
  return instance.post("/users", {
    params: user,
  });
};

const useAddUser = () => {
  return useMutation((user) => addUser(user));
};

export default useAddUser;
