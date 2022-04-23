import { useMutation } from "react-query";
import instance from "./instance";

const addRole = (role) => {
  return instance.post("/roles", {
    ...role,
  });
};

const useAddRole = () => {
  return useMutation((role) => addRole(role));
};

export default useAddRole;
