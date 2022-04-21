import { useMutation } from "react-query";
import instance from "./instance";

const addPermission = (permission) => {
  return instance.post("/permissions", {
    params: permission,
  });
};

const useAddPermission = () => {
  return useMutation((permission) => addPermission(permission));
};

export default useAddPermission;
