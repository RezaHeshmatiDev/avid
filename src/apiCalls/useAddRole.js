import { useMutation } from "react-query";
import instance from "./instance";

const addRole = (role) => {
  return instance.post("/roles", {
    params: role,
  });
};

const useAddRole = () => {
  return useMutation((role) => addRole(role));
};

export default useAddRole;
