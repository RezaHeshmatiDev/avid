import { useQuery } from "react-query";
import { getToken } from "../utils/getToken";
import instance from "./instance";

const getAllUsers = () => {
  return instance.get("/users");
};

const useGetAllUsers = () => {
  return useQuery("users", getAllUsers, {
    enabled: getToken() ? true : false,
  });
};

export default useGetAllUsers;
