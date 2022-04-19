import { useQuery } from "react-query";
import instance from "./instance";

const getUser = (userId) => {
  return instance.get(`/users/${userId}`);
};

const useGetOneUser = (userId) => {
  return useQuery(`user${userId}`, () => getUser(userId), {
    refetchOnWindowFocus: false,
  });
};

export default useGetOneUser;
