import { useMutation } from "react-query";
import instance from "./instance";

const addPermission = (permission) => {
  console.log({ permission });
  return instance.post("/permissions", {
    ...permission,
  });
};

const useAddPermission = () => {
  return useMutation((permission) => addPermission(permission));
};

export default useAddPermission;
