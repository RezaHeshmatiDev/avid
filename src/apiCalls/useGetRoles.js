import { useQuery } from "react-query";
import instance from "./instance";

const getRoles = () => {
  return instance.get(`/roles`);
};

const useGetRoles = () => {
  return useQuery(`roles`, () => getRoles(), {
    refetchOnWindowFocus: false,
  });
};

export default useGetRoles;
